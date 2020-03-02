//==========================================================
//this is an async request being made to OpenWeather api to request Data from the specified
function fetch_json (city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=249e80fba61f245e94d010e0f9955e10&units=metric").then(
    function (response){
        return response.json()
        }).then(function (data){
            window.addEventListener('load',add_header());
            window.addEventListener('load',add_row(data));
    }).catch(function (err){
        alert("City is not in the OpenWeather API");
    })
}
//==========================================================
function clicked_city_query(){
    fetch_json(document.getElementById("input-box").value);
}
function add_header(){
    let check = document.getElementById("header");
    if (check === null){
        let header = 
        `<tr id = "header">`+
            `<th>CITY</th>`+
            `<th>TEMPERATURE &#8451</th>`+
            `<th>FEELS LIKE &#8451</th>`+
            `<th>MINIMUM TEMPERATURE &#8451</th>`+
            `<th>MAXIMUM TEMPERATURE &#8451</th>`+
            `<th>PRESSURE hPa</th>`+
            `<th>RELATIVE HUMIDITY</th>`+
            `<th>VISIBILITY m</th>`+
            `<th>CONDITION</th>`+
            `<th>DESCRIPTION</th>`+
        `</tr>`;
        document.getElementById("table-body").innerHTML += header;
    }
    return
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

function clicked_signup(){
    //This function will check input and if input is correct will call store_cred
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirm_pass = document.getElementById("confirmed-password").value;
    if (username === "" || password === "" || confirm_pass == ""){
        document.getElementById("warning-text").innerHTML = "Please fill out all the fields";
        return false;
    }else if(password != confirm_pass){
        document.getElementById("warning-text").innerHTML = "Password must match";
        return false;
    }else{
        store_cred(username,password);
    }
}

function store_cred(username,password){
    //this function will be an asynchronous ajax to store the username and password to the database
    let httpRequest = new XMLHttpRequest();
    httpRequest.onload = function(){

        if (httpRequest.responseText === `Succesfully registered ${username}`){
            alert(httpRequest.responseText);
            window.location.href = "index.html";
        }else{
            document.getElementById("warning-text").innerHTML = `The username ${username} is already in the database`;
        }
        
    }
    httpRequest.open('POST','http://127.0.1.1/php/proc_signup.php',true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send(`username=${username}&password=${password}`);
}

function log_in(){
    //This function will make an AJAX call to query the database and store the user in the cur_user table
    let username = document.getElementById("log-username").value;
    let password = document.getElementById("log-password").value;
    let httpRequest = new XMLHttpRequest();
    httpRequest.onload = function(){
        if (httpRequest.responseText === "YES"){
            window.location.href = `user.html?username=${username}`;
        }else{
            document.getElementById("log-stat").innerHTML = `Incorrect user and password combination`;
        }    
    }
    httpRequest.open('POST','http://127.0.1.1/php/signin.php',false);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send(`username=${username}&password=${password}`);
}
function log_out(){
    //This will logout the cur_user
}

function load_user(){
    //query the database for all user data.
    httpRequest.onload = function(){
        if (httpRequest.responseText === "YES"){
            window.location.href = `user.html?username=${username}`;
        }else{
            document.getElementById("log-stat").innerHTML = `Incorrect user and password combination`;
        }    
    }
    httpRequest.open('GET','http://127.0.1.1/php/signin.php',false);
    httpRequest.setRequestHeader('Content-type', 'application/json');
    httpRequest.send();
}