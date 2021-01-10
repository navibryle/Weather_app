import React from 'react'
import './signUp.css'
import {
    Link
  } from "react-router-dom"
import {BACKEND_URL,ACCOUNT_CREATED,ACCOUNT_EXSIST} from './constants'
import cookie from 'react-cookies'
import CsrfToken from './Csrftoken'
export default class SignUp extends React.Component{  
    constructor(props){
        super(props)
        this.state = {uname:'',pass:'',passConf:'',dbResult:''}
        this.unameListener = this.unameListener.bind(this)
        this.passListener = this.passListener.bind(this)
        this.passConfListener = this.passConfListener.bind(this)
        this.signUp = this.signUp.bind(this)
    }
    unameListener(event){
        this.setState({uname:event.target.value})
    }
    passListener(event){
        this.setState({pass:event.target.value})
    }
    passConfListener(event){
        this.setState({passConf:event.target.value})
    }
    
    signUp(event){
        //need to create an acount that doesnt already exist
        const req = new XMLHttpRequest()
        const url = `${BACKEND_URL}/createUser?username=${this.state.uname}&password=${this.state.pass}`
        req.open('POST',url,false)//synchronous request
        req.setRequestHeader("Content-type", "text/html")
        req.setRequestHeader("X-CSRFTOKEN",cookie.load("csrftoken"))//set the token that django will recognize
        req.withCredentials = true
        req.send(`username=${this.state.uname}&password=${this.state.pass}`)
        const res = req.responseText
        console.log(res)
        if (res === ACCOUNT_CREATED){
            // this will use useHistory api from react router to change the page
            const {history} = this.props
            history.push({pathname:"/userPage",state: {uname:this.state.uname}})
        }else if (res === ACCOUNT_EXSIST){
            this.setState({dbResult:"username already exist"})
        }else{
            this.setState({dbResult:"error"})
        }
    }
    render(){
        return(
            <div>
                <Nav/>
                <div className="container w-100 h-100">
                    <div  className="row align-items-center h-100" >
                        <form className = "col-md-6 sign-up-form" >
                            <CsrfToken/>
                            <WarningText uname = {this.state.uname} pass = {this.state.pass} passconf = {this.state.passConf} dbResult = {this.state.dbResult}/>
                            <UnameInp value = {this.state.uname} handleChange= {this.unameListener}/>
                            <PassInp value = {this.state.pass} handleChange = {this.passListener}/>
                            <PassConf value = {this.state.passConf} handleChange = {this.passConfListener}/>
                            <SingUpBtn handleClick = {this.signUp}/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class WarningText extends React.Component{
    constructor(props){
        super(props)
        this.state = {error:this.checkInp()}
    }
    checkInp(){
        if (this.props.dbResult != ''){
            return this.props.dbResult
        }else if (this.props.uname === '' ){
            return 'username must not be empty'
        }else if (this.props.pass === ''){
            return 'password must not be empty'
        }else if (this.props.passConf === ''){
            return 'password confirmation must not be empty'
        }else if (this.props.uname > 50 || this.props.pass > 50 || this.props.passConf > 50){
            return 'username,password, and passowrd confirmation must be less than or equal to 50 characters'
        }else if(this.passConf ){
            return 'password must match'
        }else{
            return ''
        }
    }
    render(){
        return(
        <div id = "warning-text">{this.state.error}</div>
        )
    }
}
function Nav(props){
    return(
        <nav class="navbar navbar-dark bg-dark">
            <Link to="/">
                Home
            </Link>
        </nav>
    )
    
}
function UnameInp(props){
    return (
        <div className="mx-sm-3 mb-2">
            <input type="username" className="form-control" id="username" placeholder="Username" onChange = {props.handleChange} value={props.value}/>
        </div>
    )
}

function PassInp(props){
    return(
        <div className="mx-sm-3 mb-2">
            <input type="password" className="form-control" id="password" placeholder="Password" value={props.value} onChange = {props.handleChange}/>
        </div>
    )
}

function PassConf(props){
    return(
        <div class="mx-sm-3 mb-2">
            <input type="password" class="form-control" id="confirmed-password" placeholder="Confirm Password" value={props.value} onChange = {props.handleChange}/>
        </div>
    )
}
function SingUpBtn(props){
    return(
        <button onClick={props.handleClick} type="button" class="btn btn-primary mb-2">
            Sign up
        </button>
    )
}

