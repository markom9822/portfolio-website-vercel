
type DateInputFieldProps = {

    className: string,
    value: string

}

export const DateInputField = ({ className, value, ...props }: DateInputFieldProps) => {

    return (
    <input
      type='date'
      data-slot="input"
      value={value}
      className="flex h-9 w-full min-w-0 rounded-md placeholder:text-zinc-500 text-zinc-100 font-text px-2 border-2 border-zinc-500"
      {...props} />
  );

}