import type { ChangeEvent } from "react";

interface LabelledInputType{
    label : string;
    placeholder : string;
    type? : string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({label,placeholder, type, onChange} : LabelledInputType) => {
  return (
    <>
    <div>
        <label className="block mb-1 text-sm font-semibold  text-heading">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="mb-4 rounded-md bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
    </div>
    </>
  )
}

export default LabelledInput