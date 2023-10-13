import { useReducer, useState } from "react";
import CloseIcon from "../../../assets/CloseIcon";
import Modal from "../../UI/Modal";
import "./Filter.scss";

const breeds = [
  "Affenpinscher",
  "Afghan Hound",
  "African Hunting Dog",
  "Airedale",
  "American Staffordshire Terrier",
  "Appenzeller",
  "Australian Terrier",
  "Basenji",
  "Basset",
  "Beagle",
  "Bedlington Terrier",
  "Bernese Mountain Dog",
  "Black-and-tan Coonhound",
  "Blenheim Spaniel",
  "Bloodhound",
  "Bluetick",
  "Border Collie",
  "Border Terrier",
  "Borzoi",
  "Boston Bull",
  "Bouvier Des Flandres",
  "Boxer",
  "Brabancon Griffon",
  "Briard",
  "Brittany Spaniel",
  "Bull Mastiff",
  "Cairn",
  "Cardigan",
  "Chesapeake Bay Retriever",
  "Chihuahua",
  "Chow",
  "Clumber",
  "Cocker Spaniel",
  "Collie",
  "Curly-coated Retriever",
  "Dandie Dinmont",
  "Dhole",
  "Dingo",
  "Doberman",
  "English Foxhound",
  "English Setter",
  "English Springer",
  "EntleBucher",
  "Eskimo Dog",
  "Flat-coated Retriever",
  "French Bulldog",
  "German Shepherd",
  "German Short-haired Pointer",
  "Giant Schnauzer",
  "Golden Retriever",
  "Gordon Setter",
  "Great Dane",
  "Great Pyrenees",
  "Greater Swiss Mountain Dog",
  "Groenendael",
  "Ibizan Hound",
  "Irish Setter",
  "Irish Terrier",
  "Irish Water Spaniel",
  "Irish Wolfhound",
  "Italian Greyhound",
  "Japanese Spaniel",
  "Keeshond",
  "Kelpie",
  "Kerry Blue Terrier",
  "Komondor",
  "Kuvasz",
  "Labrador Retriever",
  "Lakeland Terrier",
  "Leonberg",
  "Lhasa",
  "Malamute",
  "Malinois",
  "Maltese Dog",
  "Mexican Hairless",
  "Miniature Pinscher",
  "Miniature Poodle",
  "Miniature Schnauzer",
  "Newfoundland",
  "Norfolk Terrier",
  "Norwegian Elkhound",
  "Norwich Terrier",
  "Old English Sheepdog",
  "Otterhound",
  "Papillon",
  "Pekinese",
  "Pembroke",
  "Pomeranian",
  "Pug",
  "Redbone",
  "Rhodesian Ridgeback",
  "Rottweiler",
  "Saint Bernard",
  "Saluki",
  "Samoyed",
  "Schipperke",
  "Scotch Terrier",
  "Scottish Deerhound",
  "Sealyham Terrier",
  "Shetland Sheepdog",
];

function formReducer(state, action) {
  // Zip
  if (action.type === "ZIP") {
    return {...state, zip: `zipCodes=${action.value}`};
  }

  // Breed
  if (action.type === "BREED") {
    return {...state, breed: action.value};
  }

  // Age  
  if (action.type === "AGE") {

    if (action.value === "puppy") {
      return {...state, age: "ageMax=2"}
    }

    if (action.value === "young") {
      return {...state, age: "ageMin=2&ageMax=5"}
    }

    if (action.value === "adult") {
      return {...state, age: "ageMin=5&ageMax=7"}
    }

    if (action.value === "senior") {
      return {...state, age: "ageMin=7"}
    }
  }

  return { zip: "", breed: "", age: "" };
}

const Filter = (props) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    zip: "",
    breed: "",
    age: "",
  });

  function inputChangeHandler(event, id) {
    if (id === "zip") {
      dispatchFormState({type: "ZIP", value: event.target.value});
    }

    if (id === "breed") {
      dispatchFormState({type: "BREED", value: event.target.value});
    }

    if (id === "age") {
      dispatchFormState({type: "AGE", value: event.target.value});
    }

  }

  function resetHandler() {
    dispatchFormState({}); 
    props.noFilter(); 
    props.parseData(formState); 
  }

  function submitHandler(event) {
    event.preventDefault();
    props.parseData(formState); 
    props.noFilter(); 
  }

  return (
    <Modal className="filter-component">
      <div className="close">
        <div onClick={props.noFilter}>
          <span className="form-title">Filter</span>
          <CloseIcon />
        </div>
      </div>

      <form className="form" onSubmit={submitHandler}>
        <div className="zip">
          <input type="text" id="zip" name="zip" placeholder="ZIP Code" onChange={(event) => {inputChangeHandler(event, "zip")}}/>
        </div>

        <div className="breed">
          <span className="label">Breed</span>
          <select value={formState.breed} onChange={(event) => {inputChangeHandler(event, "breed")}}>
            <option value="">Any</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>

        <div className="age">
          <fieldset>
            <legend>Age</legend>
            <div className="options">
              <label>
                <input type="radio" name="age" value="puppy" onChange={(event) => {inputChangeHandler(event, "age")}}/>
                <div>Puppy</div>
              </label>
              <label>
                <input type="radio" name="age" value="young" onChange={(event) => {inputChangeHandler(event, "age")}}/>
                <div>Young</div>
              </label>
              <label>
                <input type="radio" name="age" value="adult" onChange={(event) => {inputChangeHandler(event, "age")}}/>
                <div>Adult</div>
              </label>
              <label>
                <input type="radio" name="age" value="senior" onChange={(event) => {inputChangeHandler(event, "age")}}/>
                <div>Senior</div>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="controls">
          <button  type="reset" className="reset" onClick={resetHandler}>Reset</button>
          <button type="submit" className="submit">
            Apply Filters
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Filter;
