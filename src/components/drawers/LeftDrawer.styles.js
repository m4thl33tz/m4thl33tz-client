import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(3),
  },
  icon: {
    width: '50px',
    height: '50px',
  },
  iconButton: {
    width: '40px',
    height: '40px',
  }
}));

export default useStyles;
