import React from 'react'
import successIcon from '../../../assets/icons/success-icon.png'
import logo from '../../../assets/logo/praram9-logo.svg'
import { useLiff } from 'react-liff-v2'

export interface Props {
	
}

const BasicInfo: React.FC<Props> = () => {
  const { liff } = useLiff()
  
  const handleCloseWindow = () => {
    liff?.closeWindow()
    window.close()
  }
  
  return (
    <div className="p-4 bg-white h-full flex flex-col justify-center items-center">
      <img src={logo} alt="param9-logo" className="m-auto" height="90" width="90" />
      <h1 className="text-2xl pt-8 font-bold text-primary-700 text-center">ลงทะเบียนสำเร็จ</h1>
      <img src={successIcon} alt="success" height="80" width="80" className="my-12" />
      <div className="text-2xl text-secondary">โปรดปิดหน้านี้</div>
      <div className="text-2xl text-secondary">กรุณารอเจ้าหน้าที่โรงพยาบาล</div>
      <div className="text-2xl text-secondary">ติดต่อกลับภายใน 60 นาที</div>
      <div className="flex-1 flex flex-col justify-center items-center">
      </div>
      <button
        type="button"
        className={`w-full self-end btn-primary btn`}
        onClick={handleCloseWindow}
      >
        ปิดหน้านี้
      </button>
    </div>
  )}
export default BasicInfo