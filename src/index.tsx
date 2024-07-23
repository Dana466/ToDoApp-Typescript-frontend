import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
//import { router } from './routes/routehandling';
import {Signup} from './pages/Register';
import { Login } from './pages/Login';
import TaskstoDo from './pages/Tasks';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
   <Route path ='/registerform' element={<Signup/>}></Route>
<Route path ='/loginform' element={<Login/>}></Route>
<Route path ='/todo' element={<TaskstoDo/>}></Route>
<Route path='/' element={<Navigate to={'/registerform'}/>} />
   </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//<App/>