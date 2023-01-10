import { useState } from "react";

import { makeStyles, createStyles, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { Attribute } from "./Attribute";
import { Favourite } from "./Favourite";

const useStyles = makeStyles(() => createStyles({
  container: {
    position: "relative",
    padding: "10px 20px",
    margin: 10,
    width: 300,
    cursor: "pointer",
    backgroundColor: "#161b22",
    borderRadius: "8px",
  },
  title: {
    margin: "5px 0",
    fontSize: 20,
    fontWeight: "bold",
  },
}));

const CharacterLoadingCard = ({ amount = 1 }) => {
  return (
    <>
      {
        [...Array(amount)].map((_value, i) => (
          <Skeleton style={{ margin: 10, borderRadius: 4 }} key={i} variant="rect" height={193} width={300} />
        ))
      }
    </>
  )
};

const CharacterCard = ({ character, onClick, onFavouriteSelection }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const styles = useStyles();

  return (
    <div onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      <Paper elevation={mouseOver ? 6 : 2} className={styles.container} onClick={onClick}>
        <p className={styles.title}>{character.name}</p>
        <Attribute field="Birth Year" value={character.birth_year} />
        <Attribute field="Height" value={`${character.height}${character.height !== "unknown" ? "m" : ""}`} />
        <Attribute field="Mass" value={`${character.mass}${character.mass !== "unknown" ? "kg" : ""}`} />
        <Favourite isFavourite={character.isFavourite} onFavouriteSelection={onFavouriteSelection} />
      </Paper>
    </div>
  );
};

export { CharacterLoadingCard, CharacterCard };
