import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Dog from "./Dog";
import FilterButton from "./Filter/FilterButton";
import Filter from "./Filter/Filter";

const Homepage = () => {
    const [dogs, setDogs] = useState([]); 

    const searchParams = ""; 
    const url = `https://frontend-take-home-service.fetch.com/dogs/search/${searchParams}`; 


    useEffect(() => {
        const fetchDogs = async () => {
            try {
                // Gets dog IDs 
                const response = await axios.get("https://frontend-take-home-service.fetch.com/dogs/search", {
                    withCredentials: true,
                });

                const dogIds = response.data.resultIds;

                // Uses dog IDs to get dog objects
                const dogs = await axios.post('https://frontend-take-home-service.fetch.com/dogs', dogIds, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, 
                });

                setDogs(dogs.data); 

            } catch (error) {
                console.error("Error fetching dogs: *sad bark sounds*", error);
            }
        }

        fetchDogs(); 
    }, []);

    return (
        <div className="home">
            <FilterButton/>

            {dogs.map((dog) => (
                <Dog dog={dog}/> 
            ))}
        </div>
    );
}

export default Homepage; 