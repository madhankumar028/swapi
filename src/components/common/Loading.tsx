import { CircularProgress, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  message: {
    fontSize: 16,
    color: "#B7B7B7",
    fontWeight: 500,
  },
}));

const Loading = ({ size = 40, message, style }) => {
  const styles = useStyles();
  return (
    <div className={styles.container} style={style}>
      <CircularProgress size={size} color="primary" />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading;
