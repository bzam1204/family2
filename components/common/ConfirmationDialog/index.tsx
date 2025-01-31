'use client'

import React, { useState } from 'react';
import { Loader } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;  // Update to support async onConfirm
  itemName: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    setIsLoading(true);
    try {
      await onConfirm(); // Wait for the onConfirm to perform its actions
    } catch (error) {
      console.error('Error during confirmation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Atenção</h2>
        <p>Tens certeza que desejas deletar o(a) <strong>{itemName}</strong>?</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            onClick={handleConfirmClick}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin"/> : "Tenho sim"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
