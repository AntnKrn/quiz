import React from "react";
import {connect} from 'react-redux'
import { Route } from 'react-router-dom'
import { logout } from "../../store/actions/auth";

class Logout extends React.Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Route to='/' />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)