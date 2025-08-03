import axios from 'axios'

// axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.baseURL = 'https://ditmosserver.onrender.com'

export const getPopularRequest = async () => {
  return axios.get('/popular')
}

export const getRfSubjectsRequest = async () => {
  return axios.get('/rf-subject')
}

export const getQuestionnairesRequest = async () => {
  return axios.get('/questionnaires')
}

export const getQuestionnairesListRequest = async (questionnairesListId: string) => {
  return axios.get(`/questionnaires?id=${questionnairesListId}`)
}

export const getQuizByIdRequest = async (questionnaireId: string) => {
  return axios.get(`/quizes?id=${questionnaireId}`)
}
