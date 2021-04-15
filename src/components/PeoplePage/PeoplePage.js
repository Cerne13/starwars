import React, { Component } from 'react';
import './PeoplePage.css';

import PersonDetails from '../ItemDetails';
import ItemList from '../ItemList';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import SwapiService from '../../services/SwapiService';
import Row from '../Row';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default class PeoplePage extends Component {
	state = { selectedPerson: null };

	swapiService = new SwapiService();

	onPersonSelected = (id) => {
		this.setState({
			selectedPerson: id,
			hasError: false,
		});
	};

	render() {
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		const itemList = (
			<ItemList
				onItemSelected={this.onPersonSelected}
				getData={this.swapiService.getAllPeople}
			>
				{(i) => `${i.name} (${i.birthYear})`}
			</ItemList>
		);

		const personDetails = (
			<ErrorBoundary>
				<PersonDetails personId={this.state.selectedPerson} />
			</ErrorBoundary>
		);

		return <Row left={itemList} right={personDetails} />;
	}
}
