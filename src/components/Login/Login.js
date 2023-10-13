import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Login.scss";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import Modal from "../UI/Modal";

const Login = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        email: ""
    }); 

    const [inputIsValid, setInputIsValid] = useState({
        nameIsValid: false,
        emailIsValid: false
    }); 

    useEffect(() => {
        if (userInput.name.length > 3) {
            setInputIsValid((prevState) => ({...prevState, nameIsValid: true}));
        } else {
            setInputIsValid((prevState) => ({...prevState, nameIsValid: false}));
        }
        
        if (userInput.email.includes("@")) {
            setInputIsValid((prevState) => ({...prevState, emailIsValid: true}));
        } else {
            setInputIsValid((prevState) => ({...prevState, emailIsValid: false}));
        }
    }, [userInput]);


    const ctx = useContext(AuthContext);
    const navigate = useNavigate(); 

    function inputChangeHandler(event, id) {
        const value = event.target.value

        if (id === "username") {
            setUserInput((prevState) => ({
                ...prevState, 
                name: value
            })); 
        }
        if (id === "password") {
            setUserInput((prevState) => ({
                ...prevState,
                email: value
            }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', userInput, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, 
            });
            console.log(response.data);

            if (response.data === "OK") {
                ctx.onLogin(); 
                console.log(ctx.isLoggedIn);
                navigate("https://anonym0uslemon.github.io/fetch-fe-challenge/"); 
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Modal className="login-backdrop">
            <form className="login-modal" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <input id="name" type="text" placeholder="Name" value={userInput.name} onChange={(event) => inputChangeHandler(event, "username")}/>
                    {!inputIsValid.nameIsValid && <p style={{margin: "10px 0 0 0", color: "red", fontSize: "12px"}}>Name must be greater than 3 characters.</p>}
                </div>

                <div>
                    <input id="email" type="text" placeholder="Email" value={userInput.email} onChange={(event) => inputChangeHandler(event, "password")}/>
                    {!inputIsValid.emailIsValid && <p style={{margin: "10px 0 0 0", color: "red", fontSize: "12px"}}>Must enter valid email.</p>}
                </div>

                <button className={!inputIsValid ? "disabled" : ""} disabled={!inputIsValid} type="submit">Log in</button>
            </form>
        </Modal>
    )
}

export default Login;