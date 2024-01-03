import React from "react";
import classes from './Drawer.css'
import './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from "react-router-dom";

class Drawer extends React.Component{
    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink to={link.to} exact={link.exact} onClick={this.clickHandler}>{link.label}</NavLink>
                </li> 
            )
        })
    }

    render() {
        const cls = ['Drawer']
        if(!this.props.isOpen) {
            cls.push('close')
        }

        const links = [
            {to: '/', label: 'List', exact: 'true'},
        ]

        if(this.props.isAuth) {
            links.push(
                {to: '/quiz-creator', label: 'Create Quiz', exact: 'false'},
                {to: '/logout', label: 'Exit', exact: 'false'},
            )
        } else {
            links.push(            {to: '/auth', label: 'Auth', exact: 'false'},
            )
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </React.Fragment>
        )
    }
}

export default Drawer;