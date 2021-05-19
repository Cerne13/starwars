import React from 'react';
import ItemList from '../ItemList';
import {
	withData,
	withSwapiService,
	withChildFunction,
	compose,
} from '../hocHelpers/';

const renderName = ({ name }) => <span>{name}</span>;

const renderModelAndName = ({ name, model }) => (
	<span>
		{name} ({model})
	</span>
);

const mapPersonMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPeople,
	};
};

const mapPlanetMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllPlanets,
	};
};

const mapShipMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getAllShips,
	};
};

const PersonList = compose(
	withSwapiService(mapPersonMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
	withSwapiService(mapPlanetMethodsToProps),
	withData,
	withChildFunction(renderName)
)(ItemList);

const ShipList = compose(
	withSwapiService(mapShipMethodsToProps),
	withData,
	withChildFunction(renderModelAndName)
)(ItemList);

export { PersonList, PlanetList, ShipList };
