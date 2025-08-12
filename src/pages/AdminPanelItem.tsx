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
                <div className="border-b-3 border-dashed border-b-zinc-800 flex flex-row justify-between items-center w-full py-2">

                    <div className="flex flex-row items-center space-x-6">
                        <div className="px-2.5 py-1 text-base font-bold font-title border-2 border-zinc-400 group-hover:border-zinc-800 text-zinc-500 group-hover:text-zinc-900 rounded transition">
                            {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-800 group-hover:text-zinc-700 group-hover:translate-x-1 transition font-type-bold self-center">
                            {title}
                        </h3>
                        <p className="text-sm pt-1 text-zinc-800 group-hover:text-zinc-700 group-hover:translate-x-1 transition font-type-bold self-center">
                            [ {date} ]
                        </p>
                    </div>

                    <div className="flex flex-row items-center space-x-4">

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressEdit}
                                title='Edit project'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 text-zinc-800 hover:text-zinc-700 transition rounded'>
                                <FaRegEdit className='' />
                            </button>
                        </AlertDialog.Trigger>

                        <AlertDialog.Trigger asChild>
                            <button
                                onClick={OnPressDelete}
                                title='Delete project'
                                className='p-2 duration-200 cursor-pointer border-2 border-zinc-800 hover:border-zinc-700 text-zinc-800 hover:text-zinc-700 transition rounded'>
                                <RiDeleteBin5Line className='' />
                            </button>
                        </AlertDialog.Trigger>
                    </div>
                </div>
            </div>
        </div>
    )
}