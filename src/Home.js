import { render } from '@testing-library/react';
import React from 'react';
import './Home.css';
import TableQuery from './TableQuery'
import {BACKEND_URL,SUCCESSFUL_LOGIN} from './constants'
import {
    withRouter,
    Link
  } from "react-router-dom"
import cookie from 'react-cookies'
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        document.title = "weather-app"
    }
    render(){
        const {history} = this.props
        return (
            <div>
                <ToolBar history = {history}/>
                <TableQuery headerId = {"header"} tableId = {"table-body"} />
                <ContactInfo/>
            </div>
        )
    }
}

class ToolBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {uName:'',pass:'',logedIn:false,path:"/",loginError:""}
        this.handleChangeUname = this.handleChangeUname.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
        this.logIn = this.logIn.bind(this)
    }
    handleChangeUname(event){
        this.setState({uName:event.target.value})
    }
    handleChangePass(event){
        this.setState({pass:event.target.value})
    }
    logIn(event){
        const req = new XMLHttpRequest()
        const LOGINURL = `${BACKEND_URL}/LogIn?username=${this.state.uName}&password=${this.state.pass}`
        req.open("GET",LOGINURL,false) // Synchronous request
        req.setRequestHeader("Content-Type","text/plain")
        req.send(null);
        const res = req.responseText
        if (res === SUCCESSFUL_LOGIN){
            this.props.history.push({pathname:"/userPage",state:{uname:this.state.uName}})
            
        }else{
            this.setState({loginError:"account does not exist"})
        }
    }
    render(){
        return (
            <nav className = "navbar navbar-dark bg-dark">
                <Link to="/signUp">
                    sign up
                </Link>
                <span id = "log-info">
                    <form>
                        <div className="form-row align-items-center">
                            <span id="log-stat">{this.state.loginError}</span>
                            <UnameInp handleChange = {this.handleChangeUname} value = {this.state.uName}/>
                            <PassInp handleChange = {this.handleChangePass} value = {this.state.pass}/>
                            <RemeberMeBox/>
                            <LogInBtn submit = {this.logIn}/>
                        </div>
                    </form>
                </span>
            </nav>
        )
    }
}
//============ small components===========

function RemeberMeBox(props){
    return (
        <div className="col-auto">
            <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="autoSizingCheck"/>
                <label className="form-check-label white" for="autoSizingCheck">
                    Remember me
                </label>
            </div>
        </div>
    )
}
function ContactInfo(props){
    return (
        <p class = "center" id="contact-info">
            Ivan Penales<br/>
            ipenales@ualberta<br/>
            https://github.com/navibryle
        </p>
    )
}
function LogInBtn(props){
    return (
        <div className="col-auto">
            
            <button type="button" className="btn btn-primary mb-2" onClick={props.submit}>Log in</button>
        </div>
    )
}
function UnameInp(props){
    return (
        <div className="col-auto">
            <input type="text" className="form-control mb-2" id="log-username" value={props.value} onChange={props.handleChange} placeholder="Username"/>
        </div>
    )
}

function PassInp(props){
    return (
        <div className="col-auto">
            <input type="password" className="form-control mb-2" id="log-password" value={props.value} onChange={props.handleChange} placeholder="Password"/>
        </div>
    )
}
//========== small components end===========

export default withRouter(Home)