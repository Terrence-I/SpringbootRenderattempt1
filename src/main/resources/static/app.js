//Features/veiwcity

function CityData(CityName, CityTemp, CityWind, CityHumid){
    this.name = CityName;
    this.temp = CityTemp;
    this.wind = CityWind;
    this.hum = CityHumid;
};


prevSearch = [];

async function FetchData(Input) {
    const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(Input) + "&count=10&language=en&format=json&countryCode=CA";

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
        const onj = new CityData("Error Cannot find city", "N/a","N/a","N/a");
        prevSearch.push(onj);
        return onj

    }

    const location = geoData.results[0];
    const forecastUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + location.latitude + "&longitude=" + location.longitude + "&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&models=cmc_gem_seamless&forecast_days=7";
    
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const onj = new CityData(location.name ,forecastData.hourly.temperature_2m[0],forecastData.hourly.wind_speed_10m[0], forecastData.hourly.relative_humidity_2m[0]) ;
    prevSearch.push(onj);
    return onj;
}

async function PrevSearchCheck(Input) {
    let Position = prevSearch.find(o => o.name === Input);
    if (Position == undefined){
        const city = await FetchData(Input);
        Position = prevSearch.find(o => o.name === city.name);
    }
    
    return Position;


}

async function SearchFunc10() {
                
                document.getElementById("VarCTemp").textContent = "Finding Best Match";
                document.getElementById("VarCWind").textContent = "Finding Best Match";
                document.getElementById("VarCHum").textContent = "Finding Best Match";            

                const Input = document.getElementById('js-input2').value.trim();
                document.getElementById("VarCName").textContent = "Searching for " + Input;
                const city = await PrevSearchCheck(Input);

                if(!city) {
                    document.getElementById("VarCName").textContent = "City not Found";
                    document.getElementById("VarCTemp").textContent = "Unknown C^o";
                    document.getElementById("VarCWind").textContent = "Unknown km/h";
                    document.getElementById("VarCHum").textContent = "Unknown %";
                    return;
                }
                
                document.getElementById("VarCName").textContent = city.name;
                document.getElementById("VarCTemp").textContent = city.temp + "C^o";
                document.getElementById("VarCWind").textContent = city.wind + "km/h";
                document.getElementById("VarCHum").textContent = city.hum + "%";
                
} 
async function SearchFunc() {
                
                document.getElementById("VarCTemp").textContent = "Finding Best Match";
                document.getElementById("VarCWind").textContent = "Finding Best Match";
                document.getElementById("VarCHum").textContent = "Finding Best Match";            

                const Input = document.getElementById('js-input').value.trim();
                document.getElementById("VarCName").textContent = "Searching for " + Input;
                const city = await PrevSearchCheck(Input);

                if(!city) {
                    document.getElementById("VarCName").textContent = "City not Found";
                    document.getElementById("VarCTemp").textContent = "Unknown C^o";
                    document.getElementById("VarCWind").textContent = "Unknown km/h";
                    document.getElementById("VarCHum").textContent = "Unknown %";
                    return;
                }
                
                document.getElementById("VarCName").textContent = city.name;
                document.getElementById("VarCTemp").textContent = city.temp + "C^o";
                document.getElementById("VarCWind").textContent = city.wind + "km/h";
                document.getElementById("VarCHum").textContent = city.hum + "%";
                
} 
