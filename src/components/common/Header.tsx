import { AppBar, makeStyles, createStyles, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSmallScreen } from "../../hooks";

const useStyles = makeStyles(theme => createStyles({
  header: {
    position: "fixed",
    top: "0",
    maxHeight: "64px",
    zIndex: 900,
    backgroundColor: "#0d1117",
    padding: "2px 0",
    [theme.breakpoints.up("sm")]: {
      marginBottom: 20,
    },
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#DBA90C",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 15,
  },
  icon: {
    fontSize: 24,
  },
}));

const Header = () => {
  const styles = useStyles();
  const [smallScreen] = useSmallScreen();
  return (
    <AppBar className={styles.header} elevation={1} position="static">
      <Toolbar>
        <Link to="/" className={styles.logo}>
          <img
            src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
            width={smallScreen ? 90 : 100}
            alt="logo"
          />
        </Link>
        {!smallScreen && <div style={{ width: 20 }} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
