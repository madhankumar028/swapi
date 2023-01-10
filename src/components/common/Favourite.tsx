import { useState } from "react";

import { makeStyles, Paper, createStyles } from "@material-ui/core";
import { Star, StarBorder } from "@material-ui/icons";

const useStyles = makeStyles(() => createStyles({
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
    <Paper className={styles.star} title="Add to your Favourites" onClick={(event) => {
      event.stopPropagation();
      setFavouriteCharacter(!isFavouriteCharacter);
      onFavouriteSelection(!isFavouriteCharacter);
    }}>
      { isFavourite ? <Star /> : <StarBorder /> }
    </Paper>
  )
};

export { Favourite };
