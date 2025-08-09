import * as React from "react"

type CheckboxFieldProps = {

    className: string,
    placeholder: string,
    type:  React.HTMLInputTypeAttribute,
    checked: boolean,
    OnInputChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void,

}

export const CheckboxField = ({ className, placeholder, type, checked, OnInputChanged, ...props }: CheckboxFieldProps) => {

    return (
    <input
      checked={checked}
      type={type}
      data-slot="input"
      onChange={OnInputChanged}
      placeholder={placeholder}
      className="flex h-4 min-w-0 rounded-md placeholder:text-zinc-500 text-zinc-100 font-text px-2 border-2 border-zinc-500"
      {...props} />
  );

}