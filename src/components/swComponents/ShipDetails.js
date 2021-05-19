import React from 'react';
import ItemDetails, { Record } from '../ItemDetails';
import { withSwapiService } from '../hocHelpers';

const ShipDetails = (props) => {
	return (
		<ItemDetails {...props}>
			<Record field='model' label='Model' />
			<Record field='length' label='Length' />
			<Record field='costInCredits' label='Cost' />
		</ItemDetails>
	);
};

const mapMethodsToProps = (swapiService) => {
	return {
		getData: swapiService.getShip,
		getImageURL: swapiService.getShipImage,
	};
};

export default withSwapiService(mapMethodsToProps)(ShipDetails);
