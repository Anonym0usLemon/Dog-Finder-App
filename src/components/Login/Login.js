import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./Login.scss";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

const Login = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        email: ""
    }); 

    const [loggedIn, setLoggedIn] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', userInput, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, 
            });
            console.log(response.data);
            setLoggedIn(true); 
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Redirect user to homepage once they're logged in. 

    if (loggedIn) {
        return <Navigate to="/search" /> 
    }

    return (
        <div className="login-modal">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" onChange={(event) => inputChangeHandler(event, "username")}/>
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="text" onChange={(event) => inputChangeHandler(event, "password")}/>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;