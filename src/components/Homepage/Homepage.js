import { useEffect, useState } from "react";
import axios from "axios";
import Dog from "./Dog";
import FilterButton from "./Filter/FilterButton";
import Pagination from "./Pagination/Pagination";
import "./Homepage.scss";
import AscSymbol from "../../assets/AscSymbol";
import DescSymbol from "../../assets/DescSymbol";
import Match from "../Match/Match";

const Homepage = (props) => {
  const [dogs, setDogs] = useState([]);
  const [url, setUrl] = useState("");

  const [pagination, setPagination] = useState({
    total: 0,
    nextLink: "",
    prevLink: "",
  });

  const [queryObject, setQueryObject] = useState({
    sortOrder: "sort=breed:asc",
    zip: "",
    breed: "",
    age: "",
    pagination: "",
  });

  const [selectedDogs, setSelectedDogs] = useState([]);

  function handleDogSelection(event) {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedDogs([...selectedDogs, value]);
    } else {
      setSelectedDogs(selectedDogs.filter((item) => item !== value));
    }
  }

  const [match, setMatch] = useState(null);

  useEffect(() => {
    async function findMatch() {
      try {
        const getMatches = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs/match",
          selectedDogs,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const data = [getMatches.data.match];

        const getMatch = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setMatch(getMatch.data);
      } catch (error) {
        console.error("Error fetching dogs", error);
      }
    }

    if (props.matchTrigger && selectedDogs.length > 1) {
      findMatch();
    } else {
      props.resetMatch(); 
    }

  }, [props.matchTrigger]);


  // Reset Matches 
  function resetMatch() {
    setMatch(null);
    setSelectedDogs([]);
    props.resetMatch(); 
  }

  // Sort Order
  function sortHandler() {
    const newOrder =
      queryObject.sortOrder === "sort=breed:asc"
        ? "sort=breed:desc"
        : "sort=breed:asc";
    setQueryObject((prevState) => ({ ...prevState, sortOrder: newOrder }));
  }

  // Search parameters
  function getSearchParams(formData) {
    let breed = "";
    if (formData.breed !== "") {
      breed = `&breeds=${formData.breed}`;
    }

    setQueryObject((prevState) => ({
      ...prevState,
      zip: formData.zip,
      breed: breed,
      age: formData.age,
    }));
  }

  // Pagination
  function getPagination(paginate) {
    
    
    if (paginate === "next" && pagination.nextLink) {      
      const size = pagination.nextLink
      .split("&")
      .find((item) => item.includes("size"));
      
      const from = pagination.nextLink
      .split("&")
      .find((item) => item.includes("from"));

      const nextLink = "&" + size + "&" + from;
      setQueryObject((prevState) => ({ ...prevState, pagination: nextLink }));
    }
    

    if (paginate === "prev" && pagination.prevLink) {
      console.log(pagination.prevLink); 
      let prevSize = pagination.prevLink
        .split("&")
        .find((item) => item.includes("size"));
      let prevFrom = pagination.prevLink
        .split("&")
        .find((item) => item.includes("from"));
      const prevLink = "&" + prevSize + "&" + prevFrom;
      setQueryObject((prevState) => ({ ...prevState, pagination: prevLink }));
    }
  }

  // Assemble the URL
  function buildUrl() {
    const baseUrl = "https://frontend-take-home-service.fetch.com/dogs/search";
    const searchParams = `?${queryObject.sortOrder}${queryObject.zip}${queryObject.breed}${queryObject.age}${queryObject.pagination}`;
    setUrl(baseUrl + searchParams);
  }

  // Watch for changes in query object and update URL
  useEffect(() => {
    buildUrl();
  }, [queryObject]);

  // Get dogs
  useEffect(() => {
    const fetchDogs = async () => {
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
        console.error("Error fetching dogs: ", error);
      }
    };

    fetchDogs();
  }, [url]);

  return (
    <div className="home">
      {match && <Match dog={match[0]} reset={resetMatch}/>}
      <div className="filters">
        <FilterButton className="filter-button" parseData={getSearchParams} />
        <button className="sort-button" onClick={sortHandler}>
          {queryObject.sortOrder === "sort=breed:asc" ? (
            <DescSymbol />
          ) : (
            <AscSymbol />
          )}
        </button>
      </div>

      <div className="search-results">
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <Dog key={dog.id} dog={dog} match={handleDogSelection} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>

      <Pagination paginationInfo={pagination} pagination={getPagination} />
    </div>
  );
};

export default Homepage;
