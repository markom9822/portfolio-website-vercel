import { AlertDialog } from "radix-ui";

type DeleteItemPanelProps = {

    panelTitle: string,
    panelDesc: string,

    itemName: string,
    cancelButtonName: string,
    actionButtonName: string,
    OnDelete?: () => Promise<void>,    
}

export const DeleteItemPanel = ({ panelTitle, panelDesc, itemName, cancelButtonName, actionButtonName, OnDelete }: DeleteItemPanelProps) => {

    // handle add project
    const handlePressDeleteButton = async () => {
        if (OnDelete) {
            await OnDelete();
        }
    }

    return (
        <>
            <AlertDialog.Title className="text-3xl font-bold mb-4 text-zinc-800 font-title">
                {panelTitle}
            </AlertDialog.Title>

            <AlertDialog.Description className='text-base font-type-bold text-zinc-800'>
                {panelDesc}
            </AlertDialog.Description>
            
            <p className='font-type-bold text-zinc-800'>Are you sure you want to delete {itemName}?</p>

            <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
                <AlertDialog.Cancel asChild>
                    <button className="font-title text-zinc-800 rounded hover:text-zinc-700 px-2 duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 transition">
                        {cancelButtonName}
                    </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                    <button
                        onClick={handlePressDeleteButton}
                        className="font-title text-red-800 rounded hover:text-red-700 px-2 duration-200 cursor-pointer border-2 border-red-800 hover:border-red-700 transition">
                        {actionButtonName}
                    </button>
                </AlertDialog.Action>
            </div>
        </>
    )
}
