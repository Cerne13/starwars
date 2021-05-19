import React, { Component } from 'react';
import './App.css';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator/';
import SwapiService from '../../services/SwapiService';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import {
	PeoplePage,
	PlanetPage,
	ShipPage,
	LoginPage,
	SecretPage,
} from '../pages';

import DummySwapiService from '../../services/DummySwapiService';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ShipDetails } from '../swComponents';

export default class App extends Component {
	state = {
		hasError: false,
		swapiService: new SwapiService(),
		isLoggedIn: false,
	};

	onLogin = () => {
		this.setState({ isLoggedIn: true });
	};

	onServiceChange = () => {
		this.setState(({ swapiService }) => {
			const Service =
				swapiService instanceof SwapiService
					? DummySwapiService
					: SwapiService;

			console.log(`switched to: ${Service.name}`);

			return { swapiService: new Service() };
		});
	};

	toggleRandomPlanet = () => {
		this.setState((state) => {
			return {
				showRandomPlanet: !state.showRandomPlanet,
			};
		});
	};

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		const { isLoggedIn } = this.state;

		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return (
			<ErrorBoundary>
				<SwapiServiceProvider value={this.state.swapiService}>
					<Router>
						<div className='stardb-app'>
							<Header onServiceChange={this.onServiceChange} />
							<RandomPlanet />

							<Switch>
								<Route
									exact
									path='/'
									render={() => {
										return <h2>Welcome to StarDb</h2>;
									}}
								/>
								<Route
									path='/people/:id?'
									component={PeoplePage}
								/>
								<Route
									path='/planets/'
									component={PlanetPage}
								/>
								<Route
									exact
									path='/ships/'
									component={ShipPage}
								/>
								<Route
									path='/ships/:id'
									render={({ match }) => {
										const { id } = match.params;
										return <ShipDetails itemId={id} />;
									}}
								/>

								<Route
									path='/login'
									render={() => (
										<LoginPage
											isLoggedIn={isLoggedIn}
											onLogin={this.onLogin}
										/>
									)}
								/>
								<Route
									path='/secret'
									render={() => (
										<SecretPage isLoggedIn={isLoggedIn} />
									)}
								/>
								<Route render={() => <h2>Page not found</h2>} />
							</Switch>
						</div>
					</Router>
				</SwapiServiceProvider>
			</ErrorBoundary>
		);
	}
}
