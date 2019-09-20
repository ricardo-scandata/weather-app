import React, { useState, useEffect } from 'react';
//import the store
import { Store } from "../../components/Store/Store";
import {  useCustomHook } from "../../components/CustomHookStore/CustomHookStore";



export const Form = () => {

    //grant access to the data inside our context provider
    const { dispatch } = React.useContext(Store);

    // const [name, setName] = useState("");  <============= This only collect state locally
    const [name, setName] = useCustomHook(); // <=========== Custom hook let you share state, Awesome!
    // const [days, setDays] = useCustomHook(); 

    const [days, setDays] = useState("");
    const [city, setCity] = useState("");
    const [setConditions] = useState("");


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


    return (
        <form onSubmit={getWeatherInfo}>
            <div className="control">
                <input type="text" name="name" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                <input type="text" name="zipcode" placeholder="City or ZipCode to check weather" onChange={e => setCity(e.target.value)} />
                <input type="text" name="days" placeholder="Choose up to 14 days of forecast from today" onChange={e => setDays(e.target.value)} />
            </div>
            <input type="submit" value="Check Weather" />
        </form>
    )
}