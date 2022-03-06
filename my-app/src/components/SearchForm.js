import React, { useState } from 'react';
import { useGlobalContext } from '../Context'
export default function SearchForm() {
    const { setSearchTerm, searchTerm } = useGlobalContext()


    const handleSubmit = (e) => {
        e.preventDefault();
        let location = e.target[0].value
        setSearchTerm(location)
    }

    return (
        <section className="section search">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Search your location</label>
                    <input type=""
                        name='name'
                        id='name'
                        placeholder="Ha noi"
                    // value=""
                    // onChange={(e) => setSearchTerm(e.target.value)}

                    />
                    <button type="submit" className="btn">Find</button>
                </div>
            </form>

        </section>
    )
}