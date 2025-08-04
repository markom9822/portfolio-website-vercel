import { AlertDialog } from "radix-ui";

type DeleteItemPanelProps = {

    panelTitle: string,
    panelDesc: string,

    itemName: string,
    cancelButtonName: string,
    actionButtonName: string,
    OnDelete?: () => void,
}

export const DeleteItemPanel = ({ panelTitle, panelDesc, itemName, cancelButtonName, actionButtonName, OnDelete }: DeleteItemPanelProps) => {

    // handle add project
    const handlePressDeleteButton = () => {
        if (OnDelete) {
            OnDelete();
        }
    }

    return (
        <>
            <AlertDialog.Title className="text-3xl font-bold mb-4 text-zinc-200 font-text">
                {panelTitle}
            </AlertDialog.Title>

            <AlertDialog.Description className='text-sm font-text text-zinc-400'>
                {panelDesc}
            </AlertDialog.Description>
            
            <p className='font-text text-zinc-300'>Are you sure you want to delete {itemName}?</p>

            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                    <button className="font-text text-zinc-400 rounded hover:text-zinc-200 px-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 transition">
                        {cancelButtonName}
                    </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                    <button
                        onClick={handlePressDeleteButton}
                        className="font-text text-red-600 rounded hover:text-red-400 px-2 duration-200 cursor-pointer border-2 border-red-500 hover:border-red-300 transition">
                        {actionButtonName}
                    </button>
                </AlertDialog.Action>
            </div>
        </>
    )
}
