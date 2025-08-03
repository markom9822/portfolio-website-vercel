import * as React from "react"

type InputFieldProps = {

    className: string,
    placeholder: string,
    type:  React.HTMLInputTypeAttribute,
    value: string

}

export const InputField = ({ className, placeholder, type, value, ...props }: InputFieldProps) => {

    return (
    <input
      type={type}
      data-slot="input"
      value={value}
      placeholder={placeholder}
      className="flex h-9 w-full min-w-0 rounded-md placeholder:text-zinc-500 text-zinc-100 font-text px-2 border-2 border-zinc-500"
      {...props} />
  );

}