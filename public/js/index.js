
$(document).ready(function () {   
    //Animations initialization 
    AOS.init({
        once: true
    }  
    );

    // Initialize dafaulta data, default city: Cueca
    initializeDefaultData();

    //Set selects listeners
    setSelectsListeners();

    $("#bGenerar").click(function () {
        setNewData();
    });


});


function initializeDefaultData(){
    let cityDefault = new City(0);
    setTodayData(cityDefault)
    httpForecastRequest(cityDefault)
    httpHistoricRequest(cityDefault,getNowTimestamp())
    setForecastDaysNames();
    setHistoricDaysNames();
    INITIALIZATION_STATE=true
}

function setSelectsListeners(){
    $("#select1").on("change", function () {
    CITY_POSITION = CITIES_NAMES.findIndex(city => city === this.value)
    });

    $("#select2").on("change", function () {
        HISTORIC_NUMBER_DAYS = Number(this.value)
    });


    $("#select3").on("change", function () {
        FORECAST_NUMBER_DAYS = Number(this.value)
    });
}

function setNewData(){
    let city = new City(CITY_POSITION);
    setTodayData(city)
    httpForecastRequest(city)
    httpHistoricRequest(city,getNowTimestamp())
    setForecastDaysNames();
    hideShowForecastDays();
    setHistoricDaysNames();
    hideShowHistoricDays();
    scrollToResultsZone()
}








