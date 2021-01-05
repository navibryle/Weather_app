export default class Table extends React.Component{
    constructor(props){
        super(props)
        this.state = {hasHeader :false,snapshots:[]} //snapshots will be a list of TableRow.
    }
    addCity(cityName){
        //add city will be called in the home component.
        if (this.state.hasHeader === false){
            this.setState({snapshots:[<TableHeader/>],hasHeader:true})
        }else{
            fetch_city(cityName)
        }
    }
    fetch_city(cityName){
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
                    visibility:data.main.visibility,
                    iconUrl:`http://openweathermap.org/img/w/${data[0].icon}.png`,
                    description:data.weather[0].description
                }
                this.setState({snapshots:this.state.snapshots.push(<TableRow att = {weatherAtt}/>)})

        }).catch(function (err){
            alert("City is not in the OpenWeather API."+"Error log: "+err);
        })
    }
    render(){
        return (
            <table className = "center" id = "table">
                <tbody id = "table-body">
                    {this.state.snapshots}
                </tbody>
            </table>
        )
    }
}
function TableRow(props){
    return (
        <tr> 
        <td>${props.att.name}</td>
        <td>${props.att.temp}</td>
        <td>${props.att.feels_like}</td>
        <td>${props.att.temp_min}</td>
        <td>${props.att.temp_max}</td>
        <td>${props.att.pressure}</td>
        <td>${props.att.humidity}%</td>
        <td>${props.att.visibility}</td>
        <td><Icon iconUrl={props.att.iconUrl} /></td>
        <td>${props.att.description}</td>
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
            <th>TEMPERATURE &#8451</th>
            <th>FEELS LIKE &#8451</th>
            <th>MINIMUM TEMPERATURE &#8451</th>
            <th>MAXIMUM TEMPERATURE &#8451</th>
            <th>PRESSURE hPa</th>
            <th>RELATIVE HUMIDITY</th>
            <th>VISIBILITY m</th>
            <th>CONDITION</th>
            <th>DESCRIPTION</th>
        </tr>
    )
}