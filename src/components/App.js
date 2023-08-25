import {data} from "../data"
import {connect} from "react-redux";
import React from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
//import { Storecontext } from "..";
class  App extends React.Component{
     componentDidMount(){
           this.props.dispatch(addMovies(data));
           //this.forceUpdate();
     }
     onChangeTab=(val)=>{
          this.props.dispatch(setShowFavourites(val));
     }
     isMovieFavourite=(movie)=>{
           const {movies}=this.props
           const {favourites}=movies;
           const index=favourites.indexOf(movie);
           if(index!==-1){
                   return true;
           }
           else return false;
     }
  render(){
        console.log(this.props);
        const {movies}=this.props
       const {list,favourites,showFavourites}=movies;
       const displayMovies=showFavourites?favourites:list; 
       return (
    <div className="App">
          <Navbar/>
          <div className="main">
            <div className="tabs">
              <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
              <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={()=>this.onChangeTab(true)} >Favourites</div>
            </div>
            <div className="list">
                     {displayMovies.map((movie,index)=>(
                      <MovieCard movie={movie} 
                      key={`movie-${index}`} 
                      dispatch={this.props.dispatch}
                      isFavourite={this.isMovieFavourite(movie)}
                      />
                     ))}
                     {displayMovies.length===0&&<div className="no-movies">NO movies to show!</div>}
            </div>
          </div>
    </div>
  );
                     }
}
// class AppWrapper extends React.Component{
//       render(){
//             return(
//                   <Storecontext.Consumer>
//                         {(store)=><App store={store}/>}
//                   </Storecontext.Consumer>
//             )
//       }
// }
function callback({movies,search}){
      return {
            movies,
            search,
      }
}
// function mapStateToProps({ search,movies }) {
//       return {
//         search,
//         movies
//       };
//     }
const connectedcomponent=connect(callback)(App);
export default connectedcomponent;
//export default AppWrapper;