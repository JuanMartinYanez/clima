var ciudades = ["Cuenca", "Buenos Aires", "New York", "Guayaquil", "Quito", "Dubai", "Montevideo", "Santiago", "Mexico", "Sidney"];

var latCiudades = ["-2.897695", "-34.595398", "40.798656", "-2.194350", "-0.176383", "25.096995", "-34.830600", "-33.458725", "19.429531", "-33.879129"]
var lonCiudades = ["-79.005055", "-58.495108", "-73.952968", "-79.892224", "78.480021", "55.174138", "-56.203491", "-70.639491", "-99.134102", "151.206602"]
var days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",]

var today = new Date();

var dayName = days[today.getDay()];
var monthName = months[today.getMonth()];
var dayNumber = today.getDate()

var valueCiudad = "Cuenca";
var valuePrevDays = 5;
var valuePostDays = 7;

var flag=0;

$(document).ready(function () {

    AOS.init({
        once: true
    }  
    );

    $("#select1").on("change", function () {
        valueCiudad = this.value
    });

    $("#select2").on("change", function () {
        valuePrevDays = Number(this.value)
    });


    $("#select3").on("change", function () {
        valuePostDays = Number(this.value)
    });

    $("#bGenerar").click(function () {
        setTempDays();
    });


    setDaysNames(dayNumber);

    $("#pTempGeneral").html(dayName + ", " + dayNumber + " de " + monthName);


    setTempDays()


});

function setDaysNames(dayNumber) {

    var dayNumber1 = dayNumber;
    var dayNumber2 = dayNumber;


    var dayDate1 = new Date()
    var dayDate2 = new Date()


    for (let index = 0; index < 5; index++) {
        if (dayNumber1 == 0) {
            dayNumber1 = 6
        } else {
            dayNumber1 = dayNumber1 - 1
        }
        $("#h" + index).html(days[dayNumber1]);

        dayDate1.setDate(today.getDate() - (index + 1))

        let dia1 = dayDate1.getDate()
        let mes1 = months[dayDate1.getMonth()]


        if (index == 2) {
            $("#h" + index + "j").html(dia1 + " de " + mes1);
        } else {
            $("#h" + index + "2").html(dia1 + " de " + mes1);
        }



    }

    for (let index = 0; index < 7; index++) {
        if (dayNumber2 == 6) {
            dayNumber2 = 0
        } else {
            dayNumber2 = dayNumber2 + 1
        }

        $("#h" + index + index).html(days[dayNumber2]);

        dayDate2.setDate(today.getDate() + (index + 1))

        let dia2 = dayDate2.getDate()
        let mes2 = months[dayDate2.getMonth()]

        $("#h" + index + index + "2").html(dia2 + " de " + mes2);

    }
};

function setTempDays() {


    $("#pTempGeneral2").html(valueCiudad);

    let indexCiudad = ciudades.findIndex(fruit => fruit === valueCiudad);

    let latitudCiudad = latCiudades[indexCiudad]

    let longitudCiudad = lonCiudades[indexCiudad]


    hideShowDays(valuePostDays,"post")

    hideShowDays(valuePrevDays,"prev")
    
    if(flag!=0){
        var elmnt = document.getElementById("img120917");
        elmnt.scrollIntoView();
    } else{
        flag=1
    }

   
    

    let Http = new XMLHttpRequest();
    let urlForecast = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitudCiudad + '&lon=' + longitudCiudad + '&units=metric&appid=8af2762f745c2900c429020e1f75df97';


    Http.open("GET", urlForecast);

    Http.send();

    var response1;
    var centTemp1;
    Http.onreadystatechange = (e) => {

        if (Http.readyState == 4 && Http.status == 200) {

            response1 = JSON.parse(Http.responseText)

            centTemp1 = Math.round(Number(response1["current"].temp))

            setImageDay("120917", centTemp1)

            $("#pTemp").html(centTemp1 + `<span class="span-clima">&#176;</span>` + "C");

            var tempPost;
            

            for (let index = 1; index < valuePostDays; index++) {
                var dateTest = new Date(response1["daily"][index].dt * 1000);

                tempPost=Math.round(Number(response1["daily"][index].temp.day)) 
                let idImg=(index-1).toString()+(index-1).toString()

                setImageDay(idImg, tempPost)

                $("#p" + (index-1)+ (index-1)).html(tempPost + `<span class="span-clima">&#176;</span>` + "C");
            }
        }
    }

    var urlPrevious;
    var todayDate = new Date()
    var timeStampDay= Math.round(todayDate.getTime() / 1000);


    var variableTimeStamp;

    var tempPrev;

    for (let index2 = 0; index2 < valuePrevDays; index2++) {

        variableTimeStamp=timeStampDay-(84400*(index2+1))

        let Http2 = new XMLHttpRequest();
        urlPrevious = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='+ latitudCiudad + '&lon=' + longitudCiudad +'&dt='+variableTimeStamp+'&units=metric&appid=8af2762f745c2900c429020e1f75df97';
        
        let response2;
        let centTemp2;

        Http2.open("GET", urlPrevious);

        Http2.send();

        Http2.onreadystatechange = (e) => {

            if (Http2.readyState == 4 && Http2.status == 200) {

                response2 = JSON.parse(Http2.responseText)

                tempPrev=Math.round(Number(response2["hourly"][0].temp)) 

                setImageDay(index2, tempPrev)

                $("#p"+(index2)).html(tempPrev + `<span class="span-clima">&#176;</span>` + "C");
            }
        }
    }
};

function setImageDay(id, temp){

    if(temp<=0){
        $("#img"+id).attr("src","\images/state1.svg");

    }
    if(temp<=10&&temp>0){
        $("#img"+id).attr("src","\images/state2.svg");

    }else if(temp<=20&&temp>10){
        $("#img"+id).attr("src","\images/state3.svg");
    }else if(temp<=30&&temp>20){
        $("#img"+id).attr("src","\images/state4.svg");
    }else{
        $("#img"+id).attr("src","\images/state5.svg");
    }



}

function hideShowDays(idInicio, flag){

    if(flag=="prev"){
        for (let index = idInicio; index < 5; index++) {
            $("#col"+index).css("display", "none");
        }

        for (let i = 0; i < idInicio-1; i++) {
            $("#col"+i).css("display", "block");
        }
        
    }else{
        for (let j = idInicio; j < 7; j++) {
            $("#col"+j+j).css("display", "none");
        }

        for (let k = 0; k < idInicio-1; k++) {
            $("#col"+k+k).css("display", "block");
        }
    }

}




