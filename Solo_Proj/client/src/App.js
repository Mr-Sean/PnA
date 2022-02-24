import './App.css';

import AllHeroes from './components/AllHeroes';
import OneHero from './components/OneHero';
import NewHero from './components/NewHero';
import EditHero from './components/EditHero';
import Profile from './components/Profile';
import LogReg from './views/LogReg';

import {Router} from '@reach/router';
// import { Router } from 'react-router-dom';

import fontawesome from '@fortawesome/fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(solid, regular)


function App() {
  return (
    <div className="App">
      <Router>
        <LogReg path="/" />
          {/* <AllHeroes path="/" /> */}
        <AllHeroes path="/home" />
        <OneHero path="/:id" /> 
          {/* id param sent as a req.param to the server */}
        <NewHero path="/new" />
        <EditHero path="/edit/:id" />
        <Profile path="/user/profile/:username" />
      </Router>
      
    </div>
  );
}

export default App;
