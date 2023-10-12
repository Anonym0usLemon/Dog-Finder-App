import CloseIcon from "../../../assets/CloseIcon";
import Modal from "../../UI/Modal";

const Filter = (props) => {
    return (
        <Modal>
            <div>
                <div onClick={props.noFilter}><CloseIcon/></div>
            </div>
            <form>
                <h1>Filter for things</h1>
            </form>
        </Modal>
    );
}

export default Filter; 