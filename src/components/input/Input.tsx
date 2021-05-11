import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import NumberFormat from 'react-number-format'
import { numberOnly } from '../../utils/regex'

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	// type: string | undefined
	// pattern?: string
	// min?: number
	// max?: number
	// disabled?: boolean
	// placeholder?: string
	defaultValue?: string
	// maxLength?: number
	// autoFocus?: boolean
	// inputMode?: "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined
}

interface FormatNumber {
	format?: string
	// decimalSeparator?: string
	useNumberFormat?: boolean
	allowNegative?: boolean
	decimalScale?: number
}
export interface InputProps extends Props, FormatNumber {
	name?: string
	value: any
	onChange: (e: any) => void
}
export interface InputFieldProps extends Props, FormatNumber {
	name: string
  label?: string
	required?: boolean
}

export const Input: React.FC<InputProps> = //({ format, ...props}) => {
({
	format,
	useNumberFormat,
	allowNegative,
	decimalScale,
	inputMode,
	...props
}) => {
	if (useNumberFormat || format) {
		return (<NumberFormat
			{...props}
			type="text"
			format={format}
			allowNegative={allowNegative || false}
			decimalScale={decimalScale}
			inputMode="decimal"
			className="text-sm sm:text-base py-1 px-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none w-full"
		/>)
	}	else {
		return (<input
			{...props}
			inputMode={inputMode}
			className="text-sm sm:text-base py-1 px-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none w-full"
		/>)
	}
}

export const InputField: React.FC<InputFieldProps> = props => {
	const { register, control, formState: { errors }  } = useFormContext()
	
	const { name, label, required } = props
	// field: { name, onChange, onBlur, value, ref }
	return (<Controller
		name={name}
		control={control}
		render={({ field }) => {
			return (<div className={`flex flex-col mb-2`}>
				{label && <div className="mb-1 text-sm sm:text-sm tracking-wide text-gray-700 flex-2">
					{label}{required ? '*' : ''}
				</div>}
				<Input
					{...props}
					{...field}
				/>
				<p className="text-sm text-red-500">{_.get(errors, name)?.message}</p>
			</div>
			)}} 
	/>  )
}
