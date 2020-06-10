//Variables and constants
const CITIES_NAMES = ["Cuenca", "Buenos Aires", "New York", "Guayaquil", "Quito", "Dubai", "Montevideo", "Santiago", "Mexico", "Sidney"];
const CITIES_LATITUDES = ["-2.897695", "-34.595398", "40.798656", "-2.194350", "-0.176383", "25.096995", "-34.830600", "-33.458725", "19.429531", "-33.879129"];
const CITIES_LONGITUDES = ["-79.005055", "-58.495108", "-73.952968", "-79.892224", "78.480021", "55.174138", "-56.203491", "-70.639491", "-99.134102", "151.206602"];
const WEEK_DAYS_NAMES = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const YEAR_MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const TODAY_IMG_TEMPERATURE_ID_ELEMENT = "120917"
const TODAY_DATE_ID_ELEMENT = "pTempGeneral"
const TODAY_TEMPERATURE_ID_ELEMENT = "pTemp"
const TODAY_CITY_ID_ELEMENT = "pTempGeneral2"
const RESULTS_ZONE_REFERENCE_ID_ELEMENT = "img120917"

var INITIALIZATION_STATE = false;
var HISTORIC_NUMBER_DAYS = 5;
var FORECAST_NUMBER_DAYS = 7;

var MAX_HISTORIC_NUMBER_DAYS = 5;
var MAX_FORECAST_NUMBER_DAYS = 7;

var CITY_POSITION = 0;

//Core classes of the web system
class City {
    latitude;
    longitude;
    name;
    position;
    constructor(position) {
        this.latitude = CITIES_LATITUDES[position];
        this.longitude = CITIES_LONGITUDES[position];
        this.name = CITIES_NAMES[position];
    }
}
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
    $("#"+TODAY_DATE_ID_ELEMENT).html(dayName + ", " + dayNumber + " de " + monthName);
    $("#"+TODAY_CITY_ID_ELEMENT).html(city.name);

    httpTodayRequest(city);
}

function setForecastDaysNames() {
    let todayDate = new Date();
    var dayNumber = todayDate.getDay();

    var dayAndMonthDate= new Date()

    let nextDay;

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

    }
}

function setHistoricDaysNames() {
    let todayDate = new Date();
    var dayNumber = todayDate.getDay();

    var dayAndMonthDate= new Date()

    let previousDay;


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
            $("#h" + index + "j").html(dayNumberOfTheMonth + " de " + dayMonthOfTheYear);
        } else {
            $("#h" + index + "2").html(dayNumberOfTheMonth + " de " + dayMonthOfTheYear);
        }
    }
 
}

function hideShowForecastDays(){
    for (let index = FORECAST_NUMBER_DAYS; index < MAX_FORECAST_NUMBER_DAYS; index++) {
        $("#col"+index+index).css("display", "none");
    }

    for (let index2 = 0; index2 <= FORECAST_NUMBER_DAYS-1; index2++) {
        $("#col"+index2+index2).css("display", "block");
    }
}

function hideShowHistoricDays(){
    for (let index = HISTORIC_NUMBER_DAYS; index < MAX_HISTORIC_NUMBER_DAYS; index++) {
        $("#col"+index).css("display", "none");
    }

    for (let index2 = 0; index2 <= HISTORIC_NUMBER_DAYS-1; index2++) {
        $("#col"+index2).css("display", "block");
    }
}


function getNowTimestamp(){
    let todayDate = new Date()
    let timeStampDay= Math.round(todayDate.getTime() / 1000);
    return timeStampDay;
}













