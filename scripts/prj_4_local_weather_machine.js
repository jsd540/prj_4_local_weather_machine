
// get user coord's and generate api url req

function get_coord(){
	if(navigator.geolocation){
	 navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		console.log("Geo Not supported");
	}
}
function showPosition(position){

    //get user location
   
	var request = "https://fcc-weather-api.glitch.me/api/current?lat=" + 
        position.coords.latitude + "&lon=" + position.coords.longitude;
	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            
            //parse reply to json
            var data = JSON.parse(xmlHttp.responseText);

            // create img tag insert src from images file
            function pic(){
               var elem = document.createElement("img");
               elem.setAttribute("src", "images/thermometer.png");
               document.getElementById("list1").appendChild(elem);
            }
            pic();
            
            // create img tag insert src from reply
            function pic2(){
                var elem = document.createElement("img");
                elem.setAttribute("src", data.weather[0].icon);
                document.getElementById("list2").appendChild(elem)
            }
            pic2();

    // before displaying the temperature data convert to farenheit
    // then on button press toggle between celcius / default temp 
    // and farenhiet. each temp gets a curr_temp, hi_temp, and low_temp
    // and a farenhiet or celcius  string that controlls the if statement.


    // Geo location api back ground image to be written monday
    // use get / append element by tag

    // all data to be displayed
            document.getElementById("location").innerHTML = "Local weather for " + data.name + " today";
            
            document.getElementById("curr_temp").innerHTML = "<small>Current temperature:  </small>" + "<b>" + data.main.temp +"</b>"+ "<b> C </b>";
            document.getElementById("hi_temp").innerHTML = "<small>Expected High: </small>" + "<b>" + data.main.temp_max + "</b>" + " <b> C </b>";
            document.getElementById("low_temp").innerHTML = "<small>Expected Low: </small>" + "<b>" + data.main.temp_min + " </b>" + "<b>C </b>";

            document.getElementById("sky").innerHTML = "<small>Expect: </small>" +"<b>" + data.weather[0].main + "</b>";
            document.getElementById("humidity").innerHTML = "<small>Humidity: </small>" + "<b>" + data.main.humidity +"</b>" + "<b>%</b>" ;
            document.getElementById("winds").innerHTML = "<small>Winds at: </small>" + "<b>"+ data.wind.speed +"</b>" + " <b>mph</b>";
    // once done remove console log once done
            console.log(data);
        }   
    }
    xmlHttp.open("GET", request, true);
    xmlHttp.send(null);
}
get_coord();





