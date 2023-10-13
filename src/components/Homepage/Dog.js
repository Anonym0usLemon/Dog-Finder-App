import { Link } from "react-router-dom";
import "./Dog.scss";

const Dog = (props) => {
  function handleMatch(event) {
    props.match(event);
  }

  return (
    <div>
      <div className="match-box">
        <label></label>
        <input
          type="checkbox"
          id={props.dog.id}
          value={props.dog.id}
          onChange={handleMatch}
        />
      </div>
      <Link to={`dog-details/${props.dog.id}`} className="dog-tile">
        <div className="dog-tile-content">
          <img src={props.dog.img} alt="" />
          <h1>{props.dog.name}</h1>
        </div>
      </Link>
    </div>
  );
};

export default Dog;
