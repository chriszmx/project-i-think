import React, { useState } from "react";
import axios from "axios";
import { useSpring, animated } from "react-spring";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(
            "http://localhost:8000/token",
            `grant_type=password&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
            {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
            },
            }
        );
        localStorage.setItem("token", response.data.access_token);
        console.log("Logged in successfully");
        alert(`User ${email} was logged in successfully`);
        // Refresh the page after successful login
        window.location.reload();
        resetForm();
        } catch (error) {
        console.error(error.response.data);
        setErrorMessage(
            "Incorrect email or password. Are you sure you're a human?"
        );
        }
    };

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setErrorMessage("");
    };

    return (
        <animated.form
        style={fadeIn}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-4 p-4 bg-white rounded-lg shadow-md"
        >
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
            </label>
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
            <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
            >
            Password:
            </label>
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div style={{ color: "red" }} className="mb-4">
            {errorMessage}
        </div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Login
        </button>
        </animated.form>
    );
};

export default LoginForm;

// import React, { useState } from "react";
// import axios from "axios";

// const LoginForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//         const response = await axios.post(
//             "http://localhost:8000/token",
//             `grant_type=password&username=${email}&password=${password}&scope=&client_id=&client_secret=`,
//             {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Accept: "application/json",
//             },
//             }
//         );
//         localStorage.setItem("token", response.data.access_token);
//         console.log("Logged in successfully");
//         alert(`User ${email} was logged in successfully`);
//         // Refresh the page after successful login
//         window.location.reload();
//         resetForm();
//         } catch (error) {
//         console.error(error.response.data);
//         setErrorMessage(
//             "Incorrect email or password. Are you sure you're a human?"
//         );
//         }
//     };

//     const resetForm = () => {
//         setEmail("");
//         setPassword("");
//         setErrorMessage("");
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//         <div>
//             <label htmlFor="email">Email:</label>
//             <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             />
//         </div>
//         <div>
//             <label htmlFor="password">Password:</label>
//             <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             />
//         </div>
//         <div style={{ color: "red" }}>{errorMessage}</div>
//         <button type="submit">Login</button>
//         </form>
//     );
// };

// export default LoginForm;
