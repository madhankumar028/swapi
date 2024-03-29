import { InputBase, makeStyles, createStyles, Paper } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { useSmallScreen } from "../../hooks";

const useStyles = makeStyles(() => createStyles({
  container: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    padding: 10,
    justifyContent: "space-between",
    minWidth: 300,
    marginBottom: 20,
    backgroundColor: "rgba(46,55,74,.82) !important",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    flex: 1,
  },
  searchIcon: {
    color: "#6e7781",
    paddingBottom: 2,
  },
  input: {
    paddingLeft: 10,
    width: "100%",
  },
}));

const SearchBar = ({ searchHandler, isFavouriteView }) => {
  const styles = useStyles();
  const [smallScreen] = useSmallScreen();
  return (
    <Paper
      className={styles.container}
      style={{ opacity: isFavouriteView ? "0.1" : "1" }}
    >
      <div className={styles.inputContainer}>
        <Search className={styles.searchIcon} />
        <InputBase
          placeholder={`Search ${smallScreen ? "" : "character"} by name`}
          inputProps={{ "aria-label": "search" }}
          className={styles.input}
          onChange={event => {
            event.persist();
            searchHandler(event.target.value);
          }}
        />
      </div>
    </Paper>
  );
};

export default SearchBar;
