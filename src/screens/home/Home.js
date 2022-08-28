import React, { useEffect, useState } from "react";
import './Home.css';
import Header from "../../common/header/Header";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


function Home(props){

  const [upComingMovie, setUpComingMovie] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    let dataShows = null;

    fetch(props.baseUrl + "movies/?limit=17", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response.movies);
        let upComingArr = [];
        let movieDeetsArr = [];
        let count = 0;
        for(let data of response.movies) {
          upComingArr.push({
            id: count,
            title: data.title,
            poster_url: data.poster_url
          });
          movieDeetsArr.push({
            id: count,
            title: data.title,
            poster_url: data.poster_url
          });
          count = count + 1;
        }

        console.log(upComingArr);
        setUpComingMovie(upComingArr);
        setMovieDetails(movieDeetsArr);
      });
  }, []);

  const mainBody = (
        <div>
            <Header />
            
            <div className="upComingMovies">
                Upcoming Movies
            </div>
            <div>
              <GridList cellHeight={250} cols={6} style={{ flexWrap: 'nowrap', transform: 'translateZ(0)' }}>
                {upComingMovie.map((data) => (
                  <GridListTile key={data.id}>
                    <img src={data.poster_url} alt={data.title} />
                    <GridListTileBar title={data.title}/>
                  </GridListTile>
                ))}
              </GridList>
            </div>
            <div className="mainbody">
              <div className="movieTab">
                <GridList cellHeight={350} cols={4}>
                  {movieDetails.map((data) => (
                    <GridListTile key={data.id}>
                      <img src={data.poster_url} alt={data.title} />
                      <GridListTileBar title={data.title}/>
                  </GridListTile>
                ))}
              </GridList>
              </div>
              <div className="filterTab">2</div>
            </div>
        </div>
    );

  return mainBody;
}

export default Home;