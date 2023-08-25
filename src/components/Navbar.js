import React from "react";
import { connect } from 'react-redux';
//import { Storecontext } from "..";
import { addMoviesToList,handleMoviesSearch } from "../actions";
 class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchText:''
        };
    }
    handleAddtoMovies(movie){
        this.props.dispatch(addMoviesToList(movie));
        this.setState({
            showSearchResults:false
        })
    }
    handleSearch=()=>{
          const {searchText}=this.state;
          this.props.dispatch(handleMoviesSearch(searchText));
    }
    handleChange=(e)=>{
          this.setState({
            searchText:e.target.value
          })
    } 
    render(){
        const {result,showSearchResults}=this.props.search;
        return(
                <div className="nav">
                         <div className="search-container">
                             <input  value={this.searchText} onChange={this.handleChange}/>
                             <button id="search-btn" onClick={this.handleSearch}>Search</button>
                         </div>
                        {showSearchResults &&
                        <div className="search-results">
                        <div className="search-result">
                                <img src={result.Poster} alt="Movie-Poster"/>
                            <div className="movie-info">
                                    <span>{result.Title}</span>
                                    <button onClick={()=>this.handleAddtoMovies(result)}>Add to Movies</button>
                            </div>
                        </div>
                        </div>
                        }
                   </div>
        );
    }
}
// class NavbarWrapper extends React.Component{
//     render(){
//           return(
//                 <Storecontext.Consumer>
//                       {(store)=><Navbar dispatch={store.dispatch} search={this.props.search}/>}
//                 </Storecontext.Consumer>
//           )
//     }
// }
function mapStateToProps({ search }) {
    return {
      search,
    };
  }
  
export default connect(mapStateToProps)(Navbar);
//export default NavbarWrapper;