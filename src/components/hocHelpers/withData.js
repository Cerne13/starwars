import React, { Component } from 'react';
import Spinner from '../Spinner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const withData = (View, getData) => {
	return class extends Component {
		state = {
			data: null,
		};

		componentDidMount() {
			getData().then((data) => {
				this.setState({
					data,
				});
			});
		}

		render() {
			const { data } = this.state;

			if (!data) {
				return <Spinner />;
			}

			return (
				<ErrorBoundary>
					<View {...this.props} data={data} />
				</ErrorBoundary>
			);
		}
	};
};

export { withData };
