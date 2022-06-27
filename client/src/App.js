import './App.css';
import {Switch, Route} from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home'
import CountryDetail from './components/Details';
import CreateActivity from './components/Form';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path='' component={}/> */}
        <Route path='/create/activity' component={CreateActivity}/>
        <Route path='/countries/:countryId' component={CountryDetail}/>
        <Route path='/countries' component={Home}/>
        <Route path='/' exact component={Landing}/>
      </Switch>
    </div>
  );
}

export default App;
