import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { ShipList } from '../swComponents';
import { withRouter } from 'react-router-dom';

const ShipPage = ({ history }) => {
	return (
		<ErrorBoundary>
			<ShipList onItemSelected={(id) => history.push(id)} />
		</ErrorBoundary>
	);
};

export default withRouter(ShipPage);
