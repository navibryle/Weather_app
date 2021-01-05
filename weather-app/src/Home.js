import { render } from '@testing-library/react';
import React from 'react';
import './home.css';
import Table from './Table.js'

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <ToolBar />
                <div className = "center">
                    <CitySearchForm/>
                </div>
                <Table className = "center" id = "table"/>
                <ContactInfo/>
            </div>
        )
    }
}

class LogInBtn extends React.Component{
    construcor(props){
        super(props)
    }
    onClick(){

    }
    render(){
        return (
            <div className="col-auto">
                <button type="button" className="btn btn-primary mb-2" onclick="log_in()">Log in</button>
            </div>
        )
    }
    
}
class ToolBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {uName:'',pass:''}

        this.handleChangeUname = this.handleChangeUname.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
    }
    handleChangeUname(event){
        this.setState({uName:event.target.value})
    }
    handleChangePass(event){
        this.setState({pass:event.target.value})
    }
    logIn(event){
        
    }
    render(){
        return (
            <nav className = "navbar navbar-dark bg-dark">
                <a href = "signup.html">sign up</a>
                <span id = "log-info">
                    <form>
                        <div className="form-row align-items-center">
                            <span id="log-stat"></span>
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
class CitySearchForm extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <div className = "center" id = "title">
                    Weather app
                </div>
                <div className = "center" >
                    <input  id = "input-box" placeholder="Enter city name"/>
                    <button onclick="clicked_city_query()" id = "submit-button" type = "button" className="btn btn-dark">submit</button>
                </div>
            </div>
        )
    }

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
//========== small components end===========
