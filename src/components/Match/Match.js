import Dog from "../Homepage/Dog";
import Modal from "../UI/Modal";
import "./Match.scss"; 

const Match = (props) => {
    function handleClick() {
        props.reset(); 
        window.location.reload(); 
    }

    return (
        <Modal className="match-modal">
            <div className="match-content">
                <h1>It's a <em>MATCH</em></h1>
                <Dog key={props.dog.id} dog={props.dog}/>
                <button onClick={handleClick}>Back to Home</button>
            </div>
        </Modal>
    );
}

export default Match;