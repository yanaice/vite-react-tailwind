import React from 'react'
import { StringDecoder } from 'string_decoder'
import logo from '../../../assets/logo/praram9-logo.svg'
import { useUserInfo } from '../../../hooks/hospitel'
import insuranceList from '../insuranceList'

export interface Props {
  onPrevStep: () => void
  onNextStep: () => void
}
const getName = (identityVerification: any) => {
  if (!identityVerification) return '-'
  return `${identityVerification?.first_name} ${identityVerification?.last_name}`
}

const getAddress = (address: any) => {
  if (!address) return '-'
  return `${address?.house_no} ${address?.alley} ${address?.road} ${address?.sub_district} ${address?.district} ${address?.province} ${address?.post_code}`
}

const getEmergencyContact = (contact: any) => {
  if (!contact) return '-'
  return `${contact?.first_name} ${contact?.last_name} เบอร์โทรศัพท์ ${contact?.tel}`
}

const getInsuranceList = (insurance: any) => {
  if (!insurance) return '-'
  const existingInsuranceList = insurance.insurance_urls.map(({ code }: { code: string }) => insuranceList[code])
  const otherInsuranceList = insurance.insurance_other_urls.map(({ name }: { name: string }) => name)

  return [...existingInsuranceList, ...otherInsuranceList].join(', ')
}

const Summary: React.FC<Props> = ({ onPrevStep, onNextStep }) => {
  const { data, confirmUserInfo } = useUserInfo()
  const handleSubmit = async () => {
    await confirmUserInfo()
    onNextStep()
  }
  return (
    <div className="p-4 bg-white h-full flex flex-col justify-between">
      <img src={logo} alt="param9-logo" className="m-auto" height="90" width="90" />
      <h1 className="text-lg font-bold text-primary-700 text-center">กรุณาตรวจสอบข้อมูล</h1>
      <div className="scroll-content py-2">
        <p className="text-base text-secondary">ชื่อ-นามสกุล: {getName(data?.identity_verification)}</p>
        <p className="text-base text-secondary">
          เลขบัตรประจำตัวประชาชน: {data?.identity_verification?.citizen_id ?? '-'}
        </p>
        <p className="text-base text-secondary">วันเดือนปีเกิด: {data?.identity_verification?.date_of_birth ?? '-'}</p>
        <p className="text-base text-secondary">ที่อยู่ปัจจุบัน: {getAddress(data?.identity_verification?.address)}</p>
        <p className="text-base text-secondary">เบอร์โทรศัพท์ที่ติดต่อได้: {data?.identity_verification?.tel ?? '-'}</p>
        <p className="text-base text-secondary">อีเมล: {data?.identity_verification?.e_mail ?? '-'}</p>
        <p className="text-base text-secondary">
          ผลตรวจพบเชื้อ [Detected] COVID-29 จาก: {data?.identity_verification?.tested_hospital ?? '-'}
        </p>
        <p className="text-base text-secondary">
          วันที่ตรวจพบเชื้อ COVID-19: {data?.identity_verification?.tested_date ?? '-'}
        </p>
        <p className="text-base text-secondary">
          บุคคลที่สามารถติดต่อได้ในกรณีฉุกเฉิน: {getEmergencyContact(data?.identity_verification?.contact)}
        </p>
        <p className="text-base text-secondary">รูปบัตรประชาชน:</p>
        <img className="w-full mb-2" src={data?.identity_verification?.id_card_with_face_url} alt="id" />
        <p className="text-base text-secondary">สิทธิการรักษา: {getInsuranceList(data?.health_insurance)}</p>
        
        <button type="button" className="w-full self-end btn-secondary btn mt-2" onClick={onPrevStep}>
          กลับ
        </button>
        <button type="button" className="w-full self-end btn-primary btn mt-2" onClick={handleSubmit}>
          ยืนยัน
        </button>
        
      </div>
    </div>
  )
}
export default Summary
