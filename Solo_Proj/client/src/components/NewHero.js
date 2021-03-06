import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
// import {Link, navigate} from "react-router-dom";
// import {Link, Route} from "react-router-dom";
import axios from "axios";


const NewHero = (props) => {

    const [errors, setErrors] = useState("");

    const [heroName, setHeroName] = useState("");
    const [heroOrigin, setHeroOrigin] = useState("");
    const [heroPowers, setHeroPowers] = useState("");

    const [ratings, setRatings] = useState(0);


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/heroes`, 
        // below is = to req.body that backend is asking
        // for (see Controller)... create(req.body)
        {
            heroName, //shorthand for "heroName: heroName"
            heroOrigin,
            heroPowers,
            ratings,

        },
        {withCredentials: true}
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/home");
            // Route("/");
        })
        .catch((err) => {
            console.log("err: ", err);
            console.log("err.response: ", err.response);
            console.log("err.response.data: ", err.response.data);
            setErrors(err.response.data.errors);
        })
    }


    return (
        <div id="wrapper">
            <header>
            <h1 style={{color:"blue"}}>Add New Hero</h1>
            <Link to={"/"}>back to home</Link>
            <h2>Induct a New Hero into the Pantheon of Greatness!</h2>     
            </header>
            <div style={{border:'2px solid black', 
                marginLeft:"20%", marginRight:"20%"}}>
                
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="heroName">Hero Name: </label>
                        <input value={heroName} name="heroName" type="text" 
                            onChange = {(e) => setHeroName(e.target.value)} />
                            {
                                errors.heroName ? 
                                <span>{errors.heroName.message}</span> 
                                : null
                            }
                    </div>

                    <br />
       
                    <div>
                        <label htmlFor="heroOrigin">Hero Origin: </label>
                        <input value={heroOrigin} name="heroOrigin" type="text" 
                            onChange = {(e) => setHeroOrigin(e.target.value)} />
                        <br />
                            {
                            errors.heroOrigin ? 
                            <span>{errors.heroOrigin.message}</span> 
                            : null
                            }
                    </div>
                    
                    <br />

                    <div>
                        <label htmlFor="heroPowers">Hero Powers: </label>
                        <input value={heroPowers} name="heroPowers" type="text" 
                            onChange = {(e) => setHeroPowers(e.target.value)} />
                        <br />
                            {
                            errors.heroPowers ? 
                            <span>{errors.heroPowers.message}</span> 
                            : null
                            }
                    </div>      
                   
                    <br />

                    <div>
                        <label htmlFor="ratings">Star Rating: </label>
                        <input value={ratings} name="ratings" type="text" 
                            onChange = {(e) => setRatings(e.target.value)} />
                        <br />
                            {
                            errors.ratings ? 
                            <span>{errors.ratings.message}</span> 
                            : null
                            }
                    </div>      
                   
                    <br />

                    <button>Add Hero</button>
                   
                </form>

            </div>
        </div>
    )
}

export default NewHero;