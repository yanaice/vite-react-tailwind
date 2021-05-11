import axios from '../client/axios'

export interface IdentityProps {

}
export interface InsuranceProps {
  [key: string]: string;
}
export interface HealthInsuranceProps {

}
export interface SeverifyAssessmentProps {

}

export default {
  getPDPA: () => `/api/v1/terms-and-condition/PDPA`,
  getConsent: (lineId: string) => `/api/v1/terms-and-condition/UCEP`,
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
  postUserInsurance: (lineId: string, data: HealthInsuranceProps) => axios({
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
  postUserSeverityAssessment: (lineId: string, data: SeverifyAssessmentProps) => axios({
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
    let Formdata = new FormData()
    // return url
  },
}