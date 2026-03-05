// lib/questions/index.ts — Exports for question flow

export { QUESTIONS } from './questionBank'
export { PAGE_GROUPS, getVisiblePageGroups } from './pageGroups'
export {
  getVisibleQuestions,
  getNextQuestion,
  getProgress,
  isComplete,
} from './conditionalLogic'
export { detectFromBusinessName, type DetectionResult } from './industryDetection'
export { answersToIntelligence } from './answersToIntelligence'
