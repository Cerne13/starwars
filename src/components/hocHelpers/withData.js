import React, { Component } from 'react';
import Spinner from '../Spinner';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ErrorIndicator from '../ErrorIndicator';

const withData = (View) => {
	return class extends Component {
		state = {
			data: null,
			loading: true,
			error: false,
		};

		componentDidMount() {
			this.update();
		}
		componentDidUpdate(prevProps) {
			if (this.props.getData !== prevProps.getData) {
				this.update();
			}
		}

		update() {
			this.setState({
				loading: true,
				error: false,
			});

			this.props
				.getData()
				.then((data) => {
					this.setState({
						data,
						loading: false,
					});
				})
				.catch(() => {
					this.setState({ error: true, loading: false });
				});
		}

		render() {
			const { data, loading, error } = this.state;

			if (loading) {
				return <Spinner />;
			}

			if (error) {
				return <ErrorIndicator />;
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
