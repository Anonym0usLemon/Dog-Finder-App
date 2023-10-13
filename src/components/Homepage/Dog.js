import { Link } from "react-router-dom";
import EmptyHeart from "../../assets/EmptyHeart";
import "./Dog.scss";

const Dog = (props) => {
  function handleMatch(event) {
    props.match(event);
  }

  return (
    <div className="dog-tile">
      <div className="match-box">
        <input
          type="checkbox"
          id={props.dog.id}
          value={props.dog.id}
          onChange={handleMatch}
        />
        <label htmlFor={props.dog.id}><EmptyHeart/></label>
      </div>
      
      {/* insert this attribute to link to individual dog pages (for future use) to={`dog-details/${props.dog.id}`} */}
      <Link className="dog-tile-content">
        <div className="img-container">
          <img src={props.dog.img} alt="" />
        </div>
        <div className="info">
          <p className="name">{props.dog.name}</p>
          <div className="middle-info">
            <p>Age: {props.dog.age}</p>
            <p>{props.dog.breed}</p>
          </div>
          <p className="zip">Zip Code: {props.dog.zip_code}</p>
        </div>
      </Link>
    </div>
  );
};

export default Dog;
