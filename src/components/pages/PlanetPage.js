import React, { Component } from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Row from '../Row';
import { PlanetList, PlanetDetails } from '../swComponents';

export default class PlanetPage extends Component {
	state = {
		selectedItem: null,
	};

	onItemSelected = (selectedItem) => {
		this.setState({ selectedItem });
	};

	render() {
		const { selectedItem } = this.state;

		return (
			<ErrorBoundary>
				<Row
					left={<PlanetList onItemSelected={this.onItemSelected} />}
					right={<PlanetDetails itemId={selectedItem} />}
				/>
			</ErrorBoundary>
		);
	}
}
