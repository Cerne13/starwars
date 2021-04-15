import React, { Component } from 'react';
import './App.css';

import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator/';
import PeoplePage from '../PeoplePage';

import SwapiService from '../../services/SwapiService';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { SwapiServiceProvider } from '../SwapiServiceContext';
import Row from '../Row';
import ItemDetails, { Record } from '../ItemDetails';
import ErrorButton from '../ErrorButton';

import {
	PersonList,
	PlanetList,
	ShipList,
	PersonDetails,
	PlanetDetails,
	ShipDetails,
} from '../swComponents';

export default class App extends Component {
	swapiService = new SwapiService();

	state = {
		showRandomPlanet: true,
		hasError: false,
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
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

		// return (
		// 	<>
		// 		<ErrorBoundary>
		// 			<div className="stardb-app">
		// 				<Header />

		// 				{planet}

		// 				<div className="row mb2 button-row">
		// 					<button
		// 						className="toggle-planet btn btn-warning btn-lg"
		// 						onClick={this.toggleRandomPlanet}
		// 					>
		// 						Toggle Random Planet
		// 					</button>
		// 					<ErrorButton />
		// 				</div>

		// 				<ErrorBoundary>
		// 					<Row left={personDetails} right={starhsipDetails} />
		// 				</ErrorBoundary>

		// 				{/* <PeoplePage /> */}
		// 			</div>
		// 		</ErrorBoundary>
		// 	</>
		// );

		return (
			<ErrorBoundary>
				<SwapiServiceProvider value={this.swapiService}>
					<div className="stardb-app">
						<Header />

						<PersonDetails itemId={11} />
						<PlanetDetails itemId={11} />
						<ShipDetails itemId={11} />

						<PersonList onItemSelected={() => {}} />
						<PlanetList onItemSelected={() => {}} />
						<ShipList onItemSelected={() => {}} />
					</div>
				</SwapiServiceProvider>
			</ErrorBoundary>
		);
	}
}
