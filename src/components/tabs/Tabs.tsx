import React from 'react'
import { MENU } from '../../pages/RegisterHospitel/RegisterHospitelPage'

export interface Props {
  activeIndex: number
  onClickStep: (step: number) => void
  userCurrentStep: number
}

const InputForm: React.FC<Props> = ({ activeIndex, userCurrentStep, onClickStep }) => {
  return (<div className="flex flex-row bg-gray-100 fixed top-0 left-0 right-0 p-2">
    <button disabled={1 > userCurrentStep} className={`${activeIndex === 1 && 'active'} btn-tab btn text-xs flex-1`} onClick={() => onClickStep(1)}>{MENU.verify.tab}</button>
    <button disabled={2 > userCurrentStep} className={`${activeIndex === 2 && 'active'} btn-tab btn text-xs flex-1`} onClick={() => onClickStep(2)}>{MENU.insurance.tab}</button>
    <button disabled={3 > userCurrentStep} className={`${activeIndex === 3 && 'active'} btn-tab btn text-xs flex-1`} onClick={() => onClickStep(3)}>{MENU.risk.tab}</button>
  </div>)
}

export default InputForm