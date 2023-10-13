import ReactDOM from "react-dom";
import "./Modal.scss"; 

const Backdrop = props => {
    return <div className={`overlay ${props.className}`}>{props.children}</div>
}

const portalElement = document.getElementById("overlays"); 

const Modal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop className={props.className}>{props.children}</Backdrop>, portalElement)}            
        </>
    );
}

export default Modal; 