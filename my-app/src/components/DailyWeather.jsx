import React, { useState } from 'react';

export default function DailyWeather({ date, maxtemp_c, mintemp_c, text, icon }) {

    return (
        <div className="forecast-daily">
            <h3>{date}</h3>
            <img src={icon} />
            <h3>{text}</h3>
            <h3>{maxtemp_c}/{mintemp_c}°C</h3>
        </div>
    )
}