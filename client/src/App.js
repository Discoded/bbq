import {React} from 'react';
import { Route } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';

import PostList from './components/PostList';

import Dashboard from './Dashboard/Dashboard';

function App() {
  return <Admin 
    dashboard={Dashboard} 
    dataProvider={restProvider('http://192.168.0.117:3000')} 
    >
      <Resource name='Infograph' list={PostList}/>
      {/* <Resource name='users' list={TestList}/> */}
  </Admin>
}

export default App;