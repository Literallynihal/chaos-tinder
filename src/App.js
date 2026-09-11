import React from "react";
import Header from "./Header";
import TinderCard from "./TinderCards";
import SwipeButtons from "./SwipeButtons";
import Chats from "./Chats";
import ChatScreen from "./ChatScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initAllChaos } from './chaos';

function App() {
  // ... existing code ...
  
  // Add this line before the return statement:
  initAllChaos();
  
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/chat/:person">
          <Header backButton="/chat" />
          <ChatScreen/>
        </Route>
          <Route path="/chat">
            <Header backButton="/" />
            <Chats />
          </Route>
          <Route path="/">
            <Header />
            <TinderCard />
            <SwipeButtons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
