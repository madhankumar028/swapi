/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { Button, Switch, makeStyles, createStyles } from "@material-ui/core";
import { debounce } from 'lodash';

import { CharacterCard, NoResults, ServerError, SearchBar, CharacterLoadingCard } from "../../components/common";
import CharacterDialog from "../../components/CharacterDialog";

import { useSmallScreen, useLocalStorage } from "../../hooks";
import { IStarwarsResponse } from "./types"

const useStyles = makeStyles(() => createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "64px",
    backgroundImage: "url('https://github.githubassets.com/images/modules/site/home-campaign/hero-bg-2x.webp')",
    minHeight: "calc(100vh - 70px)"
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
  const [data, setData] = useState<IStarwarsResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isFavouriteView, setFavouriteView] = useState(false);
  const [smallScreen] = useSmallScreen();

  const [starwarsTeam, setStarwarsTeam] = useLocalStorage("starwarsTeam", {
    characters: [],
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

  const onFavouriteSelection = (character, isChecked) => {
    const { characters } = starwarsTeam;
    const clonedCharacters = [...characters];
    const characterIndex = clonedCharacters.findIndex(clonedCharacter => (clonedCharacter.url === character.url));
    if (characterIndex >=0 ) {
      clonedCharacters[characterIndex].isFavourite = isChecked;
    }
    setStarwarsTeam(prevTeam => ({
      ...prevTeam,
      characters: clonedCharacters,
    }));
  };

  const getCharacterView = (list) => {
    let characters = list;

    if (isFavouriteView) {
      characters = characters.filter(character => character.isFavourite);
    }

    if (!list.length || !characters.length) {
      return (
        <NoResults
          title={`No ${isFavouriteView ? 'Favourites' : 'Characters'} found`}
          text={`We cannot find the ${isFavouriteView ? 'Favourites' : 'Characters'} you are searching for.`}
        />
      )
    }

    return characters.map(character => (
      <CharacterCard
        character={character}
        onClick={() => setSelectedCharacter(character)}
        key={character.name}
        onFavouriteSelection={(isChecked) => onFavouriteSelection(character, isChecked)}
      />
    ))
  }

  const toggleFavouriteView = () => {
    setFavouriteView(!isFavouriteView);
  }

  useEffect(() => {
    fetchCharacters('');
    return () => {
      setData(null);
    };
  }, []);

  useEffect(() => {
    if (selectedCharacter) setOpenCharacterDialog(true);
    else setOpenCharacterDialog(false);
  }, [selectedCharacter]);

  return (
    <>
      <div className={styles.container}>
        <h1>Starwars {isFavouriteView ? 'Favourite Characters' : 'Characters'}</h1>
        <SearchBar
          searchHandler={debounceSearch}
          isFavouriteView={isFavouriteView}
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
          style={{
            'gridTemplateColumns' : (smallScreen || !starwarsTeam?.characters?.length) ? '1fr' : '1fr 1fr 1fr'
          }}
        >
          {
            loading
              ? ( <CharacterLoadingCard amount={10} /> )
              : getCharacterView(starwarsTeam?.characters)
          }
          {!isFavouriteView && loadingMore && <CharacterLoadingCard amount={5} />}
        </div>
        {(!isFavouriteView && (data?.next && !loading && !loadingMore)) && (
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
