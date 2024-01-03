import React from "react";
import './Layout.css'
import classes from './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle /MenuToggle'
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { connect } from 'react-redux'

class Layout extends React.Component{
    state = { 
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuClosehandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className='Layout'>
                <Drawer isOpen={this.state.menu} onClose={this.menuClosehandler} isAuth={this.props.isAuth}/>
                <MenuToggle 
                  onToggle={this.toggleMenuHandler}
                  isOpen={this.state.menu}
                />
                <main >
                    { this.props.children }
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: !!state.auth.token
    }
}

export default connect(mapStateToProps, null)(Layout);