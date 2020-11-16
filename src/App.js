import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Welcome from './Components/Welcome';
import SignUp from './Components/SignUp';
import Login from "./Components/Login"
import OTP from "./Components/OTP"
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProfile from './Components/MyProfile';
import Tournament_Home from './Components/Tournament_Home';
import Players_Home from './Components/Players_Home';
import AddPlayer from './Components/AddPlayer';
import PlayerDetails from './Components/PlayerDetails';
import TournamentDetails from './Components/TournamentDetails';
import MatchScreen from './Components/MatchScreen';
import CreateTournament from './Components/CreateTournament';
import CreateDraws from './Components/CreateDraws';
import Matches from './Components/Matches';
import UpdateTournament from './Components/UpdateTournament';

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/updateTournament"><UpdateTournament /></Route>
          <Route exact path="/matches"><Matches /></Route>
          <Route exact path="/createDraws"><CreateDraws /></Route>
          <Route exact path="/createTournament"><CreateTournament /></Route>
          <Route exact path="/matchScreen"><MatchScreen /></Route>
          <Route exact path="/tournamentDetails"><TournamentDetails /></Route>
          <Route exact path="/playerDetails"><PlayerDetails /></Route>
          <Route exact path="/addPlayer"><AddPlayer /></Route>
          <Route exact path="/players"><Players_Home /></Route>
          <Route exact path="/tournaments"><Tournament_Home /></Route>
          <Route exact path="/myProfile"><MyProfile /></Route>
          <Route exact path="/otp"><OTP /></Route>
          <Route exact path="/login"><Login /></Route>
          <Route exact path="/signup"><SignUp /></Route>
          <Route exact path="/"><Welcome /></Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
