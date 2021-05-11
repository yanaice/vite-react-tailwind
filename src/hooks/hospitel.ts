
import { lineUserState } from '../recoil/lineUser.atom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { registerState } from '../recoil/lineUser.atom'
import hospitelAPI from '../api/hospitel'
import useSWR from 'swr'

export const usePDPA = () => {
  const [registerStaus, setRegisterState] = useRecoilState(registerState)

  const lineUser = useRecoilValue(lineUserState)
  const { data, error, mutate } = useSWR(hospitelAPI.getPDPA())

  const acceptTermAndCon = async (type: string, version: string) => {
    try {
      if (!lineUser) return
      setRegisterState(s => ({ ...s, loading: true }))
      await hospitelAPI.acceptTermAndCon(lineUser.userId, type, version)
      setRegisterState(s => ({ ...s, loading: false }))
    } catch (error) {
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))
      console.error(error)
    }
  }
  
  return {
    data,
    error,
    mutate,
    acceptTermAndCon,
  }
}

export const useConsent = () => {
  const [registerStaus, setRegisterState] = useRecoilState(registerState)
  const lineUser = useRecoilValue(lineUserState)
  const { data, error, mutate } = useSWR(lineUser && hospitelAPI.getConsent(lineUser.userId))

  const acceptTermAndCon = async (type: string, version: string) => {
    try {
      if (!lineUser) return
      setRegisterState(s => ({ ...s, loading: true }))
      await hospitelAPI.acceptTermAndCon(lineUser.userId, type, version)
      setRegisterState(s => ({ ...s, loading: false }))
    } catch (error) {
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))
      console.error(error)
    }
  }
  
  return {
    data,
    error,
    mutate,
    acceptTermAndCon,
  }
}

export const useUserInfo = () => {
  const [registerStaus, setRegisterState] = useRecoilState(registerState)
  const lineUser = useRecoilValue(lineUserState)
  const { data, error, mutate } = useSWR(lineUser && hospitelAPI.getAllUserInfo(lineUser.userId))
  
  const confirmUserInfo = async () => {
    try {
      if (!lineUser) return
      setRegisterState(s => ({ ...s, loading: true }))
      await hospitelAPI.confirmUserInfo(lineUser.userId)
      setRegisterState(s => ({ ...s, loading: false }))
    } catch (error) {
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))
      console.error(error)
    }
  }

  return {
    data,
    error,
    mutate,
    confirmUserInfo,
  }
}

export const useUserIdentify = () => {
  const [registerStaus, setRegisterState] = useRecoilState(registerState)
  const lineUser = useRecoilValue(lineUserState)
  const { data, error, mutate } = useSWR(lineUser && hospitelAPI.getUserIdentity(lineUser.userId))

  const postUserIdentity = async (data: any) => {
    try {
      if (!lineUser) return
      setRegisterState(s => ({ ...s, loading: true }))
      await hospitelAPI.postUserIdentity(lineUser.userId, data)
      setRegisterState(s => ({ ...s, loading: false }))
    } catch (error) {
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))
      console.error(error)
    }
  }

  return {
    data,
    error,
    mutate,
    postUserIdentity,
  }
}

export const useUserInsurance = () => {
  const [registerStaus, setRegisterState] = useRecoilState(registerState)
  const lineUser = useRecoilValue(lineUserState)
  const { data, error, mutate } = useSWR(lineUser && hospitelAPI.getUserInsurance(lineUser.userId))

  const postUserInsurance = async (data: any) => {
    try {
      if (!lineUser) return
      setRegisterState(s => ({ ...s, loading: true }))
      await hospitelAPI.postUserInsurance(lineUser.userId, data)
      setRegisterState(s => ({ ...s, loading: false }))
    } catch (error) {
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))
      console.error(error)
    }
  }

  return {
    data,
    error,
    mutate,
    postUserInsurance
  }
}

export const useUserSeverity = () => {
  const [registerStaus, setRegisterState] = useRecoilState(registerState)
  const lineUser = useRecoilValue(lineUserState)
  const { data, error, mutate } = useSWR(lineUser && hospitelAPI.getUserSeverityAssessment(lineUser.userId))

  const postUserSeverityAssessment = async (data: any) => {
    if (!lineUser) return
    try {
      setRegisterState(s => ({ ...s, loading: true }))
      await hospitelAPI.postUserSeverityAssessment(lineUser.userId, data)
      setRegisterState(s => ({ ...s, loading: false }))
    } catch (error) {
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))
      console.error(error)
    }
  }

  return {
    data,
    error,
    mutate,
    postUserSeverityAssessment
  }
}

