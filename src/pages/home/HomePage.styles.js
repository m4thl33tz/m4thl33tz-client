import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    minHeight: '100vh',
    maxHeight: '100vh',
    width: '100%',
    maxWidth: '100%',
  },
  backgroundContainer: {
    backgroundColor: theme.palette.primary.light,
    border: 'solid 4px blue',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    height: '200px',
    width: '300px',
    borderRadius: '20px',
  },
}));

export default useStyles;
