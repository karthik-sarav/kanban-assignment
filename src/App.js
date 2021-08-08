import './App.css';
import HomeScreen from './Screens/HomeScreen';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './Reducers/RootReducer';

function App() {
  const store = createStore(RootReducer);
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

export default App;
