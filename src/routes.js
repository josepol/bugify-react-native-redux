import { createStackNavigator, createDrawerNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './screens/home/home.screen';
import LoginScreen from './screens/login/login.screen';
import SplashScreen from './screens/splash/splash.screen';
import Theme from './theme';
import Drawer from './components/drawer';

const AppNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        Splash: SplashScreen,
        Home: HomeScreen
    }, {
        initialRouteName: 'Splash',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Theme.primaryColor
            },
            headerTitleStyle: {
                color: Theme.white,
                fontSize: 22,
                fontWeight: 'bold'
            }
        }
    }
);

const DrawerNavigator = createDrawerNavigator({
    Home: AppNavigator,
}, {
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: Drawer,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    }
});

export default createAppContainer(DrawerNavigator);