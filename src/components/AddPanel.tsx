import { type PropsWithChildren } from 'react';
import { AlertDialog } from "radix-ui";


type AddPanelProps = {


};

export const AddPanel = (props: PropsWithChildren<AddPanelProps>) => {

    const { children } = props;

    return (
        <AlertDialog.Portal>
            <AlertDialog.Overlay style={{ position: 'fixed', inset: 0 }} className='flex bg-zinc-700/70' />
            <AlertDialog.Content
                style={{ position: 'fixed', top: '50%', left: '50%', padding: '25px', transform: 'translate(-50%, -50%)', maxHeight: '90vh', overflowY: 'auto' }}
                className='flex flex-col bg-zinc-900 rounded space-y-4 w-xl'>

                {children}

            </AlertDialog.Content>
        </AlertDialog.Portal>
    );
};
