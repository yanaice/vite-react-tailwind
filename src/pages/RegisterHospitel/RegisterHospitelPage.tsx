import React, { useEffect, useState, useCallback } from 'react'
import Tabs from '../../components/tabs/Tabs'
import PDPA from './components/PDPA'
import BasicInfo from './components/BasicInfo'
import InsuranceInfo from './components/InsuranceInfo'
import SeverityAssessment from './components/SeverityAssessment'
import Summary from './components/Summary'
import Consent from './components/Consent'
import RegisterSuccess from './components/RegisterSuccess'
import { useUserInfo } from '../../hooks/hospitel'
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay'
import { useLiff } from 'react-liff-v2'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { lineUserState, LineUserProps, registerState } from '../../recoil/lineUser.atom'
import Alert from '../../components/Alert/Alert'

export const MENU = {
  verify: {
    tab: 'ยืนยันตัวตน',
    title: 'ลงทะเบียนยืนยันตัวตน'
  },
  insurance: {
    tab: 'สิทธิการรักษา',
    title: 'เลือกสิทธิการรักษาพยาบาล'
  },
  risk: {
    tab: 'ประเมินความเสี่ยง',
    title: 'ประเมินความเสี่ยง'
  },
}

interface Props {

}

const Page: React.FC<Props> = () => {

  // ################################################## INITIAL LINE USER_ID ##################################################
  const { liff, isLoggedIn } = useLiff()
  const setLineUser = useSetRecoilState(lineUserState)

  useEffect(() => {

    if (process.env.NODE_ENV === 'production') {
      if (!isLoggedIn) {
        liff.login()
      }
      (async () => {
        const profile = await liff.getProfile() as LineUserProps
        // alert(`Welcome ${profile.displayName}`)
        setLineUser(profile);
      })();

    } else {
      setLineUser({
        userId: 'YANA_ICE2',
        displayName: "ice",
        pictureUrl: "",
        statusMessage: "",
      })
    }
    
  }, [liff, isLoggedIn, setLineUser])

  // ################################################## MANAGE USER STEP + GLOBAL STATE ##################################################
  const [{ loading, errorMsg }, setRegisterState] = useRecoilState(registerState)
  const { data, error, mutate } = useUserInfo()
  
  const [step, setStep] = useState(-1) // currentStep

  useEffect(() => {
    // if (process.env.NODE_ENV === 'development') {
    //   setStep(2)
    //   return 
    // }
    if (error) {
      setStep(0)
      return
    }
    if (data?.state) {
      const currentStep = data?.state?.is_accept_ucep
      ? 6
      : data?.state?.is_apply
      ? 5
      : data?.state?.is_submit_severity_assessment
      ? 4
      : data?.state?.is_submit_health_insurance
      ? 3
      : data?.state?.is_submit_identity_verification
      ? 2
      : data?.state?.is_accept_pdpa
      ? 1
      : 0

      console.log('setStep ==> ', currentStep)
      setStep(currentStep)
    }

  }, [
    data?.state?.is_accept_ucep,
    data?.state?.is_apply,
    data?.state?.is_submit_severity_assessment,
    data?.state?.is_submit_health_insurance,
    data?.state?.is_submit_identity_verification,
    data?.state?.is_accept_pdpa,
    error,
  ])

  const handlePrevStep = () => setStep(_step => _step - 1)
  const handleNextStep = () => {
    mutate()
    // if (!errorMsg) {
    //   setStep(_step => _step + 1)
    // }
  }

  const handleSetStep = useCallback((newStep: number) => {
    setStep(newStep)
  }, [setStep])

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setRegisterState(s => ({...s, errorMsg: ''}))
      }, 4000)
    }
  }, [errorMsg, setRegisterState])

  return (
    <LoadingOverlay active={loading || (!data && !error)}>
      <div className="bg-gray-100 flex flex-col h-full">
        {
          errorMsg && <Alert text={errorMsg} />
        }
        {
          step === 0 && <PDPA onNextStep={handleNextStep} />
        }
        {
          [1,2,3].includes(step) && <Tabs
            userCurrentStep={6}
            activeIndex={step}
            onClickStep={handleSetStep}
          />
        }
        {
          step === 1 &&
          <div className={`h-full pt-12 ${step !== 1 && 'hidden'}`}>
            <BasicInfo onNextStep={handleNextStep} />
          </div>
        }
        {
          step === 2 &&
          <div className={`h-full pt-12 ${step !== 2 && 'hidden'}`}>
            <InsuranceInfo onNextStep={handleNextStep} />
          </div>
        }
        {
          step === 3 &&
          <div className={`h-full pt-12 ${step !== 3 && 'hidden'}`}>
            <SeverityAssessment onNextStep={handleNextStep} />
          </div>
        }
        {step === 4 && <Summary onPrevStep={handlePrevStep} onNextStep={handleNextStep} />}
        {step === 5 && <Consent onNextStep={handleNextStep} />}
        {step === 6 && <RegisterSuccess />}
        
      </div>
    </LoadingOverlay>
  );
}

export default Page