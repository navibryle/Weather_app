import React from 'react'
import './User.css'
import {ADD_TABLES,SHOW_BUTTONS,BACKEND_URL,STORED_DATASET,SUCCESSFULY_SAVED,SUCCESSFULY_DELETED} from './constants'
import {v4 as uuidv4} from 'uuid'
import {TableHeader,TableRow} from './TableComp'
import CsrfToken from './Csrftoken'
import cookie from 'react-cookies'
import { Link } from 'react-router-dom'
export default class User extends React.Component{
    //on mount this component needs to query the database for all the datasets in the user data and create a list of buttons
    constructor(props){
        super(props)
        //newButtons will be true if new buttons for adding and showing a table needs to be rendered
        this.state = {selectedDataSet:'',dataset:[],button:null,newDataset:'',uName:this.props.location.state.uname}
        this.addDataSet = this.addDataSet.bind(this)
        this.dataSetListner = this.dataSetListner.bind(this)
        this.getDatasets = this.getDatasets.bind(this)
    }
    dataSetListner(event){
        this.setState({newDataset:event.target.value})
    }
    componentDidMount(){
        this.getDatasets()
        this.checkForCookies()
    }
    checkForCookies(){
        
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){ 
            document.cookie="testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        if (!cookieEnabled){
            alert("cookie not enabled")
        }
    }
    addDataSet(event){
        const req = new XMLHttpRequest()
        const url = `${BACKEND_URL}/storeDataset?username=${this.state.uName}&dataset=${this.state.newDataset}`
        req.open("GET",url,false)
        req.setRequestHeader("Content-Type","text/plain")
        req.send(null)
        const response = req.responseText
        if (response === STORED_DATASET){
            //DATASET successfuly stored
            var newDataSetList = [...this.state.dataset]
            newDataSetList.push({dName:this.state.newDataset,id:uuidv4()})
            this.setState({dataset:newDataSetList,newDataset:''})
        }
    }
   
    getDatasets(){
        const req = new XMLHttpRequest()
        const url = `${BACKEND_URL}/getDatasets?username=${this.state.uName}`
        req.open('GET',url,false)
        req.send(null)
        const res = JSON.parse(req.response) // the response will a JSON:{'datasetName':'datasetName',...,'datasetName':'datasetName'}
        const newDataset = this.state.dataset.slice()
        for (var i in res){
            //res[i] will be the name of the dataset
            if (res[i] != null){
                newDataset.push({id:`id-${res[i]}`,dName:res[i]})
            }
        }
        this.setState({dataset:newDataset})
        
    }
    render(){
        return(
            <div>
                <CsrfToken/>
                <Nav/>
                <UserData 
                dataset = {this.state.dataset} 
                newDataset = {this.state.newDataset} 
                dataSetListner = {this.dataSetListner}
                addDataSet = {this.addDataSet}
                button = {this.state.button} 
                uName={this.state.uName}/>
            </div>
        )
    }
}
class UserData extends React.Component{
    constructor(props){
        super(props)
        this.request = null
        this.state = {cities:[],newRows:[],newRowInp:'',currentDname:null,buttonDisp:''}
        /**
         * citites is the list of entries in the dataset
         * newRows are the newRows that are entered by the user
         * newRowInp is the new city name the the user want to enter in the datbase
         * currentDname is the current selected dataset
         * buttonDisp is the display mode for the button option
         */
        this.showButtons = this.showButtons.bind(this)
        this.showTables = this.showTables.bind(this)
        this.addTables = this.addTables.bind(this)
        this.fetch_city = this.fetch_city.bind(this)
        this.newRowListener = this.newRowListener.bind(this)
        this.clearNewRowsCallback = this.clearNewRowsCallback.bind(this)
        this.saveToDb = this.saveToDb.bind(this)
        this.deleteTables = this.deleteTables.bind(this)
        this.deleteCallback = this.deleteCallback.bind(this)
    }
    showTables(){
        //-------this will get tables from db-----
        const req = new XMLHttpRequest()
        const url = `${BACKEND_URL}/getTable?username=${this.props.uName}&dataset=${this.state.currentDname}`
        req.open('GET',url,false)
        req.setRequestHeader('Content-Type','application/json')
        req.send(null)
        //--------------------------------------------
        this.setState({cities:this.parseData(req.response)})//this will cause the dom to update with the new tables
    }
    parseData(Data){
        //this will turn the json into a javascript object. This will be subjective to what the server produces
        var output = []
        var parsedData = JSON.parse(Data)
        for (var key in JSON.parse(Data)){
            var buffer = {}
            buffer.name = key
            buffer.temp = parsedData[key].temp
            buffer.feels_like = parsedData[key].feels_like
            buffer.temp_min = parsedData[key].temp_min
            buffer.temp_max = parsedData[key].temp_max
            buffer.pressure = parsedData[key].pressure
            buffer.humidity = parsedData[key].humidity
            buffer.visibility = parsedData[key].visibility
            buffer.iconUrl = parsedData[key].iconUrl
            buffer.description = parsedData[key].description
            output.push(buffer)
        }
        return output
    }
    parseDataForDb(Data){
        //Data must be the javascript object for each row of a table
        var output = {}
        for (var key in Data){
            output[Data[key].name] = Data[key]
        }
        return output
    }
    newRowListener(event){
        this.setState({newRowInp:event.target.value})
    }
    addTables(){
        this.setState({cities:[]})
        this.setState({buttonDisp:ADD_TABLES})
    }
    fetch_city(event){
        let instance = this
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.state.newRowInp+"&appid=249e80fba61f245e94d010e0f9955e10&units=metric").then(
        function (response){
            return response.json()
            }).then(function (data){
                if (data != null && data.main != null){
                    const weatherAtt = {
                        name:data.name,
                        temp:data.main.temp,
                        feels_like:data.main.feels_like,
                        temp_min:data.main.temp_min,
                        temp_max:data.main.temp_max,
                        pressure:data.main.pressure,
                        humidity:data.main.humidity,
                        visibility:data.visibility,
                        iconUrl:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                        description:data.weather[0].description
                    }
                    const arr = [...instance.state.newRows]
                    arr.push(weatherAtt)
                    instance.setState({newRows:arr})
                }else{
                    alert("City is not in the OpenWeather API. ")
                }
        }).catch(function (err){
            alert("City is not in the OpenWeather API. Error log: "+err)
        })
    }
    showButtons(event){
        const id = event.target.id
        for (var i in this.props.dataset){
            if (i != null && this.props.dataset[i].id === id){
                this.setState({
                    buttonDisp:SHOW_BUTTONS,
                    currentDname:this.props.dataset[i].dName
                },() => this.showTables())
            }
        }
    }
    createDatasetButtons(){
        return (
            this.props.dataset.map((item) =>{
                return(
                    <DatasetButton id = {item.id} showButtons = {this.showButtons} dName = {item.dName} key = {uuidv4()}/>
                )
                
            })
        )
    }
    clearNewRowsCallback(){
        if (this.req.responseText != SUCCESSFULY_SAVED){
            alert("could not save city!")
        }
        this.setState({newRows:[],buttonDisp:SHOW_BUTTONS},() => this.showTables())
    }
    saveToDb(){
        const req = new XMLHttpRequest();
        const url = `${BACKEND_URL}/saveCities?username=${this.props.uName}&dataset=${this.state.currentDname}`
        req.open('POST',url,true)
        req.withCredentials = true
        req.setRequestHeader("X-CSRFTOKEN",cookie.load("csrftoken"))    //set the token that django will recognize
        req.send(JSON.stringify(this.parseDataForDb(this.state.newRows)))
        this.req = req
        req.onload = this.clearNewRowsCallback
    }
    deleteCallback(){
        if (this.req.responseText !== SUCCESSFULY_DELETED){
            alert(`could not delete cities in ${this.state.currentDname}`)
        }
        this.showTables()
    }
    deleteTables(){
        const req = new XMLHttpRequest();
        const url = `${BACKEND_URL}/deleteCities?username=${this.props.uName}&dataset=${this.state.currentDname}`
        req.open('POST',url,true)
        req.withCredentials = true
        req.setRequestHeader("X-CSRFTOKEN",cookie.load("csrftoken"))//set the token that django will recognize
        this.req = req
        req.send(null)
        req.onload = this.deleteCallback
    }
    render(){
        return (
            <div>
                <span id = "data-wrap" >
                    <div  id = "dataset" className="list-group">
                        {this.createDatasetButtons()}
                    </div>
                    <AddDataSet 
                    handleClick={this.props.addDataSet} 
                    dName = {this.state.currentDname} 
                    handleChange = {this.props.dataSetListner} 
                    value = {this.props.newDataset}/>
                    <CsrfToken/>
                    <ButtonOption 
                    buttonDisp = {this.state.buttonDisp} 
                    dName = {this.state.currentDname} 
                    newRowVal= {this.state.newRowInp}
                    deleteTables = {this.deleteTables}
                    handleChange={this.newRowListener} 
                    addTables={this.addTables} 
                    addTable={this.fetch_city}
                    showTables={this.showTables}
                    /> 
                </span>
                <UserTable 
                cities={this.state.cities} 
                toAdd={this.state.newRows} 
                tableId = {"table-body-user"} 
                headerId = {"header"}
                saveTables = {this.saveToDb}/>
            </div>
            )
    }
}
function DatasetButton(props){
    //prev class : list-group-item list-group-item-action
    return (
        <button id = {props.id} onClick = {props.showButtons} type="button" className=" list-group-item list-group-item-action">{props.dName}</button>
    )
}
class UserTable extends React.Component{
    constructor(props){
        super(props)
        this.tableHeader = <TableHeader headerId = {this.props.headerId}/>
        this.toRender = null
    }
    render(){
        if (this.props.cities.length > 0){
            return (
                <table class = "center user-table" id = "table">
                    <tbody id = {this.props.tableId}>
                        {this.tableHeader}
                        {this.props.cities.map((data) => {
                            return <TableRow att={data} key = {uuidv4()} />
                        })}
                    </tbody>
                </table>
            )
        }else if (this.props.toAdd.length > 0){
            return (
                <div>
                    <table class = "center user-table" id = "table">
                        <tbody id = {this.props.tableId}>
                            {this.tableHeader}
                            {this.props.toAdd.map((data) => {
                                return <TableRow att={data} key = {uuidv4()} />
                            })}
                        </tbody>
                    </table>
                    <CsrfToken/>
                    <button onClick = {this.props.saveTables} id = "save-button" type = "button" className="btn btn-dark save-btn">
                    <CsrfToken/>
                        save
                    </button>
                </div>
                
            )
        }
        return null
    }
}

class ButtonOption extends React.Component{
    constructor(props){
        super(props)
        this.button = null
        this.state = {button:'',buttonDisp:this.props.buttonDisp}
    }
    render(){
        let button = null
        if (this.props.buttonDisp === SHOW_BUTTONS){
            button =  (
                <div >
                        <button  onClick = {this.props.addTables}  className="btn btn-dark btn-opt-child-margin">Add city to {this.props.dName}</button>
                        <button onClick = {this.props.deleteTables} className="btn btn-dark btn-opt-child-margin">Delete ALL tables of {this.props.dName}</button>
                </div>
            )
        }else if (this.props.buttonDisp === ADD_TABLES){
         button = (
                <div className = "center user-city-inp-wrapper" >
                    
                    <input  id = "input-box-user"  placeholder="Enter city to add" value={this.props.newRowVal} onChange={this.props.handleChange}/>
                    <button onClick={this.props.addTable}  type = "button" className="submit-button-user btn btn-dark">submit</button>
                </div>
         )
        }
        return (
            <div id = "button-opt" className = "center button-opt-options">
                <CsrfToken/>
                {button}
            </div>
        )
    }
}

function Nav(props){
    return (
        <nav className="navbar navbar-dark bg-dark">
            <span  className = "white" id="user-disp" value = {props.error}></span>
            <Link to = "/">
                <button  className="btn btn-primary mb-2 white" id="user-disp">sign out</button>
            </Link>
            
        </nav>
    )
}
function AddDataSet(props){
    return(
        <div id = "add-dataset" className = "center">
            <div className = "bold margin center">Add dataset</div>
            <div>
                <CsrfToken/>
                <input type="text"  id = "data-name-inp" value={props.value} onChange={props.handleChange}/>
            </div>
            <div className="center"><button onClick={props.handleClick} type="button" className="btn btn-primary btn-add-dataset">Submit</button></div>
        </div>
    )
}

