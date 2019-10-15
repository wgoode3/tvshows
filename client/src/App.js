import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import "react-router";
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Table from './Table';
import New from './New';
import Edit from './Edit';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Shows</h1>
        <ul>
          <li><Link to="/">All Tv Shows</Link></li>
          <li><Link to="/new">Add Tv Show</Link></li>
        </ul>
        <Route exact path="/" component={Table} />
        <Route path="/new" component={New} />
        <Route path="/edit/:_id" component={Edit} />
      </BrowserRouter>
    );
  }
}

export default App;
