import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Pushbutton from './push-btn';
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
            items: [],
            name:'Headers',
            routes: 0,
            pauseloop:false
        }

    };
    componentDidMount() {
        let request = new Request('../assets/data.json', {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'get'
        });

        fetch(request).then((response) => {
            //save is session
            return response.json();
        }).then((r) => {
            this.setState({ 'items': r });
            window.localStorage.setItem('Results', JSON.stringify(r));
        }).catch((err) => {
            // Error :(
            //call for session storage
            let Results = window.localStorage.setItem('Results');
            this.setState({ 'items': JSON.parse(Results) });
        });
    }
    handleRoute = e => {

        this.currentUrl = e.url;
        this.handleBackFunctionality(e);
        this.setState({'name': e.url.indexOf('profile') > 0 ? 'Profile page' : 'List Page'})
        
    }
    handleBackFunctionality(e){
        //only for mobiles
        if (typeof window.orientation == 'undefined'){
            return;
        }
        this.setState({ 'routes': this.state.routes + 1 });
        setTimeout((e) => {
            console.log(this.state.routes);
            this.setState({ 'routes': this.state.routes - 1 })
        }, 500);


        if (this.state.routes > 2 && !this.state.pauseloop ) {
            this.setState({pauseloop:true});
            for (let i = 0; i < window.history.length; i++) {
                try {
                    history.back();
                } catch (err) {
                    console.log(err);
                }
            }
            this.setState({pauseloop:false});
        }
    }
    render({}, { items ,name}) {
        return ( < div id = "app" >
            < Header name={name}/ >
            < Router onChange = { this.handleRoute } >
	            < Profile path="/profile/:user" items={items}/>
	            < List path = "/" items={items}/> 
            < /Router > 
            < Pushbutton / >
            < /div>
        );
    }
}
