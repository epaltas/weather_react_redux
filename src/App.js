import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Default from './containers/Default';
import SearchResult from './containers/SearchResult';

class App extends Component {

	render () {
		return (
			<div className="text-center">
				<Link to="/" style={{ textDecoration: 'none' }}><h1 className="title">The Weather EC</h1></Link>
				<div className="container">
					<Route path="/" exact component={Default} />
					<Route path="/results" component={SearchResult} />
				</div>
			</div>
		);
	}
}

export default App;