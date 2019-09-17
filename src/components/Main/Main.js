import React, { useState, useEffect } from 'react';
//import the store
import { Store } from "../../components/Store/Store";


const Main = () => {

    //grant access to the data inside our context provider
    const { state, dispatch } = React.useContext(Store);

    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [days, setDays] = useState(0);
    const [conditions, setConditions] = useState("");


    const getWeatherInfo = (e) => {
        e.preventDefault();

        if (city === "" || city === undefined) {
            console.log("nothing to look for")
        } else {
            fetchWeather(city).then(res => {
                console.log("Fetched results");
                setConditions(true);

            }).catch(err => {
                console.log(err);
            });
        }
    };


    //fetch request to weather api
    const fetchWeather = async (city) => {
        const data = await fetch(`http://api.weatherstack.com/current?access_key=aafbb9eba982d2ba2a9d20fc7aad6436&query=${city}&units=f&forecast_days=7`);
        const dataJSON = await data.json();

        //------------ if there is a bad request this next line of code will return true
        //------------ since the json object will contain a property called error
        console.log(dataJSON.hasOwnProperty("error"));

        //return the action dispatch
        return dispatch({
            type: "FETCH_DATA",
            payload: dataJSON
        });

    };


    const weatherConditions = conditions;
    let elem = "";
    let elem2 = "";

    //---------- check that the weatherData has the property location
    //---------- if there is an error, then the property location will not exist and 
    //---------- react will return an error
    if (weatherConditions && state.weatherData.hasOwnProperty("location")) {
        state.weatherData.hasOwnProperty("location");
        console.log(state.weatherData.hasOwnProperty("location"));
        elem =
            <div className="details">
                <h3>Hello, {name}!</h3>
                <h4>Your {days} day weather forecast look like this:</h4>
                <h2>{state.weatherData.location.name} <span>{state.weatherData.location.country}</span> </h2>

                <p>{state.weatherData.location.localtime}</p>

                <div className="current">

                    <p>{state.weatherData.current.temperature}°F</p>
                    <img src={state.weatherData.current.weather_icons[0]} />

                </div>
                <div>
                    <p>{state.weatherData.current.weather_descriptions}</p>
                </div>

            </div>

    } else {
        elem = <div>
            <p>There is nothing to search for</p>
        </div>
    }

    return (
        <React.Fragment>
            {/* console.log the state inside the store */}
            {console.log(state)}

            <form onSubmit={getWeatherInfo}>
                <div className="control">
                    <input type="text" name="name" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                    <input type="text" name="zipcode" placeholder="City or ZipCode to check weather" onChange={e => setCity(e.target.value)} />
                    <input type="text" name="days" placeholder="Choose up to 14 days of forecast from today" onChange={e => setDays(e.target.value)} />
                </div>


                <input type="submit" value="Check Weather" />
            </form>

            {elem}{elem2}
        </React.Fragment>
    );


}


export default Main;