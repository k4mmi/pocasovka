// API
// https://open-meteo.com/en/docs?hourly=&current=temperature_2m,is_day#hourly_weather_variables

import { fetchWeatherApi } from "openmeteo";

export async function weather( _latitude, _longitude ) {

    const params = {
        latitude: _latitude,
        longitude: _longitude,
        current: ["temperature_2m", "is_day"],
        timezone: "auto",
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    console.log("Weather API data.")

    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];

    // Attributes for timezone and location
    const latitude = response.latitude();
    const longitude = response.longitude();
    const elevation = response.elevation();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds ) * 1000),
            // time: new Date((Number(current.time())) * 1000),
            temperature_2m: current.variables(0).value(),
            is_day: current.variables(1).value(),
        },
    };

    return {
        temp: Math.round(weatherData.current.temperature_2m),
        time: weatherData.current.time,
        day: weatherData.current.time
    };
};