import React from "react";
import classes from './AnswersList.css'
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = props => (
    <ul className="AnswersList">
        { props.answers.map((answer, index) => {
            return (
                <AnswerItem 
                  onAnswerClick={props.onAnswerClick}
                  key={index}
                  answer={answer}
                  state={props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default AnswersList;