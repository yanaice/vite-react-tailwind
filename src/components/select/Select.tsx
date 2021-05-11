import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'

interface SelectProps {
    label: string
    value: any
}
export interface Props {
    label: string
    options: SelectProps[]
    required: boolean | undefined
    name: string
}

interface IProps {
    options: SelectProps[]
    value: any
    onChange: (_value: any) => void
}

export const Select: React.FC<IProps> = ({ options, value, onChange }) => {
    const [show, setShow] = useState(false)

    const handleToggle = () => {
        setShow(!show)
    }
    const handleSelect = () => {
        onChange(value)
        setShow(!show)
    }
    return (<div className="flex flex-col items-center relative">
        <div className="w-full  svelte-1l8159u">
            <div className="my-2 bg-white p-1 flex border border-gray-200 rounded svelte-1l8159u">
                <div className="flex flex-auto flex-wrap"></div>
                <input value={value} className="p-1 px-2 bg-white appearance-none outline-none w-full text-gray-800" disabled />
                <div className={`text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u`}>
                    <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none" type="button" onClick={handleToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className={`feather feather-chevron-up w-4 h-4 transition duration-200 ease-in-out transform ${!show ? '-rotate-180' : '-rotate-0'}`}>
                            <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div className={`${show ? '' : 'hidden'} absolute shadow top-14 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj h-36`}>
            <div className="flex flex-col w-full bg-white">
                {
                    options.map(({ label, value }, index) => <div key={index} className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100" onClick={handleSelect}>
                        <div className="flex w-full items-center p-2 pl-2 bg-white border-l-2 relative hover:bg-teal-600 hover:text-teal-100 hover:border-teal-600">
                            <div className="w-full items-center flex">
                                <div className="mx-2 leading-6">{label}</div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </div>)
}

const InputField: React.FC<Props> = ({ options, label, required, name }) => {
const { control, formState: { errors }  } = useFormContext()

const handleSelect = (value: any, onChange: any, onBlur: any) => {
    onChange(value)
    onBlur()
    
}
return (<Controller
    control={control}
    name={name}
    render={({
      field: { onChange, onBlur, value, name, ref },
      fieldState: { invalid, isTouched, isDirty, error },
      formState,
    }) => (
        <div className="w-full">
        {label && <label className="mb-1 text-sm sm:text-sm tracking-wide text-gray-700">
            {label}{required ? '*' : ''}
        </label>}
        <Select options={options} value={value} onChange={(value) => handleSelect(value, onChange, onBlur)} />
        <p className="text-sm text-red-500">{_.get(errors, name)?.message}</p>
        </div>
        )}
  />)
}

export default InputField