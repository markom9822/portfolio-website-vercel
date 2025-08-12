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
            className='relative z-0 text-xs sm:text-xs md:text-sm lg:text-lg bg-[#e9e9e9]/40 rounded-t-xl
             border-t-1 border-t-zinc-300 border-l-1 border-l-zinc-300 border-r-1 border-r-zinc-300 flex items-center justify-center font-type-bold'>

            {activeTab === label && (
                <div
                    
                    className="absolute flex items-center justify-center inset-0 bg-[#e9e9e9] shadow-[3px_4px_10px_rgba(0,0,0,0.3)] rounded-t-xl z-[-1]"
                />
            )}
            <button
                title={label}
                onClick={() => handleTabPressed(label)}
                className={`flex items-center justify-center md:space-x-3 px-2 py-1.5 w-20 sm:w-20 md:w-30 lg:w-50 h-12 
                    rounded-t-xl duration-200 cursor-pointer
                     ${activeTab === label
                    ? "text-zinc-900"
                    : "hover:bg-[#e9e9e9] text-zinc-600/80"
                    }`}
            >
                {Icon && <Icon className="w-0 h-0 md:w-3 md:h-3 lg:h-4 lg:w-4"/>}
                <span className="border-b-1 border-b-zinc-400 border-dashed">{label}</span>
            </button>
        </div>
    )
}