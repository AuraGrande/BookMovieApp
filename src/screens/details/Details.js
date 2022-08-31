import React, { useEffect, useState } from 'react';
import './Details.css';
import Header from "../../common/header/Header.js";
import { 
    Typography,
    GridList,
    GridListTile,
    GridListTileBar,
    makeStyles,
}from "@material-ui/core";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

function youtube_parser(url){
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[1].length==11)? match[1] : false;
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
  
      "& > * + *": {
        marginTop: theme.spacing(1)
      }
    },
    emptyStar: {
      color: "black"
    }
}));

function Details(props){

    const [posterUrl, setPosterUrl] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [durationHolder, setDurationHolder] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [ratingHolder, setRatingHolder] = useState("");
    const [storyLine, setStoryLine] = useState("");
    const [wikiLink, setWikiLink] = useState("");
    const [youtubeEmbedValue, setYoutubeEmbedValue] = useState("");
    const [genreHolder, setGenreHolder] = useState([]);
    const [artistHolder, setArtistHolder] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        fetch(props.baseUrl + "movies/" + props.match.params.id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
            }
          })
            .then((response) => response.json())
            .then((response) => {
                setPosterUrl(response.poster_url);
                setMovieTitle(response.title);
                setDurationHolder(response.duration);
                setReleaseDate(response.release_date);
                setRatingHolder(response.rating);
                setStoryLine(response.storyline);
                setWikiLink(response.wiki_url);
                setYoutubeEmbedValue(youtube_parser(response.trailer_url));
                let genreCollector = [];
                for(let data of response.genres){
                    genreCollector.push(data);
                }
                setGenreHolder(genreCollector);
                let artistCollector = [];
                for(let data of response.artists){
                    artistCollector.push({
                        artistName: data.first_name+" "+data.last_name,
                        artistURL: data.profile_url
                    });
                }
                setArtistHolder(artistCollector);
                console.log(artistHolder);
            })
    },[]);

    const mainBody = (
        <div>
            <Header isDetailsPage="yes" />
                <div className="backtohome">
                    <Link style={{textDecoration: 'none'}} to={"/"}>
                        <Typography className="back">
                            &lt; Back to Home
                        </Typography>
                    </Link>
                </div>
                <div className="mainbody">
                    <div className="picturetab" >
                        <GridList cellHeight={480} cols={1} style={{ flexWrap: 'nowrap'}}>
                            <GridListTile><img src={posterUrl} alt={movieTitle} /></GridListTile>
                        </GridList>
                    </div>
                    <div className="maintab">
                        <div>
                            <Typography variant="h2">{movieTitle}</Typography>
                            <Typography><b>Genre:</b> {genreHolder.join(", ")}</Typography>
                            <Typography><b>Duration:</b> {durationHolder}</Typography>
                            <Typography><b>Release Date:</b> {releaseDate}</Typography>
                            <Typography><b>Rating:</b> {ratingHolder}</Typography>
                            <div className="plotline">
                                <Typography><b>Plot:</b> <a href={wikiLink}>(Wiki Link)</a> {storyLine}</Typography>
                            </div>
                            <div className="video-responsive">
                                <iframe
                                    width="100%"
                                    height="480"
                                    src={`https://www.youtube.com/embed/${youtubeEmbedValue}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={movieTitle}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="actortab">
                        <div>
                            <div className="ratingattrib">
                                <Typography><b>Rate this movie:</b></Typography>
                                <div className={classes.root}>
                                    <Rating
                                        name="half-rating-read"
                                        defaultValue={0.0}
                                        precision={0.5}
                                        emptyIcon={
                                            <StarBorderIcon fontSize="inherit" className={classes.emptyStar} />
                                        }
                                    />
                                </div>
                            </div>
                            <div className="artistattrib">
                                <div className="artist"><Typography><b>Artist:</b></Typography></div>
                                <GridList cellHeight={180} cols={2} >
                                    {artistHolder.map((data) => (
                                        <GridListTile key={data.artistName} style={{cursor: 'pointer'}}>
                                            <img src={data.artistURL} alt={data.artistName} width="100%" />
                                        <GridListTileBar title={data.artistName}/>
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                        </div>    
                    </div>
                </div>
        </div>
    );
    return mainBody;
}

export default Details;