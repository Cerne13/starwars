import React from 'react';
import ItemList from '../ItemList';
import { withData } from '../hocHelpers/';
import SwapiService from '../../services/SwapiService';

const swapiService = new SwapiService();
const { getAllPeople, getAllPlanets, getAllShips } = swapiService;

const withChildFunc = (Wrapped, fn) => {
	return (props) => {
		return <Wrapped {...props}>{fn}</Wrapped>;
	};
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ name, model }) => (
	<span>
		{name} ({model})
	</span>
);

const PersonList = withData(withChildFunc(ItemList, renderName), getAllPeople);
const PlanetList = withData(withChildFunc(ItemList, renderName), getAllPlanets);
const ShipList = withData(
	withChildFunc(ItemList, renderModelAndName),
	getAllShips
);

export { PersonList, PlanetList, ShipList };
