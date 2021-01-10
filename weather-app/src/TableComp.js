export function TableRow(props){
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
export function TableHeader(props){
    return (
        <tr id = {props.headerId}>
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