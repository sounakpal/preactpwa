import { h, Component } from 'preact';
import style from './style';
import { Link } from 'preact-router/match';

export default class List extends Component {

	render( ) {
		const description = {
			fontSize: '12px',
			color: '#000',
			margin: 0
		};
		const container ={
			display: 'grid',
			gridTemplateColumns: '45px 1fr',
			gridTemplateRows: '20px  1fr'
		}
		const icon = {
			gridArea: '1 / 1 / 4 / 2'
		}
		const nameTag = {
			fontSize: '18px',
			fontWeight: '400',
			margin: 0,
			color: '#000'
		}
		let self = this;
		let listItems = this.props.items.map(function(item) {
			return (
				<li data-Key={item.name} onClick={self.listClick}>
					<Link href={`/profile/${item.name}`} activeClassName="active">
						<div class="container" style={container}>
							<img src={item.imgUrl} alt=""  style={icon} />
							<h3 style={nameTag}>
								{item.name}
							</h3>
							<p class="rating-count" style={description}>
								{item.description} 
							</p>
						</div>
					</Link>

				</li>
			);
		});
		return ( 
			<div class={style.list}>
				<div >
					<h3>The List of People</h3>
					<ul>
						{listItems}
					</ul>
				</div>
			</div>
		);
	}
}
