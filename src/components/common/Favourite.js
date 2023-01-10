import React, { useState } from "react";

import { makeStyles, Paper } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  star: {
    position: "absolute",
    right: "10px",
    top: "15px",
    color: "#eab00a",
    cursor: "pointer",
  },
}));

const Favourite = ({ onFavouriteSelection, isFavourite }) => {
  const [isFavouriteCharacter, setFavouriteCharacter] = useState(isFavourite);
  const styles = useStyles();

  return (
    <Paper className={styles.star} title="Add to your Favourites" onClick={(e) => {
      e.stopPropagation();
      setFavouriteCharacter(!isFavouriteCharacter);
      onFavouriteSelection();
    }}>
      { isFavourite ? <Star /> : <StarBorder /> }
    </Paper>
  )
};

export { Favourite };