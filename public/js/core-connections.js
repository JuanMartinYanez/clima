const OPENWEATHER_APP_ID = "8af2762f745c2900c429020e1f75df97";

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


