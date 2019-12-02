import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import Routes from './routes';
import Boundary, {Events} from 'react-native-boundary';
import NotifService from './notifService';
import appConfig from '../app.json';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            senderId: appConfig.senderID,
        }
        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }
    componentDidMount = async () => {
        // console.disableYellowBox = true;
        const exist = await AsyncStorage.getItem('@NoPonto:ROUTES');
        if(exist !== null){
            let fences = JSON.parse(exist);
            for(var i = 0; i < fences.data.length; i++){
                console.warn(fences.data[i])
                Boundary.add({
                    lat: fences.data[i].locationLat,
                    lng: fences.data[i].locationLng,
                    radius: 200,
                    id: fences.data[i].name
                })
                .then(() => console.warn("success!"))
                .catch(e => console.warn("error :(", e));
                Boundary.on(Events.ENTER, id => {
                    this.notif.startPoint();
                });
            }
        }
    }

    onRegister(token) {
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }
    
    onNotif(notif) {
    }

    render(){
        return <Routes />
    }
}

export default App;
