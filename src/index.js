import React, {Component} from 'react';
import Routes from './routes';

class App extends Component {
    componentDidMount(){
        console.disableYellowBox = true;
    }
    render(){
        return <Routes />
    }
}

export default App;
