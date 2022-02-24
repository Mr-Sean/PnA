import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
// import {Link, Route} from "react-router-dom";
import axios from "axios";

const Profile = (props) => {

    const [userHeroList, setUserHeroList] = useState([]);
    const {username} = props;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/heroesbyuser/${username}`,
        {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUserHeroList(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    
    
    return (
        <div style={{textAlign: "center" }}>        
          {
            userHeroList.map((hero, index) => (
                <div key={index}>
                    <p>{hero.name}</p>
                    {/* <img src={hero.image} alt="hero pic" /> */}
                    {/* <p>{hero.genre}</p> */}
                    {/* <p>{hero.rating}</p> */}
                  
                </div>
            ))}
        </div>
    )

}

export default Profile;