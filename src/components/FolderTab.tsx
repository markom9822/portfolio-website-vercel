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
            className='relative z-0 bg-[#e9e9e9]/40 rounded-t-xl flex items-center justify-center font-text'>

            {activeTab === label && (
                <div
                    
                    className="absolute flex items-center justify-center inset-0 bg-[#e9e9e9] shadow-[3px_4px_10px_rgba(0,0,0,0.3)] rounded-t-xl z-[-1]"
                />
            )}
            <button
                title={label}
                onClick={() => handleTabPressed(label)}
                className={`flex text-base items-center justify-center space-x-3 px-2 py-1.5 w-40 h-12 rounded-t-xl duration-200 cursor-pointer ${activeTab === label
                    ? "text-zinc-900"
                    : "hover:bg-[#e9e9e9] text-zinc-600/80"
                    }`}
            >
                {Icon && <Icon size={20}/>}
                <span>{label}</span>
            </button>
        </div>
    )
}