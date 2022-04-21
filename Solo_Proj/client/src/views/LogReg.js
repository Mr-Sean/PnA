import React, {useState, useEffect} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';



const LogReg = (props) => {
 
    return (

        <div id="wrapper">
        <Login/>
        <Register/>
    </div>
    )
}

export default LogReg;