import React, {useState, useEffect} from 'react';
import axios from 'axios';



const Register = (props) => {
    
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    // using a single state object to hold all data!
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    // using a single function to update the state object
    // we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };


    const register = (e) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/register",
                user, // the user state is already an object with the correct keys and values!
                {
                    withCredentials: true,
                    // this will force the sending of the credentials / cookies so they can be updated
                    // XMLHttpRequest from a different domain cannot set cookie values for their own domain
                    // unless withCredentials is set to true before making the request
                },
            )
            .then((res) => {
                console.log("res.data", res.data);
                // when we successfully created the account, reset state for registration form
                // We do this if we are NOT navigating automatically away from the page
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for Registering, you can now log in!",
                );
                setErrors({}); // remember to reset errors state to empty if it was successful
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

 
    return (
    
        <div>
            <h1>Register</h1>
            
            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}            
            <form onSubmit={register}>
                <div>
                    <label>Username</label>
                    {errors.username ? (
                        <span className="error-text">
                            {errors.username.message}
                        </span>
                    ) : null}
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        //long hand notation
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    {errors.email ? (
                        <span className="error-text">{errors.email.message}</span>
                    ) : null}
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    {errors.password ? (
                        <span className="error-text">
                            {errors.password.message}
                        </span>
                    ) : null}
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    {errors.confirmPassword ? (
                        <span className="error-text">
                            {errors.confirmPassword.message}
                        </span>
                    ) : null}
                    <input
                        type="password"
                        name="confirmPassword"
                        value={user.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <div className="center">
                    <button style={{backgroundColor:"blue", color:"white"}}
                        >Register Me</button>
                </div>
            </form>
        </div>
    )
};

export default Register;