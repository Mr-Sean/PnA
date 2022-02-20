import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
// import {Link, navigate} from "react-router-dom";
// import {Link, Route} from "react-router-dom";
import axios from "axios";

const AllHeroes = (props) => {

    const [heroList, setHeroList] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/heroes')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setHeroList(res.data);
            })
            .catch((err) => {
                console.log(err);                
            })
    }, [])


    return(
        <div>
            <header>
                <h1>Superhero Rankings</h1>
                <Link to={"/new"}>Add a NEW HERO</Link>
                <h2>Behold, Our Mighty Pantheon of Heroes!!!</h2>
                
                <table style={{margin:"auto", border:"1px solid black"}}>
                    
                    <thead style={{backgroundColor:"blue", color:"white"}}>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            heroList?

                            heroList.map((hero, index) => (
                                <tr key={index}>
                                    <td>{hero.heroName}</td>                                    
                                    <td>{hero.heroType}</td>                                    
                                    <td>
                                        <Link to={`/${hero._id}`}>details</Link>
                                         | 
                                        <Link to={`/edit/${hero._id}`}>edit</Link> 
                                         {/* | <button onClick={(e) => deleteHero(heroList._id)}>Adopt</button> */}
                                    </td>
                                </tr>
                            ))

                            :null
                        }
                    </tbody>
                </table>
            </header>
        </div>
    )
}
export default AllHeroes;