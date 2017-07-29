import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {
	
	render(props) {
		//debugger;
		return (
			<header class={style.header}>
				<h1>{props.name}</h1>
				<nav>
					<Link activeClassName={style.active} href="/">List</Link>
				</nav>
			</header>
		);
	}
}
