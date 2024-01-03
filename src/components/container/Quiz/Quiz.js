import React from "react";
import ActiveQuiz from "../../ActiveQuiz/ActiveQuiz";
import './Quiz.css';
import FinishedQuiz from "../../FinishedQuiz/FinishedQuiz";
import Loader from "../../UI/Loader/Loader";
import { connect } from 'react-redux'
import { fetchQuizById } from "../../../store/actions/quiz";
import { quizAnswerClick } from "../../../store/actions/quiz";
import { quizRetry } from "../../../store/actions/quiz";

class Quiz extends React.Component {
    
      componentDidMount() {
        this.props.fetchQuizById(window.location.pathname.replace('/quiz/', ''))
      }

      componentWillUnmount() {
        this.props.retryQuiz();
      }
    
      render() {
        return (
          <div className='Quiz'>
            <div className='QuizWrapper'>
              <h1>Ответьте на все вопросы</h1>
    
              {
                
                this.props.loading || !this.props.quiz
                 ? <Loader />
                 : this.props.isFinished
                  ? <FinishedQuiz
                    results={this.props.results}
                    quiz={this.props.quiz}
                    onRetry={this.props.retryQuiz}
                  />
                  : <ActiveQuiz
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    question={this.props.quiz[this.props.activeQuestion].question}
                    onAnswerClick={this.props.quizAnswerClick}
                    quizLength={this.props.quiz.length}
                    answerNumber={this.props.activeQuestion + 1}
                    state={this.props.answerState}
                  />
    
              }
            </div>
          </div>
        )
      }
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(quizRetry())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);