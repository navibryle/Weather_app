//==========================================================
//this is an async request being made to OpenWeather api to request Data from the specified
function fetch_json (city){
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=249e80fba61f245e94d010e0f9955e10&units=metric").then(
    function (response){
        return response.json()
        }).then(function (data){
            window.addEventListener('load',add_row(data));
    }).catch(function (err){
        alert("City is not in the OpenWeather API");
    })
}
//==========================================================

function create_entry(text){
    //this wil be an entry in a row
    return document.createElement("TD").appendChild(document.createTextNode(text));
}
function clicked(){
    fetch_json(document.getElementById("input-box").value);
    
}
function add_row(weather_json){
   const table = document.getElementById("table-body");
   var iconurl = "http://openweathermap.org/img/w/" + weather_json.weather[0].icon + ".png";
   let icon = `<img id="wicon" src="${iconurl}" alt="Weather icon">`;
   let table_row = 
    `<tr>`+ 
        `<td>${weather_json.name}</td>`+
        `<td>${weather_json.main.temp}</td>`+
        `<td>${weather_json.main.feels_like}</td>`+
        `<td>${weather_json.main.temp_min}</td>`+
        `<td>${weather_json.main.temp_max}</td>`+
        `<td>${weather_json.main.pressure}</td>`+
        `<td>${weather_json.main.humidity}%</td>`+
        `<td>${weather_json.visibility}</td>`+
        `<td>${icon}</td>`+
        `<td>${weather_json.weather[0].description}</td>`+
    `</tr>`;

    table.innerHTML += table_row;
}
