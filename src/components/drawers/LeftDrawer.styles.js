import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  icon: {
    width: "50px",
    height: "50px",
  },
  iconButton: {
    width: "50px",
    height: "50px",
  },
}));

export default useStyles;
