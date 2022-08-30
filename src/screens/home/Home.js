import React, { useEffect, useState } from "react";
import './Home.css';
import Header from "../../common/header/Header";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControl,
  TextField,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  InputLabel,
} from "@material-ui/core";

import { 
  Theme, 
  createStyles, 
  makeStyles,
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      height: '27%',
      width: '85%',
    },
    titleColor: {
      color: theme.palette.primary.light
    },
    compAttribs: {
      width: "95%",
      padding: theme.spacing.unit
    }
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center"
  },
  variant: "menu"
};

function Home(props){

  const [upComingMovie, setUpComingMovie] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [selected, setSelected] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [artistName, setArtistName] = useState([]);
  const classes = useStyles();

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
      fetch(props.baseUrl + "genres", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        }
      })
        .then((response) => response.json())
        .then((response) => {
          let genreOptions = [];
          for(let data of response.genres){
            genreOptions.push(data.genre);
          }
          console.log(genreOptions);
          setGenreOptions(genreOptions);
        })
      fetch(props.baseUrl + "artists", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        }
      })
        .then((response) => response.json())
        .then((response) => {
          let artistNamer = [];
          for(let data of response.artists){
            if(data.role_type === "ACTOR"){
              artistNamer.push(data.first_name + " " + data.last_name);
            }
          }
          console.log(artistNamer);
          setArtistName(artistNamer);
        })
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === genreOptions.length ? [] : genreOptions);
      return;
    }
    setSelected(value);
  };

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
                    <GridListTile key={data.id} style={{cursor: 'pointer'}}>
                      <img src={data.poster_url} alt={data.title} />
                      <GridListTileBar title={data.title}/>
                  </GridListTile>
                ))}
              </GridList>
              </div>


              <div className="filterTab">
                <Box className={classes.root}>
                  <Card>
                    <CardContent>
                      <Typography className={classes.titleColor} variant='string'>FIND MOVIES BY:</Typography>
                      <FormControl className={classes.compAttribs}>
                        <TextField id="standard-basic" label="Movie Name" variant="standard" />
                      </FormControl>

                      <FormControl className={classes.compAttribs}>
                        <TextField 
                          id="mutiple-select-label-genre"
                          select
                          label="Genre" 
                          variant="standard"
                          value={selected}
                          onChange={handleChange}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {genreOptions.map((genreOptions) => (
                            <MenuItem key={genreOptions} value={genreOptions}>
                              <ListItemIcon>
                                <Checkbox checked={selected.indexOf(genreOptions) > -1} />
                              </ListItemIcon>
                              <ListItemText primary={genreOptions} />
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>

                      <FormControl className={classes.compAttribs}>
                        <TextField
                          id="multiple-select-label-artists"
                          select
                          label="Artists"
                          variant="standard"
                          value={selected}
                          onChange={handleChange}
                          renderValue={(selected) => selected.join(",")}
                          MenuProps={MenuProps}
                        >
                          {artistName.map((artistName) =>(
                            <MenuItem key={artistName} value={artistName}>
                              <ListItemIcon>
                                <Checkbox checked={selected.indexOf(artistName) > -1} />
                              </ListItemIcon>
                              <ListItemText primary={artistName} />
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>

                      <FormControl className={classes.compAttribs}>
                        <TextField
                          name="someDate"
                          label="Release Date Start"
                          width="95%"
                          InputLabelProps={{ shrink: true, required: true }}
                          type="date"
                        />
                      </FormControl>

                      <FormControl className={classes.compAttribs}>
                        <TextField
                          name="someDate"
                          label="Release Date End"
                          InputLabelProps={{ shrink: true, required: true }}
                          type="date"
                        />
                      </FormControl>
                    </CardContent>
                    <CardActions>
                      <Button className={classes.compAttribs} variant="contained" color='primary'>Apply</Button>
                    </CardActions>
                  </Card>
                </Box>
              </div>
            </div>
        </div>
    );

  return mainBody;
}

export default Home;