import React, { useEffect } from 'react';
import { PresentWeather } from "../../components/Weather/Weather";
import { Form } from "../../components/Form/Form";


const Main = () => {
  
    useEffect(() => {
        document.title = `Weather App`;
    });

    return (
        <React.Fragment>
            <Form />
            <PresentWeather />
        </React.Fragment>
    );
}

export default Main;