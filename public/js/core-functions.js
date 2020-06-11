
//Variables and constants
const WEEK_DAYS_NAMES = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const YEAR_MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const TODAY_DATE_ID_ELEMENT = "pTempGeneral"
const TODAY_CITY_ID_ELEMENT = "pTempGeneral2"
const RESULTS_ZONE_REFERENCE_ID_ELEMENT = "img120917"
const CITY_POSITION = 0

var INITIALIZATION_STATE = false;
var HISTORIC_NUMBER_DAYS = 5;
var FORECAST_NUMBER_DAYS = 7;

var MAX_HISTORIC_NUMBER_DAYS = 5;
var MAX_FORECAST_NUMBER_DAYS = 7;

//*********The next importation is for unitary tests purposes only********* 
const CITIES_NAMES = ["Cuenca", "Buenos Aires", "New York", "Guayaquil", "Quito", "Dubai", "Montevideo", "Santiago", "Mexico", "Sidney"];
const CITIES_LATITUDES = ["-2.897695", "-34.595398", "40.798656", "-2.194350", "-0.176383", "25.096995", "-34.830600", "-33.458725", "19.429531", "-33.879129"];
const CITIES_LONGITUDES = ["-79.005055", "-58.495108", "-73.952968", "-79.892224", "78.480021", "55.174138", "-56.203491", "-70.639491", "-99.134102", "151.206602"];

//Core classes of the web system
class City {
    constructor(position) {
        this.latitude = CITIES_LATITUDES[position];
        this.longitude = CITIES_LONGITUDES[position];
        this.name = CITIES_NAMES[position];
    }
}
//*********End of importation is for unitary tests purposes only*********



//Core functions of the web system
function scrollToResultsZone() {
    if (INITIALIZATION_STATE == true) {
        document.getElementById(RESULTS_ZONE_REFERENCE_ID_ELEMENT).scrollIntoView();
    }
}

function setImageDayTemperature(imageID, temperature) {
    switch (true) {
        case temperature <= 0:
            $("#img" + imageID).attr("src", "\images/state1.svg");
            break;
        case temperature <= 10 && temperature > 0:
            $("#img" + imageID).attr("src", "\images/state2.svg");
            break;
        case temperature <= 20 && temperature > 10:
            $("#img" + imageID).attr("src", "\images/state3.svg");
            break;
        case temperature <= 30 && temperature > 20:
            $("#img" + imageID).attr("src", "\images/state4.svg");
            break;
        default:
            $("#img" + imageID).attr("src", "\images/state5.svg");
            break;
    }

}

function testFunc(a,b){

    return a+b;
}



function setLabelDayTemperature(labelID, temperature) {
    $("#p" + labelID).html(temperature + `<span class="span-clima">&#176;</span>` + "C");
}

function setLabelTodayDayTemperature(labelID, temperature) {
    $("#"+labelID).html(temperature + `<span class="span-clima">&#176;</span>` + "C");
}

function setTodayData(city) {
    let todayDate = new Date();
    var dayName = WEEK_DAYS_NAMES[todayDate.getDay()];
    var monthName = YEAR_MONTHS[todayDate.getMonth()];
    var dayNumber = todayDate.getDate()
    var resultsTest = []
    var todayCompleteDate = dayName + ", " + dayNumber + " de " + monthName
    resultsTest.push(todayCompleteDate)
    $("#"+TODAY_DATE_ID_ELEMENT).html(dayName + ", " + dayNumber + " de " + monthName);
    $("#"+TODAY_CITY_ID_ELEMENT).html(city.name);
    resultsTest.push(city.name)
    httpTodayRequest(city);

    return resultsTest
}

function testsetTodayData(){
    let cityTest = new City(0) 
    return setTodayData(cityTest)
}

function setForecastDaysNames() {
    let todayDate = new Date();
    var dayNumber = todayDate.getDay();
    var dayAndMonthDate= new Date()
    let nextDay;
    var generatedIdsElementsCompleteDate=[];

    for (let index = 0; index < FORECAST_NUMBER_DAYS; index++) {

        if (dayNumber == FORECAST_NUMBER_DAYS-1) { //Last possible position in WEEK_DAYS_NAMES array, dayNumber needs to be set to 0
            dayNumber = 0  //Domingo-->First day in WEEK_DAYS_NAMES array
        } else {
            dayNumber = dayNumber + 1
        }

        $("#h" + index + index).html(WEEK_DAYS_NAMES[dayNumber]);

        nextDay=index + 1; //Forecast days number

        dayAndMonthDate.setDate(todayDate.getDate() + nextDay)

        let dayNumberOfTheMonth = dayAndMonthDate.getDate()
        let dayMonthOfTheYear = YEAR_MONTHS[dayAndMonthDate.getMonth()]

        $("#h" + index + index + "2").html(dayNumberOfTheMonth + " de " + dayMonthOfTheYear);
        generatedIdsElementsCompleteDate.push("#h" + index + index + "2")
        if(generatedIdsElementsCompleteDate.length==FORECAST_NUMBER_DAYS){
            return generatedIdsElementsCompleteDate
        }
        

    }
}

function setHistoricDaysNames() {
    let todayDate = new Date();
    var dayNumber = todayDate.getDay();
    var dayAndMonthDate= new Date()
    let previousDay;
    var generatedIdsElementsCompleteDate=[];

    for (let index = 0; index < HISTORIC_NUMBER_DAYS; index++) {
        if (dayNumber == 0) {
            dayNumber = 6
        } else {
            dayNumber = dayNumber - 1
        }

        $("#h" + index).html(WEEK_DAYS_NAMES[dayNumber]);
        

     
        previousDay=index + 1
        dayAndMonthDate.setDate(todayDate.getDate() - previousDay)

        let dayNumberOfTheMonth = dayAndMonthDate.getDate()
        let dayMonthOfTheYear = YEAR_MONTHS[dayAndMonthDate.getMonth()]


        if (index == 2) {
            generatedIdsElementsCompleteDate.push("#h" + index+ "j")

            $("#h" + index + "j").html(dayNumberOfTheMonth + " de " + dayMonthOfTheYear);

        } else {generatedIdsElementsCompleteDate
            generatedIdsElementsCompleteDate.push("#h" + index+ "2")

            $("#h" + index + "2").html(dayNumberOfTheMonth + " de " + dayMonthOfTheYear);

            if(generatedIdsElementsCompleteDate.length==HISTORIC_NUMBER_DAYS){
                return generatedIdsElementsCompleteDate
            }
    
        }
    }
 
}

function hideShowForecastDays(){
    var generatedIdsElements=[];
    for (let index = FORECAST_NUMBER_DAYS; index < MAX_FORECAST_NUMBER_DAYS; index++) {
        $("#col"+index+index).css("display", "none");
        generatedIdsElements.push("#col"+index+index);
        if(generatedIdsElements.length==MAX_FORECAST_NUMBER_DAYS){
            return generatedIdsElements.sort()
        }
    }

    for (let index2 = 0; index2 <= FORECAST_NUMBER_DAYS-1; index2++) {
        $("#col"+index2+index2).css("display", "block");
        generatedIdsElements.push("#col"+index2+index2);
        if(generatedIdsElements.length==MAX_FORECAST_NUMBER_DAYS){
            return generatedIdsElements.sort()
        }
    }
}

function hideShowHistoricDays(){
    var generatedIdsElements=[];
    for (let index = HISTORIC_NUMBER_DAYS; index < MAX_HISTORIC_NUMBER_DAYS; index++) {
        $("#col"+index).css("display", "none");
        generatedIdsElements.push("#col"+index);
        if(generatedIdsElements.length==MAX_HISTORIC_NUMBER_DAYS){
            return generatedIdsElements.sort().reverse()
        }
    }

    for (let index2 = 0; index2 <= HISTORIC_NUMBER_DAYS-1; index2++) {
        $("#col"+index2).css("display", "block");
        generatedIdsElements.push("#col"+index2);
        if(generatedIdsElements.length==MAX_HISTORIC_NUMBER_DAYS){
            return generatedIdsElements.sort().reverse()
        }
    }


}


function getNowTimestamp(){
    let todayDate = new Date()
    let timeStampDay= Math.round(todayDate.getTime() / 1000);
    return timeStampDay;
}

exports.testFunc = testFunc;
exports.getNowTimestamp = getNowTimestamp
exports.hideShowHistoricDays = hideShowHistoricDays
exports.hideShowForecastDays = hideShowForecastDays
exports.setHistoricDaysNames = setHistoricDaysNames
exports.setForecastDaysNames = setForecastDaysNames
exports.setTodayData = setTodayData
exports.setImageDayTemperature = setImageDayTemperature
exports.setLabelTodayDayTemperature = setLabelTodayDayTemperature
exports.setLabelDayTemperature = setLabelDayTemperature
exports.testsetTodayData = testsetTodayData


//*********The next importation is for unitary tests purposes only********* 
const OPENWEATHER_APP_ID = "8af2762f745c2900c429020e1f75df97";
const TODAY_IMG_TEMPERATURE_ID_ELEMENT = "120917"
const TODAY_TEMPERATURE_ID_ELEMENT = "pTemp"

// const core_functions = require('../js/core-functions.js')

function httpTodayRequest(city) {
    let cityRequest = city
    let Http = new XMLHttpRequest();
    let urlRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityRequest.latitude + '&lon=' + cityRequest.longitude + '&units=metric&appid=' + OPENWEATHER_APP_ID;

    Http.open("GET", urlRequest);
    Http.send();
    let responseRequest;
    let imageId=TODAY_IMG_TEMPERATURE_ID_ELEMENT;
    let pID=TODAY_TEMPERATURE_ID_ELEMENT;
    let actualDayTemperature;

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            responseRequest = JSON.parse(Http.responseText)
            actualDayTemperature = Math.round(Number(responseRequest["current"].temp))
            setImageDayTemperature(imageId, actualDayTemperature)
            setLabelTodayDayTemperature(pID, actualDayTemperature)
        }
    }
}

//A request can either be a forecastRequest or a historicRequest, it defines the structure of the requests URL
function httpForecastRequest(city) {
    let cityRequest = city
    let Http = new XMLHttpRequest();
    let urlRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityRequest.latitude + '&lon=' + cityRequest.longitude + '&units=metric&appid=' + OPENWEATHER_APP_ID;

    Http.open("GET", urlRequest);
    Http.send();
    let responseRequest;
    let imageId;
    let actualDayTemperature;

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4 && Http.status == 200) {
            responseRequest = JSON.parse(Http.responseText)
            for (let index = 1; index <= FORECAST_NUMBER_DAYS; index++) {
                imageId = (index - 1).toString() + (index - 1).toString()
                
                actualDayTemperature = Math.round(Number(responseRequest["daily"][index].temp.day))
                
                setImageDayTemperature(imageId, actualDayTemperature)
                setLabelDayTemperature(imageId, actualDayTemperature)
            }
        }
    }
}

function testhttpForecastRequest(){
    let cityTest = new City(0) 
    return httpForecastRequest(cityTest)
}


function httpHistoricRequest(city, dayTimeStamp) {
    let cityRequest = city
    var historicDayTimeStamp;

    for (let index = 0; index < HISTORIC_NUMBER_DAYS; index++) {
        historicDayTimeStamp = dayTimeStamp - (84400 * (index + 1)) //Generating timestamps for previous days
        let Http = new XMLHttpRequest();
        let urlRequest = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=' + cityRequest.latitude + '&lon=' + cityRequest.longitude + '&dt=' + historicDayTimeStamp + '&units=metric&appid=' + OPENWEATHER_APP_ID;
        Http.open("GET", urlRequest);
        Http.send();
        let responseRequest;
        let imageId;
        let actualDayTemperature;
        Http.onreadystatechange = (e) => {

            if (Http.readyState == 4 && Http.status == 200) {
                responseRequest = JSON.parse(Http.responseText);
                actualDayTemperature=Math.round(Number(responseRequest["hourly"][0].temp));
                imageId=index;
                setImageDayTemperature(imageId, actualDayTemperature)
                setLabelDayTemperature(imageId, actualDayTemperature)


            }

        }

    }
}

//*********End of importation is for unitary tests purposes only*********













