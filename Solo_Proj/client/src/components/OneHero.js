import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
import axios from "axios";
import { FaStar } from "react-icons/fa";



const colors = {
    blue: "#0000ff",
    // orange: "rgb(217 101 31)",
    gray: "#a9a9a9"
};

const OneHero = (props) => {
    
    const avg = ""
    
    const { id } = props;
    const [heroInfo, setHeroInfo] = useState({});

    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [average, setAverage] = useState(0);


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
            console.log(response.data.ratings);

            let total = 0
            let averageRate
            for(let i=0; i < response.data.ratings.length; i++) {
                total+=response.data.ratings[i]
            }
            averageRate = total / response.data.ratings.length
            console.log(averageRate);
            setAverage(averageRate);
            // avg.push(averageRate);
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
        <div id="wrapper" style={styles.container}>
            <header>
                <h1 style={{backgroundColor:"blue", color:"white"}}>Superhero Rankings</h1>
                <Link to={"/home"}>back to home</Link>
                <h2 style={{color:"white"}}>Details about: {heroInfo.heroName}</h2>
            </header>
            
            <button onClick={(e) => deleteHero(heroInfo._id)}
                    style={{backgroundColor:"blue", color:"white"}}
                        >BANISH {heroInfo.heroName}</button>
            <br />
            <br />

            <div style={{padding: "3%", 
                        border:'2px solid black', 
                        marginLeft:"20%", 
                        marginRight:"20%",
                        backgroundColor: "blue", 
                        // color:"white"
                        }}>
                <p>{heroInfo.image}</p>
                <p>ORIGIN: {heroInfo.heroOrigin}</p>
                <p>POWERS: {heroInfo.heroPowers}</p>

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
                                ? colors.blue : colors.gray}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"                                
                            }}
                        />
                        );
                    })}
                    {/* <p>{Math.round(average)}</p> */}
                    <p>{(average)}</p>
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