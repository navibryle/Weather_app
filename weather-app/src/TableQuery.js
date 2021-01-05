import React from 'react'
export default class TableQuery extends React.Component{
    constructor(props){
        super(props)
        this.state = {snapshots:[],cityInp:'',needsHeader:false} //snapshots will be a list of TableRow.
        this.addCity = this.addCity.bind(this)
        this.cityChange = this.cityChange.bind(this)
        this.counter = 1
    }
    addCity(event){
        //add city will be called in the home component.
        if (!this.state.hasHeader){
            this.setState({needsHeader:true})
        }
        this.fetch_city(this.state.cityInp)
    }
    cityChange(event){
        this.setState({cityInp:event.target.value})
    }
    incrementReturnCounter(){
        this.counter += 1
        return this.counter
    }
    fetch_city(cityName){
        let instance = this
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=249e80fba61f245e94d010e0f9955e10&units=metric").then(
        function (response){
            return response.json()
            }).then(function (data){
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
                const arr = [...instance.state.snapshots]
                arr.push(weatherAtt)
                instance.setState({snapshots:arr})
        }).catch(function (err){
            alert("City is not in the OpenWeather API. Error log: "+err);
        })
    }
    render(){
        const tableHeader = this.state.needsHeader ?<TableHeader/>:''
        console.log(this.state.snapshots)
        return(
            <div>
                <div className = "center">
                <CitySearchForm city = {this.state.cityInp} handleChange = {this.cityChange} submit = {this.addCity}/>
                </div>
                <table className = "center" id = "table">
                    <tbody id = "table-body">
                        {tableHeader}
                        {this.state.snapshots.map((data) => {
                            return <TableRow att={data} key = {this.incrementReturnCounter()}/>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
function CitySearchForm(props){
    return (
        <div>
            <div className = "center" id = "title">
                Weather app
            </div>
            <div className = "center" >
                <input  id = "input-box" placeholder="Enter city name" value = {props.city} onChange = {props.handleChange}/>
                <button onClick={props.submit} id = "submit-button" type = "button" className="btn btn-dark">submit</button>
            </div>
        </div>
    )

}
function TableRow(props){
    return (
    <tr> 
        <td>{props.att.name}</td>
        <td>{props.att.temp}</td>
        <td>{props.att.feels_like}</td>
        <td>{props.att.temp_min}</td>
        <td>{props.att.temp_max}</td>
        <td>{props.att.pressure}</td>
        <td>{props.att.humidity}%</td>
        <td>{props.att.visibility}</td>
        <td><Icon iconUrl={props.att.iconUrl}/></td>
        <td>{props.att.description}</td>
    </tr>
    )
}
function Icon(props){
    return <img id="wicon" src={props.iconUrl} alt="Weather icon"></img>
}
function TableHeader(props){
    return (
        <tr id = "header">
            <th>CITY</th>
            <th dangerouslySetInnerHTML={{__html: 'TEMPERATURE &#8451'}}></th>
            <th dangerouslySetInnerHTML={{__html: 'FEELS LIKE &#8451'}} ></th>
            <th dangerouslySetInnerHTML={{__html: 'MINIMUM TEMPERATURE &#8451'}} ></th>
            <th dangerouslySetInnerHTML={{__html: 'MAXIMUM TEMPERATURE &#8451'}} ></th>
            <th>PRESSURE hPa</th>
            <th>RELATIVE HUMIDITY</th>
            <th>VISIBILITY m</th>
            <th>CONDITION</th>
            <th>DESCRIPTION</th>
        </tr>
    )
}