import React from 'react';
import Main from "./components/Main/Main";
import image from "./image1.svg";

function App() {

  return (
    <div className="container">
      <header>
         <h1>Weather Forecast</h1>
      </header>
      <img className="hero" src={image} />
      <main>
        <Main/>
      </main>

    </div>
  );
}

export default App;
