const CITIES_NAMES = ["Cuenca", "Buenos Aires", "New York", "Guayaquil", "Quito", "Dubai", "Montevideo", "Santiago", "Mexico", "Sidney"];
const CITIES_LATITUDES = ["-2.897695", "-34.595398", "40.798656", "-2.194350", "-0.176383", "25.096995", "-34.830600", "-33.458725", "19.429531", "-33.879129"];
const CITIES_LONGITUDES = ["-79.005055", "-58.495108", "-73.952968", "-79.892224", "78.480021", "55.174138", "-56.203491", "-70.639491", "-99.134102", "151.206602"];

class City {
    constructor(position) {
        this.latitude = CITIES_LATITUDES[position];
        this.longitude = CITIES_LONGITUDES[position];
        this.name = CITIES_NAMES[position];
    }
}

module.exports = City