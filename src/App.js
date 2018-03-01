import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import reducers from './reducers';
import Main from './Main';
import SplashScreen from './components/SplashScreen';

const middleware = applyMiddleware(ReduxThunk);
let store = createStore(reducers, {}, middleware);

class App extends Component {

  constructor(props) {
     super(props);
     this.state = {
       isStoreLoading: false,
       store
     };
   }

   componentWillMount() {
      this.setState({ isStoreLoading: true });
      AsyncStorage.getItem('@BlogStore:auth').then((value) => {
        if (value && value.length) {
          const parsedValue = JSON.parse(value);
          const user = parsedValue.user;
          const token = parsedValue.token;
          const initialStore = { auth: { token, user, loggedIn: true } };
          this.setState({ store: createStore(reducers, initialStore, middleware) });
        } else {
          this.setState({ store });
        }
        this.setState({ isStoreLoading: false });
      }).catch((error) => {
        console.log('Error reading store', error);
        this.setState({ store });
        this.setState({ isStoreLoading: false });
      });
    }


  render() {
    if (this.state.isStoreLoading) {
        return <SplashScreen />;
    } else {
      return (
        <Provider store={this.state.store}>
          <Main />
        </Provider>
      );
    }
  }
}

export default App;
