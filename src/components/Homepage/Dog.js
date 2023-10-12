import { Link } from "react-router-dom";
import "./Dog.scss"; 

const Dog = (props) => {
    console.log(props.dog); 

    return (
        <Link to={`dog-details/${props.dog.id}`} className="dog-tile">            
            <div className="dog-tile-content">
                <img src={props.dog.img} alt=""/>
                <h1>{props.dog.name}</h1>
            </div>
        </Link>
    );
}

export default Dog