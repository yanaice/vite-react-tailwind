import React from 'react'
import logo from '../../../assets/logo/praram9-logo.svg'
import { useConsent } from '../../../hooks/hospitel'
import { useLiff } from 'react-liff-v2'
import hospitelAPI from '../../../api/hospitel'
import useAxios from '../../../hooks/useAxios'

export interface Props {
	onNextStep: () => void
}

const Consent: React.FC<Props> = ({ onNextStep }) => {
  const { data } = useConsent()
  const { execute } = useAxios()
  const { liff } = useLiff()
  
  const handleAccept = async () => {
    if (!data) return
    await execute({
      func: hospitelAPI._acceptTermAndCon(data.type, data.version)
    })
    onNextStep()
  }
  const handleNotAccept = async () => {
    liff?.closeWindow()
    window.close()
  }
  return (<div className="flex flex-col h-full p-4 bg-white">
    <div className="scroll-content">
      <img src={logo} alt="param9-logo" className="m-auto" height="90" width="90" />
      <h1 className="text-lg font-bold text-primary-700 text-center">หนังสือแสดงความยินยอมรับการรักษาเป็นผู้ป่วยในกรณีติดเชื้อไวรัสโคโรนา 2019</h1>
      <div className="flex flex-row pt-4">
        <p className="pl-1 text-xs">1.</p>
        <p className="pl-1 text-xs">ข้อมูลด้านสิทธิการรักษา</p>
      </div>
        <div className="flex flex-row pl-2">
          <p className="pl-1 text-xs">1.1</p>
          <p className="pl-1 text-xs">ผู้ป่วยโรคติดเชื้อไวรัสโคโรนา 2019 (COVID-19) ที่ตรวจพบการติดเชื้อที่โรงพยาบาลใด จะมีสิทธิได้รับการรักษาพยาบาล ณ สถานพยาบาลนั้น ๆ โดยรายละเอียดเป็นไปตามประกาศกระทรวงสาธารณสุข เรื่อง หลักเกณฑ์ วิธีการ และเงื่อนไขการกำหนดค่าใช้จ่ายในการดำเนินการผู้ป่วยฉุกเฉินโรคติดต่ออันตรายตามกฎหมายว่าด้วยโรคติดต่อ กรณีโรคติดเชื้อไวรัสโคโรนา 2019 ซึ่งเป็นการรักษาพยาบาลโดยฉุกเฉินเพื่อให้พ้นจากอันตราย ตามมาตรฐานวิชาชีพและขีดความสามารถของสถานพยาบาล</p>
        </div> 
        <div className="flex flex-row pl-2">
          <p className="pl-1 text-xs">1.2</p>
          <p className="pl-1 text-xs">กรณีที่ผู้ป่วยตรวจพบการติดเชื้อไวรัสโคโรนา 2019 จากโรงพยาบาลอื่นแล้วต้องการมารับการรักษาที่โรงพยาบาลพระรามเก้า ผู้ป่วยจะต้องสละสิทธิการรักษาพยาบาลตามหลักเกณฑ์ในข้อ 1.1 และผู้ป่วยหรือผู้แทนผู้ป่วยจะต้องรับผิดชอบค่าใช้จ่ายที่เกิดขึ้นที่โรงพยาบาลพระรามเก้าทั้งสิ้น</p>
        </div>
        <div className="flex flex-row pl-2">
          <p className="pl-1 text-xs">1.3</p>
          <p className="pl-1 text-xs">ในกรณีที่ค่าใช้จ่ายในการตรวจวินิจฉัยและการรักษาของข้าพเจ้า รับผิดชอบโดยบุคคลอื่น เช่น บริษัทต้นสังกัด หรือบริษัทประกัน เป็นต้น อาจมีการร้องขอให้โรงพยาบาลเปิดเผยข้อมูลของข้าพเจ้าแก่บริษัทดังกล่าว ข้าพเจ้าเข้าใจและยินยอมให้โรงพยาบาลเปิดเผยข้อมูลให้บริษัทดังกล่าวได้ทั้งสิ้น</p>
        </div>
    </div>
    <div className="flex flex-row pt-10">
      <button
        type="button"
        className={`w-full self-end btn-primary btn`}
        onClick={handleAccept}
      >
        <p className="text-sm">ยอมรับ</p>
        <p className="text-sm">การปฎิเสธสิทธิ UCEP</p>
      </button>
      <button
        type="button"
        className={`ml-2 w-full self-end btn-secondary btn`}
        onClick={handleNotAccept}
      >
        <p className="text-sm">ไม่ยอมรับ</p>
        <p className="text-sm">การปฎิเสธสิทธิ UCEP</p>
      </button>
    </div>
  </div>)
}
export default Consent