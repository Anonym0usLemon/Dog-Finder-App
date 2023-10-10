import { useState } from "react";
import "./Login.scss";
import axios from "axios";

const Login = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        email: ""
    }); 

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

    const submitHandler = async (event) => {
        event.preventDefault(); 
        console.log(userInput);

        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
                name: userInput.name,
                email: userInput.email
            });

            console.log("Authentication Successful!");

        } catch (error) {

            console.error("Login failed: ", error)
        }

    }

    return (
        <div className="login-modal">
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" onChange={(event) => inputChangeHandler(event, "username")}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="password" onChange={(event) => inputChangeHandler(event, "password")}/>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;