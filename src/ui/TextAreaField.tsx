
type TextAreaFieldProps = {

    className: string,
    placeholder: string,
    value: string,
    minHeight?: number,
    OnInputChanged?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const TextAreaField = ({ className, placeholder, value, minHeight = 100, OnInputChanged, ...props }: TextAreaFieldProps) => {

    const inputClassName = `flex text-sm w-full min-w-0 rounded-md placeholder:text-zinc-500 text-zinc-100 font-text px-2 border-2 border-zinc-500`;

    return (
    <textarea
      data-slot="textarea"
      placeholder={placeholder}
      onChange={OnInputChanged}
      value={value}
      className={inputClassName}
      style={{minHeight: minHeight}}
      {...props} />
  );

}