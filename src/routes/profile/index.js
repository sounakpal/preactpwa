import { h, Component } from 'preact';
import style from './style';

export default class Profile extends Component {
	
	// Note: `user` comes from the URL, courtesy of our router
	render({ user }, { time, count }) {
		const OBJ = this.props.items.find((value, index) => {
		   return value.name == user;
		});

		if(!OBJ){
			return;
		}
		return (
			<div class={style.profile}>
				
				<h2>{OBJ.name}</h2>
				<img src={OBJ.imgUrlMedium}></img>
				<p>{OBJ.description}.</p>

				

				<section>
					<a href="tel:[[phoneNumber]]" href={`tel:${OBJ.phone}`} >
                         Call {OBJ.phone}
                    </a>
					<a href={OBJ.url} target="_blank">
                          Favourite Website
                    </a>
					<a href={OBJ.imgUrlBig} download>
                          Download photo
                    </a>

				</section>
			</div>
		);
	}
}
