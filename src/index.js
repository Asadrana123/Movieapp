import React, { createContext } from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom/client';
import thunk from 'redux-thunk';
import './index.css';
import combineReducers from './reducers/reducers';
import { applyMiddleware } from 'redux';
import { createStore } from 'redux';
import App from './components/App';
/*const logger=function ({dispatch,getState}){
      return function(next){
        return function(action){
              //middlewarecode 
              console.log("action",action.type)
              next(action);
        }
      }
}*/
const logger=({dispatch,getState})=>(next)=>(action)=>{
     if(typeof action!='function'){
      console.log("action_type",action.type);  
     }
     next(action);
}
export const Storecontext=createContext();
// class Provider extends React.Component{
//   render(){ 
//     const {store}=this.props;
//     return <Storecontext.Provider value={store}>{this.props.children}</Storecontext.Provider>
//   }
// }
// const thunk=({dispatch,getState})=>(next)=>(action)=>{
//   if(typeof action==='function'){
//       action(dispatch);
//       return;
//   } 
//   next(action);
// }
const store=createStore(combineReducers,applyMiddleware(logger,thunk));
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
ReactDOM.createRoot(document.getElementById("root")).render(
	 <React.StrictMode>
  <Provider store={store}>
      <App />
     </Provider>
	 </React.StrictMode>
);
