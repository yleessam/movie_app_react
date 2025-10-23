import React from "react";
import axios from 'axios';
import Movie from "./Movie";
import './App.css';

class App extends React.Component{
  state={
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    //const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    //console.log(movies.data.data.movies);
    const {
      data : {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    //console.log(movies);
    this.setState({movies, isLoading: false});
  };

  componentDidMount(){
    //영화데이터 로딩...

    //axios.get('https://yts.mx/api/v2/movie_details.json?movie_id=10');
    //const movies = axios.get('https://yts-proxy.now.sh/list_movies.json');
    this.getMovies();
  }
  render(){
    const {isLoading, movies} = this.state;
    return (
      <section className='container'>
        {isLoading ? (
          <div className='loader'>
            <span className='loader_text'>Loading...</span>
          </div>
          )
          : (
            <div className='movies'>
              { movies.map( movie => (
                  <Movie 
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.medium_cover_image}
                  />
                )
              )}
            </div>
          )}
      </section>
    );
  }
}
export default App;