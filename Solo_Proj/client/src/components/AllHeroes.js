import React, {useState, useEffect} from "react";
import {Link, navigate} from "@reach/router";
// import {Link, Route} from "react-router-dom";
import axios from "axios";
import avg from "./OneHero";

const AllHeroes = () => {

    const [heroList, setHeroList] = useState([]);

    const [user, setUser] = useState(null);
    
    const averageArray = [];

    
    useEffect(() => {
        axios.get('http://localhost:8000/api/heroes')
            .then((res) => {
                console.log(res);
                console.log(res.data);
                for(let i=0; i < res.data.length; i++) {
                    console.log(res.data[i])
                    let total = 0
                    let averageRate
                    for(let y=0; y < res.data[i].ratings.length; y++) {
                        // total+=response.data.ratings[i]
                        // res.data[i].ratings[y]
                        console.log(res.data[i].ratings[y])
                        total+=res.data[i].ratings[y]

                    }
                    console.log("Line 31")
                    averageRate = total / res.data[i].ratings.length
                    console.log(averageRate)
                    averageArray.push(averageRate)
                    console.log(averageArray)
                }
                setHeroList(res.data);
            })
            .catch((err) => {
                console.log(err);                
            })
    }, [])


    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            {withCredentials: true}
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/");
            })
    },[])


    const logout = (e) => {
        // e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, // As a post request, we MUST send something with our request.
                // Because we're not adding anything, we can send a simple MT object
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                // localStorage.removeItem("userId");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //another option to get pass the userId from login to the next component without utilizing more advanced state management!
    // useEffect(()=>{
    //     console.log(localStorage.getItem("userId"));
    //     setUserId(localStorage.getItem("userId")); 
    // },[])

    console.log(avg);

    return (
        <div  id="wrapper">
            <header>
                <h1 style={{color:"blue"}}>Superhero Rankings</h1>
                
                <h2>Behold, Our Mighty Pantheon of Heroes!!!</h2>
                
                
                <Link to={"/new"}>Add a NEW HERO</Link>

                {/* <Link to={`/user/profile/${user.username}`}>{user.username} Profile</Link> */}
                
                { user ?
                <div>
                    <Link to={`/user/profile/${user.username}`}>{user.username} Profile</Link>
                </div>
                :
                <div>
                    User not logged in!
                </div>
            
                }
                <button style={{backgroundColor:"blue", color:"white"}} 
                        onClick={logout}>Logout</button>



            </header>

                
                <table style={{margin:"auto", border:"1px solid black"}}>
                    
                    <thead style={{backgroundColor:"blue", color:"white"}}>
                        <tr>
                            <th>HERO</th>
                            {/* <th>Type</th> */}
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            heroList?

                            heroList.map((hero, index) => (
                                <tr key={index}>
                                    
                                    <td>{hero.heroName}</td> 

                                    {
                                    averageArray?
                                    <td>{averageArray[0]}</td>
                                    :null
                                    
                                    }                                   
                                    
                                    <td>{hero.heroType}</td>                                    
                                    
                                    <td>
                                        <Link to={`/${hero._id}`}>details</Link>
                                         | 
                                        <Link to={`/edit/${hero._id}`}>edit</Link> 
                                         {/* | <button onClick={(e) => deleteHero(heroList._id)}>Adopt</button> */}
                                    </td>
                                    
                                    <td>
                                        <Link to={`/user/profile/${hero.createdBy.username}`}>
                                        Added by: {hero.createdBy.username}
                                        </Link>
                                        {/* <p>Added by: {hero.createdBy.username}</p> */}
                                    </td>
                                </tr>
                            ))

                            :null
                        }
                    </tbody>
                </table>
            
        </div>
    )
}
export default AllHeroes;