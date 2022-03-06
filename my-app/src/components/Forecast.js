import React, { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useGlobalContext } from "../Context"
import HourlyWeather from "./HourlyWeather"
import DailyWeather from "./DailyWeather";
import Loading from "./Loading"

// import { Carousel } from '@trendyol-js/react-carousel';
export default function Forecast() {
    const { location, dailyForecast, currentForecast, hourlyForecast, transX, setTransX, loading } = useGlobalContext()

    if (loading) {
        return (
            < Loading></Loading>
        )
    }
    if (currentForecast === null || location === null || dailyForecast === null || hourlyForecast === null) {
        return (
            <section className="section">

                <h2 className='section-title'>
                    No location matched your search
                </h2>
            </section>
        )
    }
    const { city, country, date, time } = location
    const { tempC, text, icon } = currentForecast

    // const newTransx = 0
    const nextHours = () => {
        setTransX(transX - 170)
        console.log(transX)
    }
    const preHours = () => {
        setTransX(transX + 170)
    }
    return (
        <section className=" section">
            <article className="forecast-container flex">
                <div className="forecast-location">
                    <h3>{city} {country}</h3>

                    <h3>{time}</h3>
                    <h3>{date}</h3>

                </div>
                <div className="forecast-detail">

                    <div className="weather-img">
                        <img src={icon} alt={text} />
                    </div>
                    <h3>{tempC}°C</h3>
                    <h3>{text}</h3>
                </div>
            </article >
            <div className="underline"></div>
            <article className="forecast-container flex">


                {hourlyForecast.map((item, indexItem) => {



                    return <HourlyWeather key={indexItem} {...item} />

                })}
                <button onClick={preHours} className="pre-btn" style={{ display: `${transX >= 0 ? "none" : "block"}` }} >
                    <FaChevronLeft />
                </button>
                <button onClick={nextHours} className="next-btn" style={{ display: `${transX <= -2550 ? "none" : "block"}` }}>
                    <FaChevronRight />
                </button>
            </article>
            <div className="underline"></div>
            <article className="forecast-container">
                {/* <DailyWeather /> */}
                {dailyForecast.map((item, index) => {

                    return <DailyWeather key={index} {...item} />
                })}
            </article>
        </section >
    )
}