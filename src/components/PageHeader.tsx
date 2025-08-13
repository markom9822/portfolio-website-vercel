

type PageHeaderProps = {
}

export const PageHeader = ({ }: PageHeaderProps) => {


  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-row text-[0.45rem] sm:text-xs md:text-sm lg:text-base items-center text-zinc-600 font-type-reg w-full">
        <p className="w-1/3 flex justify-start">mark o m.</p>

        <p className="w-1/3 flex justify-center">Portfolio website</p>

        <p className="w-1/3 flex justify-end">started: July, 2025</p>

      </div>

      <div className="w-full h-6 border-t-1 border-t-zinc-600  border-r-1 border-r-zinc-600  border-l-1 border-l-zinc-600 mb-6">
      </div>
    </div>
  )
}