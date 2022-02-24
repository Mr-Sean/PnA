import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
// import {Link, navigate} from "react-router-dom";
// import {Link, Route} from "react-router-dom";
import axios from "axios";

const OneHero = (props) => {


    const { id } = props;
    const [heroInfo, setHeroInfo] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/heroes/${id}`)
            .then((response) => {
                console.log(response.data);
                setHeroInfo(response.data);
            })
            .catch((err) => console.log(err));
    }, [id]);


    const deleteHero = (idFromBelow) => {
        axios
            .delete(`http://localhost:8000/api/heroes/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div>
            <header>
                <h1>Superhero Rankings</h1>
                <Link to={"/home"}>back to home</Link>
                <h2>Details about: {heroInfo.heroName}</h2>
            </header>
            
            <button onClick={(e) => deleteHero(heroInfo._id)}>BANISH {heroInfo.heroName}</button>
            <br />
            <br />

            <div style={{border:'2px solid black', marginLeft:"20%", marginRight:"20%"}}>
                <p>Origin: {heroInfo.heroOrigin}</p>
                <p>Powers: {heroInfo.heroPowers}</p>

            </div>
        </div>
    )

}

export default OneHero;