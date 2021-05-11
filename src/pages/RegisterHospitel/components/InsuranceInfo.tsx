import React, { useState, useEffect } from 'react'
import allInsurances from '../insuranceList'
import logo from '../../../assets/logo/praram9-logo.svg'
import { MENU } from '../RegisterHospitelPage'
import { Input } from '../../../components/input/Input'
import { CheckboxField, Checkbox } from '../../../components/Checkbox/Checkbox'
import GroupField from '../../../components/GroupField/GroupField'
import { useUserInsurance } from '../../../hooks/hospitel'
import { FileField, File } from '../../../components/File/File'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import _ from 'lodash'

// const handleMultipleSelectFile = (files: File[], insuranceCode: string) => {
//   setSelectedMultipleFile(_selectedMultipleFile => ({
//     ..._selectedMultipleFile,
//     [insuranceCode]: files
//   }))
// }
// const handleSelectFile = (file: File, insuranceCode: string) => {
// 	const _errorsFileInsurance = {...errorsFileInsurance}
//   delete _errorsFileInsurance[insuranceCode]
//   setFileInsuranceErrors(_errorsFileInsurance)
//   setSelectedFile(_selectedFile => ({
//     ..._selectedFile,
//     [insuranceCode]: file
//   }))
// }

interface IForm {
  insurance_other_urls: { name: string; url: any; checked: boolean }[]
  insurance_urls: { code: string; url: any; checked: boolean }[]
  payment_method: { is_cash: boolean; is_insurance: boolean; other: string }
  id_card_url: string
}
const schema = yup.object().shape({
  payment_method: yup.object().shape({
    is_cash: yup.boolean(),
    is_insurance: yup.boolean(),
    other: yup.string().test('valid other', 'กรุณากรอก', (value, context) => {
      return _.get(context, 'parent.other_show') ? !!value : true
    }),
  }),
  id_card_url: yup.string().required('กรุณาอัพโหลด'),
  insurance_urls: yup.array().of(
    yup.object().shape({
      code: yup.string(),
      url: yup.string().test('', 'กรุณาอัพโหลด', (value, context) => {
        if (context.parent.checked && !context.parent.url) return false
        return true
      }),
      checked: yup.boolean(),
    })
  ),
  insurance_other_urls: yup.array().of(
    yup.object().shape({
      name: yup.string().test('', 'กรุณากรอก', (value, context) => {
        if (context.parent.checked && !context.parent.name) return false
        return true
      }),
      url: yup.string().test('', 'กรุณาอัพโหลด', (value, context) => {
        if (context.parent.checked && !context.parent.url) return false
        return true
      }),
      checked: yup.boolean(),
    })
  ),
})

export interface Props {
  onNextStep: () => void
}
const InsuranceInfo: React.FC<Props> = ({ onNextStep }) => {
  // ########################### FORM HANDLER ###########################
  const { data: userInsurances, error: userInsurancesError, postUserInsurance } = useUserInsurance()
  // const { data: allInsurances } = useSWR(hospitelAPI.getAllInsurance())
  const defaultValues = {}
  const methods = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues },
    reValidateMode: 'onChange',
  })
  const { formState } = methods

  const handleCheckInsurance = (index: number, type: 'code' | 'url' | 'checked', value: any) => {
    const _selected = methods.getValues('insurance_urls')
    _selected[index][type] = value as never
    methods.setValue('insurance_urls', _selected)
    type === 'url' && methods.trigger('insurance_urls')
  }
  const handleCheckOtherInsurance = (index: number, type: 'name' | 'url' | 'checked', value: any) => {
    const _selected = methods.getValues('insurance_other_urls')
    _selected[index][type] = value as never
    methods.setValue('insurance_other_urls', _selected)
    type === 'url' && methods.trigger('insurance_other_urls')
  }

  const prepareFormData = (userInsurances: any, allInsurances: any) => {
    // add field + _show
    const formdata = {...userInsurances}
    formdata.payment_method = {
      ...formdata.payment_method,
      other_show: userInsurances ? userInsurances.payment_method.other && formdata.payment_method.other.length > 0 : false
    }
    formdata.insurance_urls = Object.keys(allInsurances).map((code) => {
      const foundCode = userInsurances ? userInsurances.insurance_urls.find((c: { code: string }) => c.code === code) : null
      return {
        code: code,
        checked: foundCode ? true : false,
        url: foundCode ? foundCode.url : undefined,
      }
    })

    const emptyFields = [
      {
        name: '',
        url: '',
        checked: false,
      },
      {
        name: '',
        url: '',
        checked: false,
      },
    ]
    formdata.insurance_other_urls = userInsurances ? [...userInsurances.insurance_other_urls.map((c: any) => ({ ...c, checked: true })), ...emptyFields] : emptyFields
    return formdata
  }

  useEffect(() => {
    if (allInsurances && userInsurances) {
      const formdata = prepareFormData(userInsurances, allInsurances)
      methods.reset(_.cloneDeep({ ...formdata, ...defaultValues }))
    }
  }, [allInsurances, userInsurances])

  // ########################### FORM HANDLER ###########################

  // ########################### SUBMIT FORM ###########################
  const [loading, setLoading] = useState(false)
  const { handleSubmit, watch } = methods

  const preSubmitData = async (formdata: any) => {
    const _formdata = { ...formdata }
    // await hospitelAPI.uploadFile(data)
    _formdata.insurance_other_urls = formdata.insurance_other_urls.filter((o: { checked: any }) => o.checked).map((o: any) => ({ ...o, url: 'xxx' }))
    _formdata.insurance_urls = formdata.insurance_urls.filter((o: { checked: any }) => o.checked).map((o: any) => ({ ...o, url: 'xxx' }))
    _formdata.id_card_url = 'xxx'
    return _formdata
  }

  const onSubmit = handleSubmit(async (formdata) => {
    setLoading(true)
    const data = await preSubmitData(formdata)
    await postUserInsurance(data)
    onNextStep()
  })

  const formValue = watch()
  const formInsuranceErrors = formState.errors.insurance_urls || []
  const formOtherInsuranceErrors = formState.errors.insurance_other_urls || []
  // console.log('userInsuranceFormValue:', formValue)
  // console.log('formOtherInsuranceErrors errors:', formOtherInsuranceErrors)
  // ########################### SUBMIT FORM ###########################

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="bg-white flex flex-col space-between h-full">
        <div className="scroll-content text-gray-700 pt-4">
          <img src={logo} alt="param9-logo" className="m-auto" height="90" width="90" />
          <h1 className="pt-2 pb-4 font-bold text-primary-700 text-lg m-auto text-center">{MENU.insurance.title}</h1>

          <p className="text-sm pl-4 py-2">โปรดเลือก (สามารถเลือกได้มากกว่า 1 ข้อ)*</p>
          <div className="px-4">
            <CheckboxField className="pb-1" name="payment_method.is_insurance" label="ประกันสุขภาพ" />
            <CheckboxField className="pb-1" name="payment_method.is_cash" label="ชำระเงินสด" />
            <GroupField
              title="อื่นๆโปรดระบุ"
              fields={[
                {
                  name: 'payment_method.other',
                  type: 'text',
                },
              ]}
            />
          </div>

          <div className="flex px-4 pt-4 flex-row items-center justify-between">
            <div className="text-sm font-sm">รูปบัตรประชาชนเท่านั้น*</div>
            <FileField name="id_card_url" createText="แนบเอกสาร" />
          </div>

          <p className="text-sm px-4 pt-4">เลือกบริษัทประกัน</p>
          {formValue?.insurance_urls?.map(({ code, checked, url }, index) => (
            <div className="border-b px-4 py-2" key={index}>
              <div className="flex flex-row items-center justify-between">
                <Checkbox onChange={() => handleCheckInsurance(index, 'checked', !checked)} value={checked} />
                <div className="flex-1 mx-3 text-sm font-sm">{allInsurances[code]}</div>
                {(url?.name || url) && <div className="ml-3 text-xs text-primary-700 truncate mr-2">มีไฟล์</div>}
                <File disabled={!checked} name={`insurance-${index}-upload`} onChange={(e) => handleCheckInsurance(index, 'url', e)} value={url} createText="แนบไฟล์เอกสาร" />
              </div>
              <p className="text-xs text-right text-red-500">{formInsuranceErrors[index]?.url.message}</p>
            </div>
          ))}
          {formValue?.insurance_other_urls?.map(({ name, checked, url }, index) => (
            <div className="border-b px-4 py-2" key={index}>
              <div className="flex flex-row items-center justify-between">
                <Checkbox onChange={() => handleCheckOtherInsurance(index, 'checked', !checked)} value={checked} />
                <div className="flex-1 mx-3 text-sm font-sm">อื่นๆโปรดระบุ</div>
              </div>
              <div className="flex flex-row items-center pl-6 pt-2">
                <div className="flex-1 pr-2">
                  <Input className="flex-1" type="text" value={name} onChange={(e) => handleCheckOtherInsurance(index, 'name', e.target.value)} />
                  <p className="text-xs text-red-500">{formOtherInsuranceErrors[index]?.['name']?.message}</p>
                </div>
                <div>
                  {(url?.name || url) && <div className="ml-3 text-xs text-primary-700 truncate mr-2">มีไฟล์</div>}
                  <File
                    className="flex-1"
                    disabled={!checked}
                    name={`other-insurance-${index}-upload`}
                    onChange={(e) => handleCheckOtherInsurance(index, 'url', e)}
                    value={url}
                    createText="แนบไฟล์เอกสาร"
                  />
                  <p className="text-xs text-right text-red-500">{formOtherInsuranceErrors[index]?.url.message}</p>
                </div>
              </div>
            </div>
          ))}
          {/* <File
            name={`insurance-0-upload`}
            multiple
            onChange={(e) => handleMultipleSelectFile(e, 'xxx')}
            value={selectedMultipleFile['xxx']}
            createText="เลือกหลายไฟล์"
          />
          {
            selectedMultipleFile && selectedMultipleFile['xxx'] &&
            Object.keys(selectedMultipleFile['xxx']).map((_, index) => <div key={index} className="pl-4">{selectedMultipleFile['xxx'][index].name}</div>)
          } */}
          <div className="p-4">
            <button type="button" className={`w-full self-end btn-primary btn`} disabled={loading} onClick={onSubmit}>
              ถัดไป
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
export default InsuranceInfo

function obj(obj: any, arg1: (value: any, key: string) => import('yup/lib/string').RequiredStringSchema<string | undefined, Record<string, any>> | undefined): any {
  throw new Error('Function not implemented.')
}
