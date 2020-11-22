import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),

  },
  chip: {
    margin: theme.spacing(0.5),
  },
  text : {
    marginTop: theme.spacing(3),
  }
}));
