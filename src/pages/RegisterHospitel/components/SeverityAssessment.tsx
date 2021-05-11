import React, { useEffect, useState } from 'react'
import { useForm, FormProvider, useFieldArray, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputField } from '../../../components/input/Input'
import logo from '../../../assets/logo/praram9-logo.svg'
import { MENU } from '../RegisterHospitelPage'
import { useUserInfo, useUserSeverity } from '../../../hooks/hospitel'
import { DatePickerField } from '../../../components/DateTimePicker/DateTimePicker'
import { RadioGroupField } from '../../../components/Radio/Radio'
import { CheckboxField, Checkbox } from '../../../components/Checkbox/Checkbox'
import AddIcon from '../../../assets/icons/add-icon.svg'
import RemoveIcon from '../../../assets/icons/remove-icon.svg'
import { decimalNumber, numberOnly } from '../../../utils/regex'
import GroupField from '../../../components/GroupField/GroupField'
import _ from 'lodash'
import useSWR from 'swr'

export interface Props {
  onNextStep: () => void
}

interface ISyndrome {
  obesity: boolean
}
interface IForm {
  weight: string
  height: string
  can_help_yourself: string
  bmi: number
  syndrome: ISyndrome
}

const schema = yup.object().shape({
  syndrome: yup.object().shape({
    fever_temperature: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.fever_temperature_show') ? !!value : true
    }),
    fever_date: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.fever_temperature_show') ? !!value : true
    }),
    cough_date: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.cough_date_show') ? !!value : true
    }),
    sore_throat_date: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.sore_throat_date_show') ? !!value : true
    }),
    easily_tired_date: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.easily_tired_date_show') ? !!value : true
    }),
    diarrhea_date: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.diarrhea_count_show') ? !!value : true
    }),
    diarrhea_count: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.diarrhea_count_show') ? !!value : true
    }),
    chronic_respiratory_disease: yup.boolean(),
    cardiovascular_disease: yup.boolean(),
    chronic_kidney_disease: yup.boolean(),
    cerebrovascular_disease: yup.boolean(),
    cancer_during_treatment: yup.boolean(),
    diabetes: yup.boolean(),
    obesity: yup.boolean().transform((value, form) => {
      if (form.bmi < 29) return true
      else return value
    }),
    other: yup.string().test('', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.other_show') ? !!value : true
    }),
  }),
  can_help_yourself: yup.string().required('กรุณากรอก'),
  can_help_yourself_reason: yup.string().test('if required', 'กรุณากรอก', (value, context: any) => {
    if (context?.parent.can_help_yourself === 'true') return true
    else return value ? true : false
  }),
  weight: yup.string().required('กรุณากรอก'),
  height: yup.string().required('กรุณากรอก'),
  bmi: yup.number(),
  routine_medication: yup.array().of(yup.string()
    // yup.object().shape({
    //   value: yup.string(),
    // })
  ),
  allergic_drugs: yup.array().of(yup.string()
    // yup.object().shape({
    //   value: yup.string(),
    // })
  ),
})

const SeverityAssessment: React.FC<Props> = ({ onNextStep }) => {
  // ########################### FORM HANDLER ###########################
  const { data,  postUserSeverityAssessment } = useUserSeverity()
  const defaultValues = {
    can_help_yourself: 'false',
    routine_medication: [],
    allergic_drugs: [],
  }
  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues },
    reValidateMode: 'onChange',
  })

  const prepareFormData = (data: any) => {
    // add field + _show
    const formdata = {...data}

    formdata.syndrome = {
      ...formdata.syndrome,
      fever_temperature_show: (formdata?.syndrome?.fever_temperature || formdata?.syndrome?.fever_date) ? true : false,
      cough_date_show: formdata?.syndrome?.cough_date ? true : false,
      sore_throat_date_show: formdata?.syndrome?.sore_throat_date ? true : false,
      easily_tired_date_show: formdata?.syndrome?.easily_tired_date ? true : false,
      diarrhea_count_show: (formdata?.syndrome?.diarrhea_count || formdata?.syndrome?.diarrhea_date) ? true : false,
      other_show: formdata?.syndrome?.other ? true : false,
    }
    if (formdata?.syndrome?.diarrhea_count) {
      formdata.syndrome.diarrhea_count = formdata.syndrome.diarrhea_count+""
    }
    if (formdata?.syndrome?.fever_temperature) {
      formdata.syndrome.fever_temperature = formdata.syndrome.fever_temperature+""
    }
    formdata.weight = formdata.weight+""
    formdata.height = formdata.height+""
    formdata.can_help_yourself = formdata.can_help_yourself ? "true" : "false"

    return formdata
  }
  useEffect(() => {
    const formdata = prepareFormData(data)
    methods.reset({
      ...formdata,
      ...defaultValues,
      routine_medication: formdata.routine_medication,
      allergic_drugs: formdata.allergic_drugs
    })
  }, [data])

  const routine_medication_array = useFieldArray({
    control: methods.control,
    name: 'routine_medication' as never,
  })
  const allergic_drugs_array = useFieldArray({
    control: methods.control,
    name: 'allergic_drugs' as never,
  })

  // ########################### FORM HANDLER ###########################

  // ########################### SUBMIT FORM ###########################
  const { handleSubmit, watch } = methods

  const weight = watch('weight')
  const height = watch('height')
  useEffect(() => {
    if (weight && height) {
      const bmi = Number(weight) / ((Number(height) * Number(height)) / 10000)

      methods.setValue('syndrome.obesity', bmi > 29)
      methods.setValue('bmi', bmi)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, weight])

  const preSubmitData = async (formdata: any) => {
    const _formdata = { ...formdata }
    // await hospitelAPI.uploadFile(data)
    _formdata.weight = Number(formdata.weight)
    _formdata.height = Number(formdata.height)
    if (formdata?.syndrome?.diarrhea_count) {
      _formdata.syndrome.diarrhea_count = Number(formdata.syndrome.diarrhea_count)
    }
    if (formdata?.syndrome?.fever_temperature) {
      _formdata.syndrome.fever_temperature = Number(formdata.syndrome.fever_temperature)
    }
    _formdata.can_help_yourself = _formdata.can_help_yourself === 'true' ? true : false
    if (_formdata.can_help_yourself) {
      _formdata.can_help_yourself_reason = ""
    }
    return _formdata
  }

  const onSubmit = handleSubmit(async (formdata) => {
    const data = await preSubmitData(formdata)
    await postUserSeverityAssessment(data)
    onNextStep()
  })

  const formValue = watch()
  // console.log('formValue:', formValue)
  // console.log('formState errors:', methods.formState.errors)
  // ########################### SUBMIT FORM ###########################

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-4 bg-white h-full flex flex-col justify-between">
        <div className="scroll-content">
          <img src={logo} alt="param9-logo" className="m-auto" height="90" width="90" />
          <h1 className="text-lg m-auto text-primary-700 font-bold text-center pt-2 pb-4">{MENU.risk.title}</h1>
          <p className="text-sm font-bold pb-2">คุณมีอาการเหล่านี้หรือไม่ (เลือกได้มากกว่า 1 ข้อ)</p>
          <GroupField
            title="ไข้"
            fields={[
              {
                name: 'syndrome.fever_temperature',
                label: 'อุณหภูมิที่วัดได้',
                type: 'text',
                useNumberFormat: true,
                decimalScale: 1,
              },
              {
                name: 'syndrome.fever_date',
                label: 'วันที่เริ่มมีอาการ',
                type: 'date',
              },
            ]}
          />
          <GroupField
            title="ไอ"
            fields={[
              {
                type: 'date',
                name: 'syndrome.cough_date',
              },
            ]}
          />
          <GroupField
            title="เจ็บคอ"
            fields={[
              {
                type: 'date',
                name: 'syndrome.sore_throat_date',
              },
            ]}
          />
          <GroupField
            title="เหนื่อยหอบ"
            fields={[
              {
                type: 'date',
                name: 'syndrome.easily_tired_date',
              },
            ]}
          />
          <GroupField
            title="ท้องเสีย"
            fields={[
              {
                name: 'syndrome.diarrhea_count',
                label: 'ถ่ายวันละกี่ครั้ง',
                type: 'text',
                useNumberFormat: true,
                decimalScale: 0,
              },
              {
                name: 'syndrome.diarrhea_date',
                label: 'วันที่เริ่มมีอาการ',
                type: 'date',
              },
            ]}
          />

          <p className="text-sm font-bold py-2">คุณสามารถช่วยเหลือตัวเองได้หรือไม่ ?</p>
          <RadioGroupField
            name="can_help_yourself"
            options={[
              { label: 'ได้', value: 'true' },
              { label: 'ไม่ได้', value: 'false' },
            ]}
          />
          <div className={`${formValue?.can_help_yourself === 'true' && 'hidden'} pl-6`}>
            <InputField type="text" name="can_help_yourself_reason" label="โปรดระบุอาการ" />
          </div>

          <div className="py-2">
            <InputField
              type="text"
              useNumberFormat
              name="weight"
              decimalScale={1}
              label="น้ำหนัก (กิโลกรัม)"
              required
            />
            <InputField
              type="text"
              useNumberFormat
              name="height"
              decimalScale={1}
              label="ส่วนสูง (เซนติเมตร)"
              required
            />
            <span className="hidden">
              <InputField type="text" name="bmi" />
            </span>
          </div>

          <p className="text-sm font-bold py-2">โรคประจำตัว</p>
          <CheckboxField className="pb-1" name="syndrome.chronic_respiratory_disease" label="โรคทางเดินหายใจเรื้อรัง" />
          <CheckboxField className="pb-1" name="syndrome.cardiovascular_disease" label="โรคหัวใจและหลอดเลือด" />
          <CheckboxField className="pb-1" name="syndrome.chronic_kidney_disease" label="โรคไตวายเรื้อรัง" />
          <CheckboxField className="pb-1" name="syndrome.cerebrovascular_disease" label="โรคหลอดเลือดสมอง" />
          <CheckboxField
            className="pb-1"
            name="syndrome.cancer_during_treatment"
            label="โรคมะเร็งทุกชนิดที่อยู่ระหว่างการรักษาด้วยเคมีบำบัด รังสีบำบัด และภูมิคุ้มกันบำบัด"
          />
          <CheckboxField className="pb-1" name="syndrome.diabetes" label="โรคเบาหวาน" />
          <CheckboxField className="pb-1" name="syndrome.obesity" disabled={formValue?.bmi > 29} label="โรคอ้วน" />
          <GroupField
            title="โรคประจำตัวอื่นๆ โปรดระบุ"
            fields={[
              {
                type: 'text',
                name: 'syndrome.other',
              },
            ]}
          />

          <p className="text-sm font-bold py-2">ยาที่ทานประจำ</p>
          {routine_medication_array?.fields.map((field: any, index) => (
            <div className="flex flex-row items-center">
              <div className="flex-1">
                <InputField
                  type="text"
                  key={field.id}
                  name={`routine_medication.${index}`}
                  defaultValue={field?.value}
                  autoFocus
                />
              </div>
              <button
                className="ml-2 mb-2 focus:outline-none"
                type="button"
                onClick={() => routine_medication_array?.remove(index)}
              >
                <img src={RemoveIcon} height="14px" width="14px" />
              </button>
            </div>
          ))}
          <button type="button" className="focus:outline-none" onClick={() => routine_medication_array?.append({})}>
            <img src={AddIcon} height="14px" width="14px" />
          </button>

          <p className="text-sm font-bold py-2">ยาที่แพ้</p>
          {allergic_drugs_array?.fields.map((field: any, index) => (
            <div className="flex flex-row items-center">
              <div className="flex-1">
                <InputField
                  type="text"
                  key={field.id}
                  name={`allergic_drugs.${index}`}
                  defaultValue={field?.value}
                  autoFocus
                />
              </div>
              <button
                className="ml-2 mb-2 focus:outline-none"
                type="button"
                onClick={() => allergic_drugs_array?.remove(index)}
              >
                <img src={RemoveIcon} height="14px" width="14px" />
              </button>
            </div>
          ))}
          <button type="button" className="focus:outline-none" onClick={() => allergic_drugs_array?.append({})}>
            <img src={AddIcon} height="14px" width="14px" />
          </button>

          <button
            type="button"
            className={`w-full mt-4 self-end btn-primary btn`}
            onClick={onSubmit}
          >
            ถัดไป
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
export default SeverityAssessment
