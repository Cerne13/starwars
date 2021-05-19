import React from 'react';
import { withRouter } from 'react-router';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Row from '../Row';
import { PersonList, PersonDetails } from '../swComponents';

const PeoplePage = ({ match, history }) => {
	const { id } = match.params;

	return (
		<ErrorBoundary>
			<Row
				left={<PersonList onItemSelected={(id) => history.push(id)} />}
				right={<PersonDetails itemId={id} />}
			/>
		</ErrorBoundary>
	);
};

export default withRouter(PeoplePage);
