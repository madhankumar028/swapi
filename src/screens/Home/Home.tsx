import { useState, useEffect } from "react";

import { Button, Switch, makeStyles, createStyles } from "@material-ui/core";
import { debounce } from 'lodash';

import { CharacterCard, NoResults, ServerError, SearchBar, CharacterLoadingCard } from "../../components/common";
import CharacterDialog from "../../components/CharacterDialog";

import { useSmallScreen, useLocalStorage } from "../../hooks";

const useStyles = makeStyles(() => createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "64px",
    backgroundImage: "url('https://github.githubassets.com/images/modules/site/home-campaign/hero-bg-2x.webp')",
  },
  switchWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%",
    alignItems: "center",
  },
  switchLabel: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#6e7781",
  },
  results: {
    display: "grid",
    justifyContent: "center",
  },
  loadMore: {
    fontWeight: "bold",
    margin: "20px 0",
    background: "linear-gradient(180deg, rgba(183, 52, 179, 0.15) 0%, rgba(164, 46, 156, 0) 100%), #6e40c9",
  },
}));

const Home = () => {
  const styles = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isFavouriteView, setFavouriteView] = useState(false);
  const [smallScreen] = useSmallScreen();

  const [starwarsTeam, setStarwarsTeam] = useLocalStorage("starwarsTeam", {
    characters: [],
    favouriteCharacters: [],
  });

  const fetchCharacters = (searchkey) => {
    const endpoint = searchkey ? `?search=${searchkey}` : "";
    setError(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/people/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setStarwarsTeam(storage => ({
          ...storage,
          characters: data?.results.map(character => {
            character.isFavourite = false;
            return character;
          }),
        }));
      })
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const debounceSearch = debounce(fetchCharacters, 500);

  const getMore = () => {
    setLoadingMore(true);
    fetch(data.next)
      .then(res => res.json())
      .then(data => {
        setData(prevData => ({ ...data, results: [...prevData.results, ...data.results] }));
        const formattedPaginatedCharacters = data?.results.map(character => {
          character.isFavourite = false;
          return character;
        });
        setStarwarsTeam(storage => ({
          ...storage,
          characters: [...storage.characters, ...formattedPaginatedCharacters],
        }));
      })
      .catch(err => {
        setError(true);
        console.error(err);
      })
      .finally(() => setLoadingMore(false));
  };

  const onFavouriteSelection = (character) => {
    const { favouriteCharacters, characters } = starwarsTeam;
    const clonedFavourites = [...favouriteCharacters];
    const clonedCharacters = [...characters];

    const favouriteIndex = clonedFavourites.findIndex(favourite => (favourite.url === character.url));
    const characterIndex = clonedCharacters.findIndex(clonedCharacter => (clonedCharacter.url === character.url));

    favouriteIndex >= 0
      ? clonedFavourites.splice(favouriteIndex, 1)
      : clonedFavourites.push(character);

    clonedCharacters[characterIndex].isFavourite = characterIndex >= 0 ? true : false;

    setStarwarsTeam(prevTeam => ({
      ...prevTeam,
      favouriteCharacters: clonedFavourites,
      characters: clonedCharacters,
    }));
  };

  const toggleFavouriteView = () => {
    setFavouriteView(!isFavouriteView);
  }

  useEffect(() => {
    fetchCharacters('');
  }, []);

  useEffect(() => {
    if (selectedCharacter) setOpenCharacterDialog(true);
    else setOpenCharacterDialog(false);
  }, [selectedCharacter]);

  return (
    <>
      <div className={styles.container}>
        <h1>Starwars Characters</h1>
        <SearchBar
          searchHandler={debounceSearch}
        />
        <div className={styles.switchWrapper}>
          <Switch
            checked={isFavouriteView}
            onChange={toggleFavouriteView}
            inputProps={{ 'aria-label': 'controlled' }}
            color="default"
          />
          <label className={styles.switchLabel}>My Favourites</label>
        </div>
        <div
          className={styles.results}
          style={{ 'gridTemplateColumns' : (smallScreen || !starwarsTeam?.characters?.length) ? '1fr' : '1fr 1fr 1fr'}}
        >
          {loading ? (
            <CharacterLoadingCard amount={10} />
          ) : starwarsTeam?.characters?.length === 0 ? (
            <NoResults title="No characters found" text="We cannot find the character you are searching for." />
          ) : (
            starwarsTeam?.characters.map(character => (
              <CharacterCard
                character={character}
                onClick={() => setSelectedCharacter(character)}
                key={character.name}
                onFavouriteSelection={() => onFavouriteSelection(character)}
              />
            ))
          )}
          {loadingMore && <CharacterLoadingCard amount={5} />}
        </div>
        {data?.next && !loading && !loadingMore && (
          <Button onClick={getMore} className={styles.loadMore}>
            Load more characters
          </Button>
        )}
      </div>
      {
        (selectedCharacter && Object.keys(selectedCharacter).length) && (
          <CharacterDialog
            open={openCharacterDialog}
            onClose={() => setSelectedCharacter(null)}
            character={selectedCharacter}
          />
        )
      }
      {error && <ServerError open={error} onClose={() => setError(false)} />}
    </>
  );
};

export default Home;
