import React, { useState, useEffect, useRef } from 'react'
import { useGlobalContext } from '../Context';
export default function HourlyWeather({ newTime, icon, tempC }) {

    const { transX } = useGlobalContext();
    const container = useRef(null)

    useEffect(() => {
        const transForm = container.current
        transForm.style.transform = `translateX(${transX}%)`

    }, [transX])
    return (
        <div className={`forecast-timeline `} ref={container} >
            <h3>{newTime}:00</h3>
            <img src={icon} />
            <h3>{tempC}°C</h3>
        </ div>
    )
}