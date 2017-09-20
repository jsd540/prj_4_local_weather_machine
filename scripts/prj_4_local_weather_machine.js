
// get user coord's and generate api url req

function get_coord(){
	if(navigator.geolocation){
	 navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		console.log("Geo Not supported");
	}
}

// getting data from the api and parsing to json

function showPosition(position){
    //get user location
	var request = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
	var xmlHttp = new XMLHttpRequest();
    var data = "";
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            
            data = JSON.parse(xmlHttp.responseText);

            document.getElementById("location").innerHTML = "Local weather for " + data.name + " today";
            load_list1(data);
            load_list2(data);  
        }        
    }
    xmlHttp.open("GET", request, true);
    xmlHttp.send(null);
}
get_coord();

//load temp div with thermometer pic and all temps in celsius

function load_list1(data){

    function pic(){

    var elem = document.createElement("img");
    elem.setAttribute("src", "images/thermometer.png");
    document.getElementById("list1").appendChild(elem);

    }
    pic();

    var btn = document.getElementById("faren_cel");

    document.getElementById("curr_temp").innerHTML = "<small>Current temperature:  </small>" + "<b>" + data.main.temp +"</b>"+ "<b> C </b>";
    document.getElementById("hi_temp").innerHTML = "<small>Expected High: </small>" + "<b>" + data.main.temp_max + "</b>" + " <b> C </b>";
    document.getElementById("low_temp").innerHTML = "<small>Expected Low: </small>" + "<b>" + data.main.temp_min + " </b>" + "<b>C </b>";
    btn.innerHTML = "Press for Farenheit";

    // change temp info to farenheit if btn is pressed and bacj to celsius if pressed again

    function chg_temp(temp){
   
    if (temp == "celsius"){
     
        document.getElementById("curr_temp").innerHTML = "<small>Current temperature:  </small>" + "<b>" + data.main.temp +"</b>"+ "<b> C </b>";
        document.getElementById("hi_temp").innerHTML = "<small>Expected High: </small>" + "<b>" + data.main.temp_max + "</b>" + " <b> C </b>";
        document.getElementById("low_temp").innerHTML = "<small>Expected Low: </small>" + "<b>" + data.main.temp_min + " </b>" + "<b>C </b>";
        btn.innerHTML = "Press for Farenheit";
        temp = "farenheit";
    }
    else{

        var curr_temp_faren = parseFloat((data.main.temp * 1.8) + 32).toFixed(2);
        var hi_temp_faren  = parseFloat((data.main.temp_max * 1.8) + 32).toFixed(2);
        var low_temp_faren = parseFloat((data.main.temp_min * 1.8) + 32).toFixed(2);

        document.getElementById("curr_temp").innerHTML = "<small>Current temperature: </small>" + "<b>" + curr_temp_faren +"</b>"+ "<b> F </b>";
        document.getElementById("hi_temp").innerHTML = "<small>Expected High: </small>" + "<b>" + hi_temp_faren + "</b>" + " <b> F </b>";
        document.getElementById("low_temp").innerHTML = "<small>Expected Low: </small>" + "<b>" + low_temp_faren + " </b>" + "<b>F </b>";
        btn.innerHTML = "Press for celsius"
        temp = "celsius";
    }
}
    // btn on click function

    var temp = "";
    btn.onclick = function(){
      
        if (temp == "celsius"){
            temp = "farenheit";
            chg_temp(temp);
        }
        else{
            temp = "celsius";
            chg_temp(temp);
        }
    }

}

// load additional weather data in second div

function load_list2 (data) {

    function pic2(){

    var elem = document.createElement("img");
    elem.setAttribute("src", data.weather[0].icon);
    document.getElementById("list2").appendChild(elem);

    }
    pic2();

    document.getElementById("sky").innerHTML = "<small>Expect: </small>" +"<b>" + data.weather[0].main + "</b>";
    document.getElementById("humidity").innerHTML = "<small>Humidity: </small>" + "<b>" + data.main.humidity +"</b>" + "<b>%</b>" ;
    document.getElementById("winds").innerHTML = "<small>Winds at: </small>" + "<b>"+ data.wind.speed +"</b>" + " <b>mph</b>";

}

// need to find an api for the background image that gets user city 
// and finds an appropriate image.
















