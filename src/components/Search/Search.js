import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
    const [dogs, setDogs] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        console.log("Component did mount");

        const fetchDogs = async () => {
            try {
                const response = await axios.get("https://frontend-take-home-service.fetch.com/dogs/search?ageMin=5", {
                    withCredentials: true,
                })
                console.log(response); 

                }
 
            catch (error) {
                console.error("Error fetching dogs: ", error);
            }
        }

        fetchDogs(); 
    }, []);

    return (
        <>
            <p>You're Home!</p>
        </>
    );
}

export default Search; 