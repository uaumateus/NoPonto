import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import NewRoute from './pages/NewRoute';
import Modal from './components/Modals/SimpleModal';

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        NewRoute,
        Modal
    }, {
        headerMode: 'none',
        navigationOptions: {headerVisible: false,}
    })
);

export default Routes;