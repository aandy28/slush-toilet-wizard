import React, { Component } from "react";
import ToiletsList from "./components/toiletsList";

class App extends Component {
  render() {
    return (
      <div className="app">
        <ToiletsList />
      </div>
    );
  }
}

export default App;
