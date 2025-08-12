
type TextAreaFieldProps = {

    className: string,
    placeholder: string,
    value: string,
    minHeight?: number,
    OnInputChanged?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
}

export const TextAreaField = ({ className, placeholder, value, minHeight = 100, OnInputChanged, ...props }: TextAreaFieldProps) => {

    const inputClassName = `flex text-base w-full min-w-0 rounded-md placeholder:text-zinc-700 text-zinc-800 font-type-bold p-2 border-dashed border-3 border-zinc-800`;

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