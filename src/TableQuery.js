import React from 'react'
import {TableHeader,TableRow} from './TableComp'
export default class TableQuery extends React.Component{
    constructor(props){
        super(props)
        this.state = {snapshots:[],cityInp:'',needsHeader:false,error:''} //snapshots will be a list of TableRow.
        this.addCity = this.addCity.bind(this)
        this.cityChange = this.cityChange.bind(this)
        this.counter = 1
    }
    addCity(event){
        //add city will be called in the home component.
        
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

                if (data != null || data.main != null){
                    instance.setState({error:''})
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
                    if (!instance.state.hasHeader){
                        instance.setState({needsHeader:true})
                    }
                    instance.setState({snapshots:arr})
                    
                }else{
                    instance.setState({error:"city cant be found"})
                }
                
        }).catch(function (err){
            instance.setState({error:"city cant be found"})
        })
    }
    render(){
        const tableHeader = this.state.needsHeader ?<TableHeader headerId = {this.props.domId}/>:''
        return(
            <div>
                <div className = "center">
                <CitySearchForm city = {this.state.cityInp} handleChange = {this.cityChange} submit = {this.addCity}/>
                </div>
                <div className="center city-error">{this.state.error}</div>
                <table className = "center" id = "table">
                    <tbody id = {this.props.tableId}>
                        {tableHeader}
                        {this.state.snapshots.map((data) => {
                            return <TableRow att={data} key = {this.incrementReturnCounter()} />
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
                <button onClick={props.submit} type = "button" className="submit-button btn btn-dark">submit</button>
            </div>
        </div>
    )

}
