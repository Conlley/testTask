import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';

import { LOADING, SUCCESS, FAILURE } from "./constants/status";
import { Tile, Home, InDevelopment } from './pages';
import { Header, StatusProvider } from './components';

import './main.css';

class SPA extends Component {
  state = {
    tiles: [],
    status: LOADING()
  };

  componentDidMount = () => axios.get('/api/tiles')
    .then(({ data }) => this.setState({ tiles: data.tiles, status: SUCCESS() }))
    .catch(message => this.setState({ status: FAILURE(message) }));

  render = () => {
    const { tiles, status } = this.state;

    return (
      <BrowserRouter>
        <StatusProvider value={status}>
          <Header />
          <Switch>
            <Route path="/home" render={(props) => <Home {...props} tiles={tiles} /> } />
            <Route path="/tile/:id" render={(props) => <Tile {...props} tiles={tiles} />} />
            <Route path="/about" component={InDevelopment} />
            <Route path="/whatever" component={InDevelopment} />
            <Redirect to="/home" />
          </Switch>
        </StatusProvider>
      </BrowserRouter>
    )
  }
}

render(<SPA />, document.getElementById('root'));
