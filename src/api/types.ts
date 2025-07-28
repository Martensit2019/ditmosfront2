export interface IPopular {
  id: string
  img: string
  title: string
  description: string
  link: string
}
export interface IRfSubject {
  id: string
  createDate: string
  editDate: string
  code: string
  name: string
  importedRow: number
  hasError: boolean
  version: number
  actual: boolean
  subjectCode: number
}
export interface IQuestionnaire {
  id: string
  img: string
  title: string
  description: string
  children?: IQuestionnaire
}

export interface IQuiz {
  id: string
  createDate: string
  editDate: string
  name: string
  description: string
  themeId: string
  theme: string
  knoId: string
  knoCode: string
  knoName: string
  knoTypeId: string
  knoType: string
  maxScore: number
  coverId: string
  coverCroppedId: string
  coverCropperCoordinates: string
  status: string
  questions: Question[]
  categories: Category[]
  accessibility: Accessibility
}

export interface Question {
  id: string
  createDate: string
  editDate: string
  number: string
  text: string
  description: string
  questionType: string
  answers: Answer[]
  isFromChecklist: boolean
  wrongAnswerInfo: WrongAnswerInfo2 | WrongAnswerInfo4
}

export interface Answer {
  id: string
  createDate: string
  editDate: string
  data: string
  isWrongAnswer: boolean
  wrongAnswerInfo: WrongAnswerInfo
  text: string
  image: string
  indication: string
  questions?: Question2[]
}

export interface WrongAnswerInfo {
  score?: number
  violationName?: string
  memo?: string
  requirement?: string
  npa?: string
}

export interface Question2 {
  id: string
  createDate: string
  editDate: string
  number: string
  text: string
  description?: string
  questionType: string
  answers: Answer2[]
  isFromChecklist: boolean
  wrongAnswerInfo: WrongAnswerInfo3
}

export interface Answer2 {
  id: string
  createDate: string
  editDate: string
  data: string
  isWrongAnswer: boolean
  wrongAnswerInfo: WrongAnswerInfo2
  text: string
  image: string
  indication: string
}

export interface WrongAnswerInfo2 {
  score: string
  violationName: string
  memo: string
  requirement: string
  npa: string
}

export interface WrongAnswerInfo3 {
  score: string
  violationName: string
  memo: string
  requirement: string
  npa: string
}

export interface WrongAnswerInfo4 {
  score: string
  violationName: string
  memo: string
  requirement: string
  npa: string
}

export interface Category {
  category: string
  low: number
  high: number
}

export interface Accessibility {
  legalOrgsAndSpAccess: boolean
  unregisteredAccess: boolean
  selfEmployedAccess: boolean
  organizationCategories: string[]
  organizationCategoryIds: string
  isAvailableForEveryone: boolean
}

export type TQuestionAnswer = Record<string, string>
export interface IResults {
  name: string
  wrongAnswers: WrongAnswerInfo
  percent: number
  title: string
}
export interface IViolations {
  violationName: string
  memo: string[]
}
