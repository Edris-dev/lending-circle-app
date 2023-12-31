import React from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import { CreateGroup } from './components/Circle';
import {Register, SignIn} from './components/Users';
import { ViewGroup } from './components/Circle';


import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRouter from './components/PrivateRouter';
import CirclePage from './components/Circle/CirclePage/CirclePage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route index={true} path='/signin' element={<SignIn/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='' element={<PrivateRouter/>}>
        <Route path='/view-group' element={<ViewGroup/>} />
        <Route path='/create-group' element={<CreateGroup/>}/>
        <Route path='/circles/:groupId' element={<CirclePage/>}/>
      </Route>
    </Route>

  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <RouterProvider router={ router} />
  </Provider>
);

