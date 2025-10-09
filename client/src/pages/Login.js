import React, {useState} from "react";
import { Link } from "react-router-dom";

//https://javascript.plainenglish.io/basic-react-login-using-external-api-e33322e480cd
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token); // stocker le token
        localStorage.setItem("email", email);      // stocker email pour affichage
        alert("Login ok !");
    } else {
        alert(data.error);
    }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Pas de compte? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default Login;