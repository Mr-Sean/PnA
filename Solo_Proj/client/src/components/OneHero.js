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

    const [messageList, setMessageList] = useState([]);
    const [content, setContent] = useState("");

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
            console.log(response);
            console.log(response.data);
            setMessageList(response.data.messages);

            console.log(response.data.ratings);

            let total = 0
            let averageRate
            for(let i=0; i < response.data.ratings.length; i++) {
                total+=response.data.ratings[i]
            }
            averageRate = total / response.data.ratings.length
            console.log(averageRate);
            setAverage(averageRate);
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
    
    
    const addAMessage = () => {
        axios.post("http://localhost:8000/api/messages",
        {
            content, // content:content
            associatedHero: id
        })
        .then((res)=>{
            console.log(res.data);
            setMessageList([...messageList, res.data])
        })
            .catch((err)=> {
                console.log(err);
        })
    }
    

    const likeMessage = (messageFromBelow)=>{
        axios.put(`http://localhost:8000/api/messages/${messageFromBelow._id}`,
        {
            likes: messageFromBelow.likes + 1
        }
        )
        .then((res)=>{
            console.log(res.data);
            
            let updatedMessageList = messageList.map((message, index)=>{
                if(message === messageFromBelow){
                    let messageHolder = {...res.data};
                    return messageHolder;
                }
                return message;
            });
            
            setMessageList(updatedMessageList);
            // socket.emit("Update_chat", updatedMessageList)
        })
    }
    
    return (
        <div id="wrapper" style={styles.container}>
            <header>
                {/* <h1 style={{backgroundColor:"blue", color:"white"}}>Superhero Rankings</h1> */}
                <h1 style={{color:"blue"}}>Superhero Rankings</h1>
                <Link to={"/home"}>back to home</Link>
                <h3 style={{color:"white"}}>Details about: {heroInfo.heroName}</h3>
            </header>
            
            
            <br />

            <input type="text" value={content} onChange={(e)=>setContent(e.target.value)} />
            <button onClick={addAMessage}>Add Message</button>

            {
                messageList ?
                messageList.map((message, index) => (
                    <div key={index}>
                            <p>{message.content}</p>
                            <button onClick={()=>likeMessage(message)}>Like {message.likes}</button>
                            {/* <button>Like {message.likes}</button> */}
                        </div>
                    ))
                    : null
                }

            <br />

            <div style={{padding: "3%", 
                        border:'2px solid black', 
                        marginLeft:"20%", 
                        marginRight:"20%",
                        backgroundColor: "blue", 
                        // color:"white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                <img src={heroInfo.image} alt="hero pic" 
                style={{width:"150px", height:"200px"}}/>
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
                    {/* <p>{(average)}</p> */}
                    {(average).toFixed(1)}
                <p><button onClick={addRating}
                    style={{backgroundColor:"blue", color:"white"}}
                    >Add Star Rating</button></p>
            </div>

            <br />

            <button onClick={(e) => deleteHero(heroInfo._id)}
            style={{backgroundColor:"blue", color:"white"}}
            >BANISH {heroInfo.heroName}</button>

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