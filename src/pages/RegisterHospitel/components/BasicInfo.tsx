import React, { useEffect, useState } from 'react'
import logo from '../../../assets/logo/praram9-logo.svg'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { InputField } from '../../../components/input/Input'
import { FileField } from '../../../components/File/File'
import { DatePickerField } from '../../../components/DateTimePicker/DateTimePicker'
import { MENU } from '../RegisterHospitelPage'
import { useUserInfo, useUserIdentify } from '../../../hooks/hospitel'
import { validateCitizenID } from '../../../utils/validateForm'
import _ from 'lodash'
import dayjs from 'dayjs'

interface IForm {}

const schema = yup.object().shape({
  first_name: yup.string().required('กรุณากรอกชื่อ'),
  last_name: yup.string().required('กรุณากรอกนามสกุล'),
  date_of_birth: yup.string().nullable().required('กรุณาเลือกวันเกิด'),
  citizen_id: yup
    .string()
    .required('กรุณากรอกเลขบัตรประชาชน 13 หลัก')
    .test('len', 'เลขบัตรประชาชนไม่ครบ 13 หลัก', (val) => val?.trim().length === 13)
    .test('validCitizenID', 'เลขบัตรประชาชนไม่ถูกต้อง', (val) => validateCitizenID(val + '')),
  tel: yup
    .string()
    .required('กรุณากรอกเบอร์โทรศัพท์ 10 หลัก')
    .test('len', 'กรุณากรอกเบอร์โทรศัพท์ไม่ครบ 10 หลัก', (val) => val?.trim().length === 10),
  age: yup.number().transform((value, context) => value),
  address: yup.object().shape({
    house_no: yup.string().required('กรุณากรอก'),
    alley: yup.string(),
    village: yup.string(),
    road: yup.string().required('กรุณากรอก'),
    sub_district: yup.string().required('กรุณากรอก'),
    district: yup.string().required('กรุณากรอก'),
    province: yup.string().required('กรุณากรอก'),
    post_code: yup.string().required('กรุณากรอก'),
  }),
  e_mail: yup.string().email('อีเมลไม่ถูกต้อง').required('กรุณากรอก'),
  tested_hospital: yup.string().required('กรุณากรอก'),
  tested_date: yup.string().required('กรุณากรอก'),
  test_result_url: yup.string().required('กรุณาอัพโหลด'),
  contact: yup.object().shape({
    first_name: yup.string().required('กรุณากรอก'),
    last_name: yup.string().required('กรุณากรอก'),
    tel: yup.string().required('กรุณากรอก'),
    relation: yup.string().required('กรุณากรอก'),
  }),
  id_card_with_face_url: yup.string().required('กรุณาอัพโหลด'),
})

export interface Props {
  onNextStep: () => void
}

const BasicInfo: React.FC<Props> = ({ onNextStep }) => {
  // ########################### FORM HANDLER ###########################
  const { data, error, postUserIdentity } = useUserIdentify()
  const defaultValues = {}
  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues },
    reValidateMode: 'onChange',
  })

  const prepareFormData = (data: any) => {
    // add field + _show
    return { ...data }
  }
  useEffect(() => {
    const formdata = prepareFormData(data)
    methods.reset(_.cloneDeep({ ...defaultValues, ...formdata }))
  }, [data])

  // ########################### FORMDATA ###########################

  // ########################### SUBMIT FORM ###########################
  const [loading, setLoading] = useState(false)
  const { handleSubmit, watch } = methods

  const preSubmitData = (formdata: any) => {
    const _formdata = { ...formdata }
    _formdata.age = dayjs().diff(dayjs(_formdata.date_of_birth))
    _formdata.date_of_birth = dayjs(formdata.date_of_birth).format('YYYY-MM-DD')
    // await hospitelAPI.uploadFile(data)
    _formdata.test_result_url = 'test_result_url'
    _formdata.id_card_with_face_url = 'id_card_with_face_url'
    return _formdata
  }
  const onSubmit = handleSubmit(async (formdata) => {
    setLoading(true)
    const data = preSubmitData(formdata)
    await postUserIdentity(data)
    onNextStep()
  })

  const formValue = watch()
  // console.log('formValue:', formValue)
  // ########################### SUBMIT FORM ###########################

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="p-4 bg-white h-full flex flex-col justify-between">
        <img src={logo} alt="param9-logo" className="m-auto" height="90" width="90" />
        <div className="scroll-content">
          <h1 className="text-lg m-auto text-primary-700 font-bold text-center pt-2 pb-4">{MENU.verify.title}</h1>
          <InputField name="first_name" type="text" required label="ชื่อ" />
          <InputField name="last_name" type="text" required label="นามสกุล" />
          <InputField name="citizen_id" type="text" useNumberFormat format="#############" required label="เลขประจำตัวประชาชน" />
          <DatePickerField name="date_of_birth" required label="วันเดือนปีเกิด" />

          <p className="text-sm py-2">ที่อยู่ปัจจุบัน</p>
          <div className="grid grid-cols-2 gap-2">
            <InputField name="address.house_no" type="text" required label="เลขที่" />
            <InputField name="address.village" type="text" label="อาคาร/หมุ่บ้าน" />
            <InputField name="address.alley" type="text" label="ซอย/ตรอก" />
            <InputField name="address.road" type="text" required label="ถนน" />
            <InputField name="address.sub_district" type="text" required label="แขวง/ตำบล" />
            <InputField name="address.district" type="text" required label="เขต/อำเภอ" />
            <InputField name="address.province" type="text" required label="จังหวัด" />
            <InputField name="address.post_code" type="text" useNumberFormat format="#####" required label="รหัสไปรษณีย์" />
          </div>
          <InputField name="tel" type="text" useNumberFormat format="##########" required label="เบอร์โทรศัพท์ที่ติดต่อได้" />
          <InputField name="e_mail" type="email" required label="อีเมล" />

          <InputField name="tested_hospital" type="text" required label="ผลตรวจพบเชื้อ (Detected) COVID-19 จากโรงพยาบาลใด" />
          <DatePickerField name="tested_date" required label="วันที่ตรวจพบเชื้อ COVID-19" />

          <p className="text-sm py-4">บุคคลที่สามารถติดต่อได้กรณีฉุกเฉิน</p>
          <InputField name="contact.first_name" type="text" required label="ชื่อ" />
          <InputField name="contact.last_name" type="text" required label="นามสกุล" />
          <InputField name="contact.tel" type="text" useNumberFormat format="##########" required label="เบอร์โทรศัพท์ที่ติดต่อได้" />
          <InputField name="contact.relation" type="text" required label="ความสัมพันธ์" />

          <p className="text-sm py-4">กรุณาอัพโหลดเอกสารเพิ่มเติม</p>
          <p className="text-sm">1. ถ่ายรูปคู่กับบัตรประชาชน*</p>
          <div className="flex flex-row">
            <img src={'https://www.sbito.co.th/kyc/images/SelfieIDcard.png'} height="auto" width="40%" alt="id" />
            <div className="ml-4">
              <ul>
                <li className="text-xs">บัตรต้องไม่บังใบหน้าส่วนใดส่วนหนึ่ง</li>
                <li className="text-xs">อย่าใส่หมวกหรือแว่นตาดำ</li>
                <li className="text-xs">อย่าใส่ที่คาดผมหรือเครื่องประดับ</li>
                <li className="text-xs">อย่าถ่ายแค่ครึ่งหน้า</li>
                <FileField name="id_card_with_face_url" createText="แนบเอกสาร" showValueOn="right" />
              </ul>
            </div>
          </div>
          <p className="text-sm pt-4">2. ใบรายงานผลตรวจ RT-PCR (COVID-19)*</p>
          <FileField name="test_result_url" createText="แนบเอกสาร" showValueOn="right" />

          <button type="button" className={`w-full mt-4 self-end btn-primary btn`} disabled={loading} onClick={onSubmit}>
            ถัดไป
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
export default BasicInfo
