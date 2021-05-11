import { atom } from 'recoil'

export interface LineUserProps {
  userId: string,
  displayName: string,
  pictureUrl: string,
  statusMessage: string
}

export const lineUserState = atom<LineUserProps | null>({
  key: 'lineUserState',
  default: null
})

interface RegisterProps {
  loading: boolean
  errorMsg: string
  successMsg: string
}
export const registerState = atom<RegisterProps>({
  key: 'registerState',
  default: {
    loading: false,
    errorMsg: "",
    successMsg: "",
  }
})