import { useContext, useState } from "react";
import axios from "axios";
import "./Login.scss";
import AuthContext from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [userInput, setUserInput] = useState({
        name: "",
        email: ""
    }); 

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
                navigate("/"); 
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

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