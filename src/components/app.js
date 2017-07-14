import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Profile from '../routes/profile';
import List from '../routes/list';


export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	constructor() {
		super();
		let self = this;
		this.state = {
			items:[]
		}

	};	
	componentDidMount(){

		let request = new Request('../assets/data.json', {
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			method: 'get'
		});

		fetch(request).then((response) =>{
			//save is session
			return response.json();
		}).then((r)=>{
			this.setState({'items':r});
			window.localStorage.setItem('Results',JSON.stringify(r));
		}).catch((err)=> {
			// Error :(
			//call for session storage
			let Results = window.localStorage.setItem('Results');
			this.setState({'items':JSON.parse(Results)});
		});
	}
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({},{items}) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Profile path="/profile/:user" items={items} />
					<List path="/" items={items}/>
				</Router>
			</div>
		);
	}
}
