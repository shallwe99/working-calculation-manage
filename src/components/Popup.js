// import React from 'react';
// import {
//   Button,
//   makeStyles,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Typography
// } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

// const RootDialog = styled(Dialog)(({ theme }) => ({
//   padding: theme.spacing(2),
//   position: 'absolute',
//   top: theme.spacing(5)
// }));

// const RootDialogTitle = styled(DialogTitle)(({ theme }) => ({
//   paddingRight: '5px'
// }));

// export default function Popup(props) {
//   const { title, children, openPopup, setOpenPopup } = props;
//   return (
//     <Dialog open={openPopup} maxWidth="md">
//       <DialogTitle>
//         <div style={{ display: 'flex' }}>
//           <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
//             {title}
//           </Typography>
//           <Button
//             color="secondary"
//             onClick={() => {
//               setOpenPopup(false);
//             }}
//           >
//             <CloseIcon />
//           </Button>
//         </div>
//       </DialogTitle>
//       <DialogContent dividers>{children}</DialogContent>
//     </Dialog>
//   );
// }

import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function Popup(props) {
  const { title, setOpenPopup, openPopup } = props;
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpenPopup(true);
  // };
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      {/* {showButton ? (
        <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleClickOpen}>
          {buttonLabel}
        </Button>
      ) : null} */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
          {props.children}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </div>
  );
}
