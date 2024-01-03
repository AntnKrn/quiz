import { RESET_QUIZ_CREATION, CREATE_QUIZ_QUESTION } from './actionTypes'
import axios from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation() {
    return {
        type:  RESET_QUIZ_CREATION
    }
}
export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quiz.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}