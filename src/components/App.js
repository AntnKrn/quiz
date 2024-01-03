import React from "react";
import Layout from "../hoc/Layout/Layout";
import { Route, Routes } from 'react-router-dom'
import Quiz from "../components/container/Quiz/Quiz";
import QuizList from "../components/container/QuizList/QuizList";
import CreateQuiz from "../components/container/CreateQuiz/CreateQuiz";
import Auth from "../components/container/Auth/Auth";
import { connect } from 'react-redux'
import Logout from "./Logout/Logout";

class App extends React.Component {
  render() {

    let routes = (
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/quiz/:id' element={<Quiz />} />
          <Route path='/' element={<QuizList />} />
        </Routes>
    )

    if(this.props.isAuth) {
      routes = (
        <Routes>
          <Route path='/quiz-creator' element={<CreateQuiz />} />
          <Route path='/quiz/:id' element={<Quiz />} />
          <Route path='/' element={<QuizList />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      )
    }
    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  }
}

export default connect(mapStateToProps)(App);