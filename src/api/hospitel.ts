import axios from '../client/axios'
import { generateFileName } from '../utils/file'

const API = {
  getPDPA: () => `/api/v1/terms-and-condition/PDPA`,
  getConsent: () => `/api/v1/terms-and-condition/UCEP`,
  _acceptTermAndCon: (type: string, version: string) => (lineId: string) => ({
    method: 'POST',
    url: `/api/v1/id/${lineId}/terms-and-conditions`,
    data: {
      user_identity: {
        line_id: lineId,
      },
      accept_term_and_condition: {
        type: type,
        version: version
      }
    },
  }),
  acceptTermAndCon: (lineId: string, type: string, version: string) => axios({
    method: 'POST',
    url: `/api/v1/id/${lineId}/terms-and-conditions`,
    data: {
      user_identity: {
        line_id: lineId,
      },
      accept_term_and_condition: {
        type: type,
        version: version
      }
    },
  }),
  getUserIdentity: (lineId: string) => `/api/v1/id/${lineId}/identity-verification`,
  _postUserIdentity: (data: any) => (lineId: string) => ({
    method: 'POST',
    url: `/api/v1/id/${lineId}/identity-verification`,
    data: {
      user_identity: {
        line_id: lineId,
      },
      identity_verification: data
    }
  }),
  postUserIdentity: (lineId: string, data: any) => axios({
    method: 'POST',
    url: `/api/v1/id/${lineId}/identity-verification`,
    data: {
      user_identity: {
        line_id: lineId,
      },
      identity_verification: data
    }
  }),
  getAllInsurance: () => "/api/v1/insurance",
  getUserInsurance: (lineId: string)  => `/api/v1/id/${lineId}/health-insurance`,
  postUserInsurance: (lineId: string, data: any) => axios({
    method: 'POST',
    url: `/api/v1/id/${lineId}/health-insurance`,
    data: {
      user_identity: {
        line_id: lineId,
      },
      health_insurance: data,
    }
  }),
  getUserSeverityAssessment: (lineId: string) => `/api/v1/id/${lineId}/severity-assessment`,
  postUserSeverityAssessment: (lineId: string, data: any) => axios({
    method: 'POST',
    url: `/api/v1/id/${lineId}/severity-assessment`,
    data: {
      user_identity: {
        line_id: lineId,
      },
      severity_assessment: data
    }
  }),
  getAllUserInfo: (lineId: string) => `/api/v1/id/${lineId}/review-information`,
  confirmUserInfo: (lineId: string) => axios({
    method: 'POST',
    url: `/api/v1/id/${lineId}/confirm`,
    data: {
      "line_id": lineId
    }
  }),
  uploadFile: (file: File) => {
    const fileName = generateFileName(file)
    let formData = new FormData()
    formData.append('file', file, fileName)
    return axios({
      headers: { 'Content-Type': 'multipart/form-data' },
      url: `api/v1/upload`,
      data: formData,
    })
  },
  // uploadMultipleFile: (file: File[]) => {
  //   const fileName = generateFileName(file)
  //   let formData = new FormData()
  //   formData.append('files', file, fileName)
  //   return axios({
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //     url: ``,
  //     data: formData,
  //   })
  // }
}

export default API