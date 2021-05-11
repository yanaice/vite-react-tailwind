import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'

interface Props {
  disabled?: boolean | undefined
}

interface CheckboxProps extends Props {
  onChange: () => void
  value: any
}
interface CheckboxFieldProps extends Props {
  name: `${string}` | `${string}.${string}` | `${string}.${number}`
  className?: any
  label?: string
  required?: boolean | undefined
}
const CheckboxWrapper: React.FC = ({ children }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 border rounded-sm border-gray-400 dark:border-gray-700 w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
        {children}
        <div className="check-icon hidden bg-primary-500 text-white rounded-sm">
          <svg
            className="icon icon-tabler icon-tabler-check"
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </div>
      </div>
      <style>
        {`.checkbox:checked + .check-icon {
        display: flex;
    }`}
      </style>
    </>
  )
}
export const Checkbox: React.FC<CheckboxProps> = ({ onChange, value, disabled }) => {
  return (
    <CheckboxWrapper>
      <input
        onChange={onChange}
        type="checkbox"
        checked={value}
        disabled={disabled}
        className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
      />
    </CheckboxWrapper>
  )
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, disabled, label, required, className }) => {
  const {
    formState: { errors },
    register,
  } = useFormContext()
  
  return (
    <div className={className}>
      <div className="flex flex-row items-center">
        <CheckboxWrapper>
          <input
            type="checkbox"
            disabled={disabled}
            className="checkbox opacity-0 absolute cursor-pointer w-full h-full"
            {...register(name)}
          />
        </CheckboxWrapper>
        <p className="ml-2 text-sm sm:text-sm tracking-wide text-gray-700">
          {label}
          {required ? '*' : ''}
        </p>
      </div>
      <p className="text-sm text-red-500">{_.get(errors, name)?.message}</p>
    </div>
  )
}
