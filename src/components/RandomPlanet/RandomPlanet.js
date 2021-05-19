import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SwapiService from '../../services/SwapiService';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import Spinner from '../Spinner/';

import './RandomPlanet.css';

export default class RandomPlanet extends Component {
	state = {
		planet: {},
		loading: true,
		error: false,
	};

	static defaultProps = {
		updateInterval: 10000,
	};

	static propTypes = {
		updateInterval: PropTypes.number,
	};

	swapiService = new SwapiService();

	componentDidMount() {
		const { updateInterval } = this.props;
		this.updatePlanet();
		this.interval = setInterval(this.updatePlanet, updateInterval);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		console.log('cleared');
	}

	onPlanetLoaded = (planet) => {
		this.setState({ planet, loading: false });
	};

	onError = (err) => {
		this.setState({ loading: false, error: true });
	};

	updatePlanet = () => {
		const id = Math.floor(Math.random() * 19) + 2;

		// this.setState({ loading: true });

		this.swapiService
			.getPlanet(id)
			.then(this.onPlanetLoaded)
			.catch(this.onError);
	};

	render() {
		const { planet, loading, error } = this.state;

		const hasData = !(loading || error);

		const errorMessage = error ? <ErrorIndicator /> : null;
		const spinner = loading ? <Spinner /> : null;
		const planetView = hasData ? <PlanetView planet={planet} /> : null;

		return (
			<div className='random-planet jumbotron rounded'>
				{errorMessage}
				{spinner}
				{planetView}
			</div>
		);
	}
}

const PlanetView = ({ planet }) => {
	const { id, planetName, population, rotationPeriod, diameter } = planet;

	return (
		<React.Fragment>
			<img
				className='planet-image'
				src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
				alt={`Planet ${planetName}`}
			/>
			<div>
				<h4>{planetName}</h4>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<span className='term'>Population</span>
						<span>{population}</span>
					</li>
					<li className='list-group-item'>
						<span className='term'>Rotation Period</span>
						<span>{rotationPeriod}</span>
					</li>
					<li className='list-group-item'>
						<span className='term'>Diameter</span>
						<span>{diameter}</span>
					</li>
				</ul>
			</div>
		</React.Fragment>
	);
};
