import { PiLinkedinLogo, PiGithubLogo } from "react-icons/pi";

type FolderBackProps = {

    OnCloseFolder: () => void

}

export const FolderBack = ({ OnCloseFolder }: FolderBackProps) => {

    return (
        <div className='absolute flex flex-row-reverse h-screen w-1/4 bg-[#d6d5d5] -left-5 items-center justify-end'>
            
            
            <button 
            onClick={OnCloseFolder}
            className='h-full w-1/2 hover:bg-white/10 duration-200 cursor-pointer text-zinc-500 hover:text-zinc-800'>
                <p className='-rotate-90 font-text font-bold text-xl'>BACK TO COVER</p>
            </button>

            <div className='h-30 w-1/2 mx-10 flex border-2 border-zinc-600 border-dashed rounded-2xl items-center space-x-2 justify-center text-zinc-800'>

                <a
                    href="https://github.com/markom9822"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors text-zinc-600 hover:text-zinc-800"
                    aria-label="Github"
                >
                    <PiGithubLogo size={40} />

                </a>

                <a
                    href="https://www.linkedin.com/in/marko-meara/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors text-zinc-600 hover:text-zinc-800"
                    aria-label="LinkedIn"

                >
                    <PiLinkedinLogo  size={40}/>

                </a>
            </div>
        </div>
    )
}