import React from "react";
import classes from './CreateQuiz.css'
import './CreateQuiz.css'
import Button from '../../UI/Button/Button'
import {createControl} from '../../../form/formFramework'
import Input from '../../UI/Input/Input'
import Select from "../../UI/Select/Select";
import Auxilliary from "../../../hoc/Auxilliary/Auxilliary";
import { validate } from "../../../form/formFramework";
import { validateForm } from "../../../form/formFramework";
import axios from '../../../axios/axios-quiz' 
import { connect } from 'react-redux'
import { createQuizQuestion } from "../../../store/actions/create";
import { finishCreateQuiz } from "../../../store/actions/create";

function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        errorMessage: 'Value cant be empty',
        id: number
    }, {required: true})
}

function createFormControles() {
    return {
        question: createControl({
            label: "Question 1",
            errorMessage: 'Value cant be empty',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class CreateQuiz extends React.Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControles()
    }

    submitHandler = (e) => {
        e.preventDefault();
    }

    addQuestionHandler = (e) => {
        e.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls
        
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControles()
        })
    }

    createQuizHandler = (e) => {
        e.preventDefault();
            this.setState({
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControles()
            })
            this.props.finishCreateQuiz()


 /*        axios.post('https://reactquiz-b-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', this.state.quiz)
          .then(res => {
            console.log(res)
          })
          .catch(err => console.log(err)) */

        console.log(this.state.quiz)
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = { ...formControls[controlName] }

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxilliary key={controlName + index} >
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        touched={control.tauched}
                        shouldValidate={!!control.shouldValidate}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />

                    { index === 0 ? <hr /> : null }        
                </Auxilliary>
            )
        });
    }

    selectChangeHandler = event => {
        console.log(event.target.value)
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select 
            label='Choose right answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: '1', value: 1 },
                { text: '2', value: 2 },
                { text: '3', value: 3 },
                { text: '4', value: 4 }
            ]}
        />
        return (
            <div className="CreateQuiz">
                <div>
                    <h1>Create Test</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderInputs() }
                        
                        {select}

                        <Button type='primary' onClick={this.addQuestionHandler} disabled={!this.state.isFormValid}>
                            Add question
                        </Button>

                        <Button type='success' onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0}>
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quiz: state.create.quiz, 
     }
}   

const mapDispatchToProps = (dispatch) => {
    return {
        createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);