import React, { MouseEvent } from 'react';

import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  icon: {
    color: "#FFFFFF !important",
  },
});

interface IAnchor {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};

interface IToast {
  open: boolean;
  duration: number;
  onClose(e: MouseEvent<HTMLElement>): void;
  anchor: IAnchor;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
  style: React.CSSProperties;
};

const Toast = withStyles(styles)((props: IToast) => {
  const {
    open,
    duration = 6000,
    onClose,
    anchor = { vertical: "bottom", horizontal: "right" },
    text,
    type,
    style,
  } = props;

  return open ? (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={anchor}>
      <Alert variant="filled" onClose={onClose} severity={type} style={style}>
        {text}
      </Alert>
    </Snackbar>
  ) : null;
});

const ErrorToast = props => {
  return <Toast type="error" style={{ color: "#FFFFFF" }} {...props} />;
};

const ServerError = ({ open, onClose }) => (
  <ErrorToast open={open} onClose={onClose} text="Something went wrong. Please try again later." />
);

export { ErrorToast, ServerError };
