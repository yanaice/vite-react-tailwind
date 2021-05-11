import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CheckboxField } from '../Checkbox/Checkbox'
import { DatePickerField } from '../DateTimePicker/DateTimePicker'
import { InputField, InputFieldProps } from '../input/Input'

interface GroupFieldProps {
  placeholder?: string
  title: string
  fields: InputFieldProps[]
  className?: string
}

const GroupField: React.FC<GroupFieldProps> = ({ title, fields, className }) => {
  const { watch } = useFormContext()


  const watchFieldShow = watch(`${fields[0].name}_show`) // first field is main to check show 

  return (<div>
    <div className={`flex flex-row items-center pb-1 ${className}`}>
      <CheckboxField name={`${fields[0].name}_show`} />
      <p className="text-sm text-gray-700">{title}</p>
    </div>
    <div className={`${!watchFieldShow && 'hidden'} pl-6 pt-1`}>
    {
      fields?.map(({name, label, type, ...props}, index) => <div key={index}>
        {type !== 'date' && <InputField type={type} label={label} name={name} {...props} />}
        {type === 'date' && <DatePickerField label={label || 'วันที่เริ่มมีอาการ'} name={name} />}
      </div>)
    }
    </div>
  </div>)
}

export default GroupField