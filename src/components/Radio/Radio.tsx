import React from "react"
import { useFormContext } from 'react-hook-form'
import _ from 'lodash'

interface Props {
  name: string
  disabled?: boolean | undefined
}
interface RadioProps extends Props {
  onChange: (e: any) => void
  value: any
  checked?: boolean
}

interface RadioFieldProps extends Props {
  label?: string
  required?: boolean | undefined
  options: { label: string, value: string}[]
}

const Wrapper: React.FC = ({ children }) => {
  return (<div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
    {children}
    <div className="check-icon hidden border-4 border-primary-700 rounded-full w-full h-full z-1" />
  </div>
  )
}

export const Radio: React.FC<RadioProps> = ({ onChange, name, value, checked, disabled }) => {
  return (
    <Wrapper>
      <input type="radio" name={name} onChange={onChange} value={value || ""} disabled={disabled}
        className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none" />
    </Wrapper>
  );
};

export const RadioGroupField: React.FC<RadioFieldProps> = ({ name, disabled, options }) => {
    const { register, formState: { errors }  } = useFormContext()

    return (
      <div>
        {
          options?.map((option, index) => 
            <div key={index} className="flex flex-row items-center pb-2">
              <Wrapper>
                <input
                  type="radio"
                  {...register(name)}
                  value={option.value}
                  className="checkbox appearance-none focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none" />
              </Wrapper>
              <p className="ml-2 text-sm sm:text-sm tracking-wide text-gray-700">{option.label}</p>
            </div>)
        }
        <p className="text-sm text-red-500">{_.get(errors, name)?.message}</p>
      </div>
    )
}
