import React, { Component } from 'react';
import SwapiService from '../../services/SwapiService';
import './ItemDetails.css';
import Spinner from '../Spinner';
import ErrorButton from '../ErrorButton';

const Record = ({ item, field, label }) => {
	return (
		<li className='list-group-item'>
			<span className='term'>{label}</span>
			<span>{item[field]}</span>
		</li>
	);
};

export { Record };

export default class ItemDetails extends Component {
	state = {
		item: null,
		loading: true,
		image: null,
	};

	swapiService = new SwapiService();

	componentDidMount() {
		this.updateItem();
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.itemId !== prevProps.itemId ||
			this.props.getData !== prevProps.getData ||
			this.props.getImageURL !== prevProps.getImageURL
		) {
			this.updateItem();
		}
	}

	onItemLoaded = (item) => {
		this.setState({
			item,
			loading: false,
			image: this.props.getImageURL(item),
		});
	};

	updateItem = () => {
		const { itemId, getData } = this.props;

		this.setState({ loading: true });

		if (!itemId) {
			return;
		}

		getData(itemId)
			.then(this.onItemLoaded)
			.catch((error) => 'Error occured updating the item:' + error);
	};

	render() {
		const { item, image } = this.state;
		if (!item) {
			return <span>Please select a item to display.</span>;
		}

		const spinner = this.state.loading ? <Spinner /> : null;
		const itemView = !this.state.loading ? (
			<ShowItem item={item} image={image} props={this.props} />
		) : null;

		return (
			<div className='item-details card'>
				{spinner}
				{itemView}
			</div>
		);
	}
}

const ShowItem = ({ item, image, props }) => {
	const { name } = item;

	return (
		<>
			<img className='item-image' src={image} alt=' ' />

			<div className='card-body'>
				<h4>{name}</h4>
				<ul className='list-group list-group-flush'>
					{React.Children.map(props.children, (child) => {
						return React.cloneElement(child, { item });
					})}
				</ul>
				<ErrorButton />
			</div>
		</>
	);
};
