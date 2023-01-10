import React from "react";
import { FindInPage } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    width: 250,
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "70vh",
  },
  icon: {
    fontSize: 90,
    color: "#80808094",
  },
  title: {
    color: "gray",
    marginTop: 10,
    marginBottom: 0,
    fontWeight: "600",
    fontSize: 16,
  },
  text: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
}));

const NoResults = ({ title, text }) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <FindInPage className={styles.icon} />
      <p className={styles.title}>{title}</p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default NoResults;
