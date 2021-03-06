import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { M } from 'binary-components';
import AccountItemsList from './AccountItemsList';
import { signOut } from '../_data/Auth';

type Account = {
	account: string,
	token: string,
};

@connect(state => ({ landingCompany: state.boot.toJS().landingCompany }))
export default class WebSidebar extends PureComponent {

	props: {
		email: string,
		loginid: string,
		accounts: Account[],
        upgradeInfo: object,
    };

	onSignOut(e: SyntheticEvent) {
		e.stopPropagation();
		signOut();
	}

	render() {
		const { loginid, email } = this.props;

    return (
			<nav className="sidebar">
				<div className="account-info">
					{loginid}<br />
					{email}<br />
				</div>
				<AccountItemsList {...this.props} />
				{/* <SidebarBtn to="/deposit" img="img/profit.svg" text="Deposit" /> */}
				<a className="sidebar-btn" onClick={this.onSignOut} >
					<img src="img/signout.svg" role="presentation" />
					<M m="Sign Out" />
				</a>
			</nav>
		);
	}
}
