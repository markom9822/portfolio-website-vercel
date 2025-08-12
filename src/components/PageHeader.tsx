

type PageHeaderProps = {
}

export const PageHeader = ({ }: PageHeaderProps) => {


  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-between text-xs sm:text-xs md:text-sm lg:text-base items-center text-zinc-600 font-type-reg">
        <p>mark o m.</p>

        <p>Portfolio website</p>

        <p>started: July, 2025</p>

      </div>

      <div className="w-full h-6 border-t-1 border-t-zinc-600  border-r-1 border-r-zinc-600  border-l-1 border-l-zinc-600 mb-6">
      </div>
    </div>
  )
}