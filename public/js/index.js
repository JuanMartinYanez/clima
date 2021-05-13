const city = new City(CITY_POSITION);


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


function testsetSelectsListeners(){
    
    let selectedCityName="Prueba"
//    let selectedCityName= $("#select1 :selected").val()

//    let selectedNumberOfHistoricDays= Number($("#select2 :selected").val())
//    testsetSelectsListenersResults.push(selectedCityName)
//    let selectedNumberOfForecastDays= Number($("#select3 :selected").val())
//    testsetSelectsListenersResults.push(selectedCityName)

   return selectedCityName
}

// exports.testsetSelectsListeners = testsetSelectsListeners

function setNewData(){
    var citiNewData = new City(CITY_POSITION)
    setTodayData(citiNewData)
    httpForecastRequest(citiNewData)
    httpHistoricRequest(citiNewData,getNowTimestamp())
    setForecastDaysNames();
    hideShowForecastDays();
    setHistoricDaysNames();
    hideShowHistoricDays();
    scrollToResultsZone()
}








