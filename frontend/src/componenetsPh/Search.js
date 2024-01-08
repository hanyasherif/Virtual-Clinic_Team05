import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import MedicineDetailsLite from './MedicineDetailsLite';

const Search = () => {

    const [search, setSearch] = useState("");
    const [medicines, setMedicines] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`/Search?name=${search}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        console.log(json);
        if(!response.ok){
            alert("error");
            return;
        }
        else{
            setMedicines(json);
        }
    }

    return(
        <div className="search">
            <form className= "create" onSubmit={handleSubmit}>
                <label>Search</label>
                <input type="text" placeholder="Enter Medicine Name" value={search} onChange={(e) => setSearch(e.target.value)}/>

                <button>Search</button>

                {medicines && (
                    <div>
                        {medicines.map((medicine) => (
                            <MedicineDetailsLite key={medicine._id} medicine={medicine} />
                        ))}
                    </div>
                )}
                
            </form>
        </div>
    )
}

export default Search;