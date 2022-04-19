import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
import axios from "axios";
import { FaStar } from "react-icons/fa";


const colors = {
    orange: "rgb(217 101 31)",
    gray: "#a9a9a9"
};

const OneHero = (props) => {
    
    
    const { id } = props;
    const [heroInfo, setHeroInfo] = useState({});

    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);


    const handleClick = value => {
        setCurrentValue(value)
        console.log("Current value is now", value)
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    };


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
    
    const addRating = () => {
        console.log(currentValue);
        axios.put(`http://localhost:8000/api/ratings/${id}`,
        {ratings: currentValue}
        )
        .then((response) => {
            console.log(response.data);
            // setHeroInfo(response.data);
        })
        .catch((err) => console.log(err));
    }
       
    
    return (
        <div style={styles.container}>
            <header>
                <h1>Superhero Rankings</h1>
                <Link to={"/home"}>back to home</Link>
                <h2>Details about: {heroInfo.heroName}</h2>
            </header>
            
            {/* <button onClick={(e) => deleteHero(heroInfo._id)}>BANISH {heroInfo.heroName}</button> */}
            <br />
            <br />

            <div style={{border:'2px solid black', marginLeft:"20%", marginRight:"20%"}}>
                <p>Origin: {heroInfo.heroOrigin}</p>
                <p>Powers: {heroInfo.heroPowers}</p>

            </div>

            <br />

            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FaStar 
                            key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={hoverValue > index || currentValue > index 
                                ? colors.orange : colors.gray}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"                                
                            }}
                        />
                    );
                })}
                <button onClick={addRating}>Add Star Rating</button>
            </div>

        </div>
    );

}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }
}

export default OneHero;