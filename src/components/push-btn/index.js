import { h, Component } from 'preact';
import style from './style';

let swRegistration ={};
export default class Pushbutton extends Component {
    constructor() {
        super();
        this.state = {
          isSubscribed:false,
          textContent: "Enable Push"
        }

    }

    componentDidMount() {
        let self = this;
        if ('serviceWorker' in navigator && 'PushManager' in window) {

            navigator.serviceWorker.register('sk.js')
                .then(function(swReg) {

                    swRegistration = swReg;
                    //self.setState({'swRegistration',swRegistration});
                    self.startPush(swRegistration);
                })
                .catch(function(error) {
                });
        } else {
            //pushButton.textContent = 'Push Not Supported';
        }
    }
    startPush(swRegistration) {
        var self = this;

        self.textbutton.addEventListener('click', function() {
            self.textbutton.disabled = true;
            if (self.state.isSubscribed) {
                // TODO: Unsubscribe user
                alert('Nothing Happens!!')
            } else {
                self.allowUserForPush();
            }
        });
        // Set the initial subscription value
        swRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                self.setState({'isSubscribed':!(subscription === null)});

                if (self.state.isSubscribed) {
                } else {
                }

                self.modifyBtn();
            });
    }

    modifyBtn() {
        this.setState({'textContent': (this.state.isSubscribed ?'Disable Push Messaging':'Enable Push Messaging')})
        
        this.textbutton.disabled = false;

    }
    urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }
    allowUserForPush() {
        const applicationServerPublicKey = 'BOoxiUA7vdUF_Rsi6u3AEZfTfhGMorLFDUhp3ezaUaJKGYIqRAnCk2xMopPa83Y5V57gIfbZBsoRw12Lxnaok3s';
        const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
        let self = this;
        swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey
            })
            .then(function(subscription) {

                //updateSubscriptionOnServer(subscription);

                self.setState({'isSubscribed':true});

                self.modifyBtn();
            })
            .catch(function(err) {

                self.textbutton.disabled = true;
                //self.modifyBtn();
                self.setState({'textContent': 'Push disabled'})

            });
    }
    render() {
        return ( < button id = "button"
            ref={(button) => { this.textbutton = button; }}>
            {this.state.textContent}
            < /button>
        );
    }
}
