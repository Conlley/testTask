import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';

import { Tile, Home, InDevelopment, Error } from './pages';
import { Header } from './components';

import './main.css';

class SPA extends Component {
  state = {
    error: null,
    tiles: [],
    loading: true
  };

  componentDidMount = () => axios.get('/api/tiles')
    .then(({ data }) => this.setState({ tiles: data.tiles, loading: false }))
    .catch(error => this.setState({ error, loading: false }));

  render = () => {
    const { error, tiles, loading } = this.state;

    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Switch>
            <Route path="/home" render={(props) => error ? <Error error={error} /> : <Home {...props} tiles={tiles} loading={loading} /> } />
            <Route path="/tile/:id" render={(props) => error ? <Error error={error} /> : <Tile {...props} tiles={tiles} loading={loading} />} />
            <Route path="/about" component={InDevelopment} />
            <Route path="/whatever" component={InDevelopment} />
            <Redirect to="/home" />
          </Switch>
        </Fragment>
      </BrowserRouter>
    )
  }
}

render(<SPA />, document.getElementById('root'));
