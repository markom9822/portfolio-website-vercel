
type TextAreaFieldProps = {

    className: string,
    placeholder: string,
    value: string,
}

export const TextAreaField = ({ className, placeholder, value, ...props }: TextAreaFieldProps) => {

    return (
    <textarea
      data-slot="textarea"
      placeholder={placeholder}
      value={value}
      className="flex text-sm min-h-20 w-full min-w-0 rounded-md placeholder:text-zinc-500 text-zinc-100 font-text px-2 border-2 border-zinc-500"
      {...props} />
  );

}