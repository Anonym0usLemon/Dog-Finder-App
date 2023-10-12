import ReactDOM from "react-dom";
import "./Modal.scss"; 

const Backdrop = props => {
    return <div className="overlay">{props.children}</div>
}

const portalElement = document.getElementById("overlays"); 

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop>{props.children}</Backdrop>, portalElement)}            
        </>
    );
}

export default Modal; 