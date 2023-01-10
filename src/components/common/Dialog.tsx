import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  makeStyles,
  useMediaQuery,
  useTheme,
  createStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(() => createStyles({
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    margin: 0,
    fontSize: 22,
  },
}));

const DialogTitle = ({ children, onClose, style, ...other }) => {
  const styles = useStyles();
  return (
    <MuiDialogTitle disableTypography {...other} style={{ paddingBottom: 0, ...style }}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{children}</p>
        <IconButton aria-label="close" onClick={onClose} style={{ padding: 4 }}>
          <Close />
        </IconButton>
      </div>
    </MuiDialogTitle>
  );
};

const Dialog = ({ title, open, onClose, children, titleStyle }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <MuiDialog
      onClose={onClose}
      open={open}
      maxWidth="xs"
      fullScreen={fullScreen}
      PaperProps={{
        style: {
          backgroundColor: "#2c3238",
          borderRadius: "8px"
        }
      }}
      fullWidth
    >
      <DialogTitle onClose={onClose} style={titleStyle}>
        {title}
      </DialogTitle>
      <DialogContent style={{ padding: "0px 24px" }}>{children}</DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
