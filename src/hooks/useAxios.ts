import axios from '../client/axios'
import { lineUserState } from '../recoil/lineUser.atom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { registerState } from '../recoil/lineUser.atom'

interface Props {
  func: any
  skipLoading?: boolean
  skipError?: boolean
  handleError?: Function | null
}
const useAxios = () => {
  const setRegisterState = useRecoilState(registerState)[1]
  const lineUser = useRecoilValue(lineUserState)
  
  const execute = async({
    func,
    skipLoading = false,
    skipError = false,
    handleError = null,
  }: Props) =>  {
    if (!lineUser) return
    try {
      !skipLoading && setRegisterState(s => ({ ...s, loading: true }))
      // ######## MAIN FUNCTION
      const result = await axios(func(lineUser))
      !skipLoading && setRegisterState(s => ({ ...s, loading: false }))
      // ######## MAIN FUNCTION RESULT
      return result
    } catch (error) {
      
      !skipError && 
      setRegisterState(s => ({
        ...s,
        loading: false,
        errorMsg: "เกิดข้อผิดพลาด"
      }))

      console.error(error)

      handleError && handleError(error)
    }
  }

  return {
    execute
  }
}

export default useAxios