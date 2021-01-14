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
        this.state = {uname:'',pass:'',passConf:'',dbResult:'',inpStatus:null}
        this.unameListener = this.unameListener.bind(this)
        this.passListener = this.passListener.bind(this)
        this.passConfListener = this.passConfListener.bind(this)
        this.signUp = this.signUp.bind(this)
        this.checkInp = this.checkInp.bind(this)
    }
    unameListener(event){
        this.setState({uname:event.target.value},() => this.checkInp())
    }
    passListener(event){
        this.setState({pass:event.target.value},() => this.checkInp())
    }
    passConfListener(event){
        this.setState({passConf:event.target.value},() => this.checkInp())
    }
    signUp(event){
        //need to create an acount that doesnt already exist
        this.checkInp()
        if (this.state.inpStatus === ''){
            console.log("hereeeeeeee")
            const req = new XMLHttpRequest()
            const url = `${BACKEND_URL}/createUser?username=${this.state.uname}&password=${this.state.pass}`
            req.open('POST',url,false)//synchronous request
            req.setRequestHeader("Content-type", "text/html")
            req.setRequestHeader("X-CSRFTOKEN",cookie.load("csrftoken"))//set the token that django will recognize
            req.withCredentials = true
            req.send(`username=${this.state.uname}&password=${this.state.pass}`)
            const res = req.responseText
            if (res === ACCOUNT_CREATED){
                // this will use useHistory api from react router to change the page
                const {history} = this.props
                history.push({pathname:"/userPage",state: {uname:this.state.uname}})
            }else if (res === ACCOUNT_EXSIST){
                this.setState({inpStatus:"username already exist"})
            }else{
                this.setState({inpStatus:"error"})
            }
        }
        
    }
    checkInp(){
        if (this.state.uname === '' ){
            this.setState({inpStatus:'username must not be empty'})
        }else if (this.state.pass === ''){
            this.setState({inpStatus:'password must not be empty'})
        }else if (this.state.passConf === ''){
            this.setState({inpStatus:'password confirmation must not be empty'})
        }else if (this.state.uname.length > 50 || this.state.pass.length > 50 || this.state.passConf.length > 50){
            this.setState({inpStatus:'username,password, and passowrd confirmation must be less than or equal to 50 characters'})
        }else if(this.state.passConf !== this.state.pass){
            this.setState({inpStatus:'password must match'})
        }else{
            this.setState({inpStatus:''})
        }
    }
    render(){
        return(
            <div>
                <Nav/>
                <form className = "sign-up-form" >
                    <CsrfToken/>
                    <WarningText uname = {this.state.uname} 
                    pass = {this.state.pass} 
                    passConf = {this.state.passConf} 
                    dbResult = {this.state.dbResult}
                    inpStatus = {this.state.inpStatus}/>
                    <UnameInp value = {this.state.uname} handleChange= {this.unameListener}/>
                    <PassInp value = {this.state.pass} handleChange = {this.passListener}/>
                    <PassConf value = {this.state.passConf} handleChange = {this.passConfListener}/>
                    <SingUpBtn handleClick = {this.signUp}/>
                </form>
            </div>
        )
    }
}
class WarningText extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <div id = "warning-text">{this.props.inpStatus}</div>
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
        <button onClick={props.handleClick} type="button" class="btn btn-primary mb-2 button-sign-up">
            Sign up
        </button>
    )
}

