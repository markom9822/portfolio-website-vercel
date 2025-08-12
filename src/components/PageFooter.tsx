
import { PiGithubLogo, PiLinkedinLogo } from "react-icons/pi"

type PageFooterProps = {
}

export const PageFooter = ({ }: PageFooterProps) => {


  return (
    <div className="flex flex-col justify-center item mt-6">

      <div className="flex flex-col justify-between text-xs sm:text-xs md:text-sm lg:text-base items-center text-zinc-600 font-type-reg">

        <div className="w-full h-6 border-b-1 border-b-zinc-600  border-r-1 border-r-zinc-600  border-l-1 border-l-zinc-600" />

        <div className="flex-row flex justify-between items-center text-center w-full">
          <p>mark o m.</p>

          <div className="flex flex-row space-x-3">
            <a
              href="https://github.com/markom9822"
              target="_blank"
              rel="noreferrer"
              className="transition-colors text-zinc-700 hover:text-zinc-900
               py-1 flex flex-row-reverse items-center"
              aria-label="Github">
              <PiGithubLogo className="w-5 h-5 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:h-9 lg:w-9" />
              <p className="px-2">GitHub</p>
            </a>

            <a
              href="https://www.linkedin.com/in/marko-meara/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors text-zinc-700 hover:text-zinc-900 py-1 flex flex-row items-center"
              aria-label="LinkedIn">
              <PiLinkedinLogo className="w-5 h-5 sm:w-5 sm:h-5 md:w-7 md:h-7 lg:h-9 lg:w-9" />
              <p className="px-2">LinkedIn</p>
            </a>

          </div>

          <p>started: July, 2025</p>
        </div>

      </div>

    </div>
  )
}