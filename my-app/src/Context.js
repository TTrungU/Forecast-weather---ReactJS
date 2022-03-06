
import React, { useState, useContext, useEffect } from "react";
import { useCallback } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Ha noi');
    const [dailyForecast, setDailyForecast] = useState([]);
    const [location, setLocation] = useState([]);
    const [currentForecast, setCurrentForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [transX, setTransX] = useState(0)


    // const trans = 0

    // const upTrans = (trans_X) => {
    //     trans_X -= 100;
    //     setTransX(trans_X)
    //     // setTransX(trans)
    //     console.log(trans)
    // }
    const getHourly = (currentTime, hourListToday, hourListTomorow, index) => {
        // console.log(currentTime)
        let dateFormated = new Date(currentTime)
        let currentHour = dateFormated.getHours()
        // console.log(currentHour)

        // console.log(hourListToday.slice(currentHour - 1, 24), hourListTomorow)

        let newHourList = hourListToday.slice(currentHour, 24)

        for (let i = 0; i < currentHour; i++) {
            newHourList.push(hourListTomorow[i])
        }
        // console.log(newHourList)
        return newHourList

    }
    const fetchForecast = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${searchTerm}&days=3`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
                    "x-rapidapi-key": "88715da278msh1ecd8d8c06e202ep19ec41jsn96d736bd86d0"
                }
            })
            const data = await response.json()
            // console.log(data.location.localtime, "data")
            if (data.location) {
                let { country: country, localtime: localtime, name: city } = data.location
                // console.log(country, localtime, city)
                let time = localtime.substring(0, 10)
                let date = localtime.substring(11, 16)
                setLocation({ country, time, date, city })
                // console.log({ country, time, date, city })

            } else {
                setLocation(null)
            }
            if (data.current) {
                let { temp_c: tempC, condition } = data.current
                let { text: text, icon: icon } = condition
                // console.log(tempC, text, icon)
                tempC = Math.round(tempC)
                setCurrentForecast({ tempC, text, icon })
            } else {
                setCurrentForecast(null)
            }
            if (data.forecast) {
                let { hour: hourListToday } = data.forecast.forecastday[0]
                let { hour: hourListTomorrow } = data.forecast.forecastday[1]

                let { localtime: currentTime } = data.location
                let HourlyList = getHourly(currentTime, hourListToday, hourListTomorrow)
                setHourlyForecast(HourlyList.map((item, index) => {
                    let { temp_c: tempC, condition, time } = item
                    let { icon } = condition
                    let newTime = new Date(time).getHours()
                    tempC = Math.round(tempC)
                    return { tempC, icon, newTime, index }
                }))
                // console.log(data.forecast.forecastday)
                setDailyForecast(data.forecast.forecastday.map((item) => {
                    let { date, day } = item
                    let { maxtemp_c, mintemp_c, condition } = day
                    let { text, icon } = condition
                    // date = date.substring(5, 10)
                    mintemp_c = Math.round(mintemp_c)
                    maxtemp_c = Math.round(maxtemp_c)
                    // console.log({ date, maxtemp_c, mintemp_c, text, icon })
                    return ({ date, maxtemp_c, mintemp_c, text, icon })
                }))
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }, [searchTerm])
    useEffect(() => {

        fetchForecast();
        // console.log("check")
    }, [searchTerm, fetchForecast])
    return <AppContext.Provider value={{
        dailyForecast,
        loading,
        setSearchTerm,
        location,
        currentForecast,
        hourlyForecast,
        searchTerm,
        transX,
        setTransX,

    }} >
        {children}
    </AppContext.Provider>
}

////////////////////////////////////////////////////////////////////////
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }