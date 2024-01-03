import React from "react";
import { NavLink } from "react-router-dom";
import classes from './QuizList.css'
import './QuizList.css'
import Loader from '../../UI/Loader/Loader'
import axios from '../../../axios/axios-quiz'
import {connect} from 'react-redux'
import { fetchQuizes } from "../../../store/actions/quiz";

class QuizList extends React.Component {

    renderQuizes() {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
/*         try{
            const response = await axios.get('/quiz.json');
            console.log(response.data)
            const quizes = [];
            Object.keys(response.data).map((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            })

            this.setState({
                quizes,
                loading: false
            })
        } catch(e) {
            console.log(e)
        } */

        this.props.fetchQuizes();

    }

    render() {
        return (
            <div className="QuizList">
                <div>
                    <h1>QuizList</h1>
                    { this.props.loading && this.props.quizes.length !== 0 ? <Loader /> :                     <ul>
                        { this.renderQuizes() }
                    </ul>} 
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);