'use client';

import { Button } from '@/components/ui/button';
import { setModalInstance } from '@/lib/utils/modal';
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

import ReactDOM from 'react-dom';
import { useToast } from '../use-toast';
import { Loader } from 'lucide-react';

type ModalOptions = {
  title? : string;
  content? : ReactNode;
  onConfirm : ( () => void ) | ( () => Promise<unknown> )
  actionLabel? : string;
  buttonless? : boolean;
};

type ModalContextType = {
  modal( options : ModalOptions ) : Promise<void>;
};

const ModalContext = createContext<ModalContextType | undefined>( undefined );

export const useModal = () => {
  const context = useContext( ModalContext );

  if ( !context ) throw new Error( 'useModal must be used within a ModalProvider' );

  return context;
}

export const ModalProvider : React.FC<{ children : ReactNode }> = ( { children } ) => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState( false );
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>( null );
  const [resolvePromise, setResolvePromise] = useState<( () => void ) | null>( null );

  const modal = ( options : ModalOptions ) => {
    return new Promise<void>( ( resolve ) => {
      setModalOptions( options );
      setResolvePromise( () => resolve );
    } );
  }

  const closeModal = () => {
    setModalOptions( null );
    if ( resolvePromise ) resolvePromise();
  }

  async function handleConfirmClick() {
    setIsLoading( true );
    try {
      await modalOptions?.onConfirm();
    } catch ( error ) {
      toast( {
        title : 'Algo Deu Errado',
        description : ( error as Error ).message,
      } )
      console.error( error );
    } finally {
      closeModal();
      setIsLoading( false );
    }
  }

  setModalInstance( { modal } )

  const values = useMemo( () => ( { modal } ), [modalOptions] )

  return (
      <ModalContext.Provider value={ values }>
        { children }
        { modalOptions && ReactDOM.createPortal(
            <div
                className="z-50 fixed inset-0 w-screen h-screen bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded shadow-md !min-w-96 flex flex-col gap-4">
                { modalOptions.title && <h2 className="text-lg font-bold"> { modalOptions.title }</h2> }
                <div className="mt-2">{ modalOptions.content }</div>
                <div className="flex gap-2 w-full justify-end">
                  <Button
                      variant="secondary"
                      onClick={ closeModal }
                  >
                    Cancelar
                  </Button>
                  { !modalOptions.buttonless && <Button
                      variant="destructive"
                      onClick={ async () => await handleConfirmClick() }>
                    { isLoading
                        ? ( <Loader className="w-5 h-5 animate-spin" /> )
                        : modalOptions.actionLabel ?? "Confirmar" }
                  </Button> }
                </div>
              </div>
            </div>,
            document.body
        )
        }
      </ModalContext.Provider>
  )
}
