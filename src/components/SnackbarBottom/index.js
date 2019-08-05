import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

export const withSnackbarBottom = WarppedComponent => (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const snackbar = open ? (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      key="bottom,right"
      open={true}
      onClose={() => setOpen(false)}
      message={message}
      TransitionComponent={Slide}
    />
  ) : null;

  const openSnackbar = (msg) => {
    setMessage(msg);
    setOpen(true);
  }

  return (
    <>
      <WarppedComponent openSnackbar={openSnackbar} {...props} />
      { snackbar }
    </>
  );
};
