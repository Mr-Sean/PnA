import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
// import {Link, navigate} from "react-router-dom";
// import {Link, Route} from "react-router-dom";
import axios from "axios";

const EditHero = (props) => {


    const [errors, setErrors] = useState("");

    const {id} = props;
    const [heroName, setHeroName] = useState("");
    const [heroOrigin, setHeroOrigin] = useState("");
    const [heroPowers, setHeroPowers] = useState("");
    const [image, setImage] = useState("");


    // useEffect to grab the id
    useEffect(()=> {
        axios.get(`http://localhost:8000/api/heroes/${id}`)
            .then((res)=>{
                console.log(res.data);

                setImage(res.data.image);

                setHeroName(res.data.heroName);
                
                setHeroOrigin(res.data.heroOrigin);

                setHeroPowers(res.data.heroPowers);

            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])


    const updateSubmitHandler = (e) => {
        e.preventDefault();
        axios
            .put(
            `http://localhost:8000/api/heroes/${id}`, 
        
        // below is = to req.body that backend is asking
            // for (see Controller)... create(req.body)
        {
            image,
            heroName, //shorthand for "heroName: heroName"
            heroOrigin,
            heroPowers,

        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors);
        })
    }


    return (
        <div id="wrapper">
            <header>
            <h1 style={{color:"blue"}}>Superhero Rankings</h1>
            <Link to={"/"}>back to home</Link>
            <h2>Edit {heroName}</h2>     
            </header>
            <div style={{border:'2px solid black', 
                marginLeft:"20%", marginRight:"20%"}}>
                
                <form onSubmit={updateSubmitHandler}>
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
                    

                    <div>
                    <label>Image</label>
                    <input value={image} onChange={(e)=>setImage(e.target.value)} type="text" />
                    {
                        errors.image?
                        <span>{errors.image.message}</span>
                        :null
                    }            
                    </div>
                   
                    <br />

                    <button>Edit Hero</button>
                   
                </form>

            </div>
        </div>
    )

}

export default EditHero;