import React, { useState } from "react";
import axios from "axios";
import './index.css'

export default function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState('');

    const searchLocation = (event) => {
        const trimmedLocation = location.trim();
        if ((event.key === "Enter")) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedLocation}&units=metric&lang=ru&appid=875619ba74aa91c2a603e42a5ba1ede1`;
            console.log(url);
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
            setLocation("");
            console.log(data);
        }
    };


    return (
        <div className="app">
            <div className="search">
                <input
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    placeholder="Введите город"
                    type='text'
                />

            </div>
            <div className='container'>
                <div className='top'>
                    <div className='location'>
                        <p>{data.name}</p>
                    </div>
                    <div className='temp'>
                        {data.main ? <h1>{data.main.temp.toFixed()}</h1> : null}
                    </div>
                    <div className='description'>
                        {data.weather ? <p>{data.weather[0].description}</p> : null}
                    </div>
                </div>
                {data.name !== undefined && (
                    <div className='bottom'>
                        <div className='feels'>
                            {data.main ? (
                                <p className='bold'>{data.main.feels_like.toFixed()}</p>
                            ) : null}
                            <p>Чувствуется как:</p>
                        </div>
                        <div className='humidity'>
                            {data.main ? (
                                <p className='bold'>{data.main.humidity.toFixed()}%</p>
                            ) : null}
                            <p>Влажность:</p>
                        </div>
                        <div className='wind'>
                            {data.wind ? (
                                <p className='bold'>{data.wind.speed.toFixed()}м/c</p>
                            ) : null}
                            <p>Скорость ветра:</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
