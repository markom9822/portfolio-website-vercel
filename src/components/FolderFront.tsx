import profilePic from '/images/profile_photo_small.png'
import paperClip from '/images/paperclip_less.png'

type FolderFrontProps = {

    OnOpenFolder: () => void

}

export const FolderFront = ({ OnOpenFolder }: FolderFrontProps) => {

    return (
        <div className='flex flex-row w-3xl h-screen text-zinc-900 bg-[#dbd8d8] rounded my-3 mx-4 drop-shadow-xl relative'>

            <div className='flex flex-col relative w-19/20 h-full bg-[#e9e9e9] shadow-xl'>
                <div className='self-end mx-20 my-1 opacity-90 shadow-xl'>
                    <img height={300} width={300} style={{ borderRadius: '3px' }} src={profilePic} />
                </div>

                <div className='absolute right-80 -top-3'>
                    <img height={50} width={50} src={paperClip} />
                </div>

                <div className="absolute bottom-5 left-5 p-4 space-y-2 py-4">
                    <h2 className="font-text font-bold text-4xl">Personal Portfolio</h2>
                    <h2 className="font-text text-2xl">Mark O Meara</h2>
                    <p className='font-text text-lg'>Created: July 2025</p>
                </div>
            </div>

            <div className='w-1/20 h-full items-center'>
                <button 
                onClick={OnOpenFolder}
                className='h-full w-full hover:bg-white/10 duration-200 cursor-pointer text-zinc-500 hover:text-zinc-800 '>
                    <p className='font-text font-bold text-2xl rotate-90'>OPEN</p>
                </button>
            </div>

        </div>
    )
}