import React from 'react';
//import the store
import { Store } from "../../components/Store/Store";
import { useCustomHook } from "../../components/CustomHookStore/CustomHookStore";


export const PresentWeather = ( ) => { 
    const { state } = React.useContext(Store);
    const [name] = useCustomHook();
    
 
    if ( state.weatherData.hasOwnProperty("location")) {
        state.weatherData.hasOwnProperty("location");
        console.log(state.weatherData.hasOwnProperty("location"));
        return (
            <div className="details">
                <h3>Hello, { name }!</h3>
                {/* <h4>Your { days } day weather forecast look like this:</h4> */}
                <h2>{state.weatherData.location.name} <span>{state.weatherData.location.country}</span> </h2>

                <p>{state.weatherData.location.localtime}</p>

                <div className="current">

                    <p>{state.weatherData.current.temperature}°F</p>
                    <img src={state.weatherData.current.weather_icons[0]} />

                </div>
                <div>
                    <p>{state.weatherData.current.weather_descriptions}</p>
                </div>
            </div>)

    } else {
        return(<div>
            <p>There is nothing to search for</p>
        </div>)
    }

}