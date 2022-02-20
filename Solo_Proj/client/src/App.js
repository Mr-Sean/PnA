import './App.css';
import {Router} from '@reach/router';
// import { Router } from 'react-router-dom';

import AllHeroes from './components/AllHeroes';
import OneHero from './components/OneHero';
import NewHero from './components/NewHero';
import EditHero from './components/EditHero';


function App() {
  return (
    <div className="App">
      <Router>
        <AllHeroes path="/" />
        <OneHero path="/:id" />
        <NewHero path="/new" />
        <EditHero path="/edit/:id" />
      </Router>
      
    </div>
  );
}

export default App;
