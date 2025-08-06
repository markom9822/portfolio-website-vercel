import { AlertDialog } from "radix-ui";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";


type AdminProjectPanelProps = {

    title: string,
    date: string,
    index: number,
    OnPressEdit: () => void,
    OnPressDelete: () => void,
}

export const AdminProjectPanel = ({ title, date, index, OnPressEdit, OnPressDelete }: AdminProjectPanelProps) => {

    return (
        <div
            className="w-full">
            <div
                className="group flex flex-row justify-between items-center p-2 py-4 w-full rounded">
                <div className="border-b-2 border-b-zinc-500 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="flex items-center px-2.5 py-1 text-sm bg-zinc-900 group-hover:bg-zinc-700 font-bold font-text text-zinc-400 group-hover:text-zinc-300 rounded transition">
                            {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text self-center">
                            {title}
                        </h3>
                        <p className="text-sm pt-1 text-zinc-400 group-hover:text-zinc-300 group-hover:translate-x-1 transition font-text self-center">
                            [ {date} ]
                        </p>
                    </div>

                    <div className="flex flex-row items-center space-x-4">

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressEdit}
                                title='Edit project'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 text-zinc-400 hover:text-zinc-200 transition rounded'>
                                <FaRegEdit className='' />
                            </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressDelete}
                                title='Delete project'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-500 hover:border-zinc-300 text-zinc-400 hover:text-zinc-200 transition rounded'>
                                <RiDeleteBin5Line className='' />
                            </button>
                        </AlertDialog.Trigger>
                    </div>
                </div>
            </div>
        </div>
    )
}