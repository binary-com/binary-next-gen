import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Direction, NumberColored } from '../_common';
import WatchlistSparkline from './WatchlistSparkline';

export default class WatchlistRow extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		assetName: PropTypes.string.isRequired,
		diff: PropTypes.number.isRequired,
		history: PropTypes.array.isRequired,
		quote: PropTypes.number.isRequired,
	};

	render() {
		const { assetName, diff, history, quote } = this.props;

		return (
			<tr>
				<td><Direction diff={diff} /></td>
				<td>{assetName}</td>
				<td><NumberColored value={quote} /></td>
				<td><NumberColored value={diff} /></td>
				<td><WatchlistSparkline history={history} /></td>
			</tr>
		);
	}
}
