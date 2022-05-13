import React from "react";
import Forecast from "../components/Forecast"
import SearchForm from "../components/SearchForm";

export default function Home() {
    return <main>
        <SearchForm></SearchForm>
        <Forecast></Forecast>
    </main>
}