//For future use - adding a bio page for each dog

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DogDetails = () => {
    const { id } = useParams(); 
    const dogId = [id]; 

    const [dogInfo, setDogInfo] = useState();

    useEffect(() => {
        async function getDogInfo() {
            try {
                const response = await axios.post("https://frontend-take-home-service.fetch.com/dogs", dogId, {
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    withCredentials: true
                });

                setDogInfo(response.data[0]); 
            }
            catch(error) {
                console.log("Error fetching dog data: *sad bark* " + error)
            }
        }

        getDogInfo(); 
    }, []);

    return (
        <div className="dog-details">
            {dogInfo ? <h1>Dog Details - {dogInfo.name}</h1> : <p>Loading...</p>}
        </div>
    );
}

export default DogDetails;