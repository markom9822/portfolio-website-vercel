import type { IconType } from "react-icons"

type FolderTabProps = {

    label: string,
    activeTab: string,
    handleTabPressed: (label: string) => void,
    Icon: IconType
}

export const FolderTab = ({ label, activeTab, handleTabPressed, Icon }: FolderTabProps) => {


    return (
        <div
            key={label}
            className='relative z-0 bg-amber-300/70 rounded-r-xl items-center justify-center inset-shadow-2xs'>

            {activeTab === label && (
                <div
                    className="absolute inset-0 bg-amber-200 rounded-r-xl z-[-1] inset-shadow-2xs"
                />
            )}
            <button
                title={label}
                onClick={() => handleTabPressed(label)}
                className={`flex text-base items-center space-x-5 px-2 py-1.5 w-10 h-20 rounded-r-xl duration-200 cursor-pointer ${activeTab === label
                    ? "text-zinc-900"
                    : "hover:bg-amber-200 text-zinc-600/80"
                    }`}
            >
                {Icon && <Icon size={20}/>}
            </button>
        </div>
    )
}