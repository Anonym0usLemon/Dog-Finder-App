import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Dog from "./Dog";
import FilterButton from "./Filter/FilterButton";
import Pagination from "./Pagination/Pagination";
import "./Homepage.scss"; 

const Homepage = () => {
  const [dogs, setDogs] = useState([]);
  const [url, setUrl] = useState(
    "https://frontend-take-home-service.fetch.com/dogs/search"
  );
  const [pagination, setPagination] = useState({
    total: 0,
    nextLink: "",
    prevLink: "",
  });

  // Search parameters
  let searchParams = "";
  function getSearchParams(formData) {
    console.log(formData);
    searchParams = `?${formData.zip}${
      formData.breed !== "" ? `&breeds=${formData.breed}` : ""
    }${formData.age !== "" ? `&${formData.age}` : ""}`;
    setUrl(
      `https://frontend-take-home-service.fetch.com/dogs/search/${searchParams}`
    );
  }

  // Pagination
  function getPagination(paginate) {
    console.log(paginate)
  }

  // Get app data
  useEffect(() => {
    const fetchDogs = async () => {
      console.log(url);

      try {
        // Gets dog IDs
        const response = await axios.get(url, {
          withCredentials: true,
        });

        const dogIds = response.data.resultIds;

        setPagination({
          total: response.data.total,
          nextLink: response.data.next,
          prevLink: response.data.prev,
        });


        // Uses dog IDs to get dog objects
        const dogs = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          dogIds,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setDogs(dogs.data);
      } catch (error) {
        console.error("Error fetching dogs: *sad bark sounds*", error);
      }
    };

    fetchDogs();
  }, [url]);

  

  return (
    <div className="home">
      <FilterButton parseData={getSearchParams} />

      {dogs.length > 0 ? (
        dogs.map((dog) => <Dog key={dog.id} dog={dog} />)
      ) : (
        <p>No results found</p>
      )}

      <Pagination paginationInfo={pagination} pagination={getPagination}/>
    </div>
  );
};

export default Homepage;
