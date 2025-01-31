import { useModal } from "@/hooks/context/useModalContext";

let modalInstance: ReturnType<typeof useModal>;

export const setModalInstance = (instance: ReturnType<typeof useModal>) => {
    modalInstance = instance;
};

export const modal = async (options: {
    title?: string;
    content?: React.ReactNode;
    onConfirm: (() => void) | (() => Promise<unknown>);
}) => {
    if (!modalInstance) {
        throw new Error(
            "Modal Instance is not set. Ensure the modalProvider is mounted."
        );
    }

    return await modalInstance.modal(options);
};
