import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'

interface Props {
  name: string
  disabled?: boolean | undefined
  accept?: string
  createText?: string
  updateText?: string
  multiple?: boolean
  onBlur?: () => void
  className?: string
}

interface FileProps extends Props {
  value: any | never
  onChange: (e: any) => void
}

interface FileFieldProps extends Props {
  label?: string | undefined
	required?: boolean | undefined
  showValueOn?: 'left' | 'right' | 'none'
}

export const File: React.FC<FileProps> = ({
    accept = "image/*",
    disabled,
    value,
    name,
    multiple,
    onChange,
    onBlur,
    createText = "อัพโหลด",
    updateText = 'แก้ไข',
    className,
  }) => {
  
  const handleSelectFile = (e: any) => {
		e.stopPropagation()
    if (multiple) {
      // Object.keys(value).map((_, index) => console.log(value?.[index].name))
      return onChange(e.target.files)
    }
    onChange(e.target.files[0])
	}
  
	return (<div className={className}>
    <input
      id={`${name}-upload`}
      type="file"
      multiple={multiple}
      accept={accept}
      disabled={disabled}
      onBlur={onBlur}
      onChange={handleSelectFile}
      className="hidden" 
    />
    <label htmlFor={`${name}-upload`} className={`btn btn-upload ${disabled && 'disabled'}`}>
      {
        value
        ? (updateText || 'แก้ไข')
        : (createText || 'อัพโหลด')
      }
    </label>
  </div>)
}

export const FileField : React.FC<FileFieldProps> = ({ name, required, label, showValueOn = 'left', ...props }) => {

  const { control, formState: { errors }  } = useFormContext()

  const showFileName = (value: File | File[] | string | string[] | undefined) => {
    if (!value) return false
    if (typeof value === 'string') return value

    return 'มีไฟล์'
    // if (value?.name) return value?.name
    
    // if (typeof value === 'object' && value.length > 1) { // multile file
    //   return Object.keys(value).map((_, index) => <div key={index} className="pl-4">{value?.[index]?.name || value}</div>)
    // }
  }

  return (<Controller
		name={name}
		control={control}
    render={({ field: { name, onChange, onBlur, value, ref } }) => <div>
      <div className={`flex flex-row items-center`}>
        {label && <div className="mb-1 text-sm sm:text-sm tracking-wide text-gray-700 flex-1">
          {label}{required ? '*' : ''}
        </div>}
        {showValueOn === 'left' && showFileName(value) && <div className="ml-3 text-xs text-primary-700 truncate mr-2">{showFileName(value)}</div>}
        <File
          name={name}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          {...props}
        />
        {showValueOn === 'right' && showFileName(value) && <div className="ml-3 text-xs text-primary-700 truncate ml-2">{showFileName(value)}</div>}
      </div>
      <p className="text-xs text-red-500">{_.get(errors, name)?.message}</p>
    </div>}
  />)
}