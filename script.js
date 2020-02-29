//==========================================================
//this is an async request being made to OpenWeather api to request Data from the specified
function fetch_json (city){
    var weather;
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=249e80fba61f245e94d010e0f9955e10").then(
    function (response){
        return response.json()
        }).then(function (data){
            weather = data;
            document.getElementById("table").firstChild.appendChild(add_row(data));
    }).then(function(response) {console.log(weather)}).catch(function (err){
        weather = "City is not in the OpenWeather API";
    })
    return weather;
}
//==========================================================
function clicked(){
    fetch_json(document.getElementById("input-box").value);
    
}
function create_entry(text){
    //this wil be an entry in a row
    return document.createElement("td").append(document.createTextNode(text));
}
/*
function create_table_header(header_list){
    //header_list = [City,temp,feels_like,temp_min,temp_max,pressure,humidity,visibility,forecast,description]
    var node = document.createElement("tr").appendChild(document.createElement("th"));
    document.getElementById("table").appendChild(node);
    for (var i = 0;i<header_list.length; i++){
        //.firstChild.firstChild is the node containing the headers
        document.getElementById("table").firstChild.firstChild.appendChild(node.appendChild(document.createTextNode(header_list[i])));
    }
}*/
function add_row(weather_json){
    var root_node = document.createElement("tr");
    console.log("REEEE1111");
    root_node.appendChild(create_entry(weather_json.name));
    console.log("REEEE");
    root_node.appendChild(create_entry(weather_json.main.temp));
    root_node.appendChild(create_entry(weather_json.main.feels_like));
    root_node.appendChild(create_entry(weather_json.main.temp_min));
    root_node.appendChild(create_entry(weather_json.main.temp_max));
    root_node.appendChild(create_entry(weather_json.main.pressure));
    root_node.appendChild(create_entry(weather_json.main.humidity));
    root_node.appendChild(create_entry(weather_json.visibility));
    root_node.appendChild(create_entry(weather_json.weather[0].main));
    root_node.appendChild(create_entry(weather_json.weather[0].description));
    
    return root_node;
    
    
}
