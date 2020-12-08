import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
root:{
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffffff7a',
  },
  buttonAddBoard: {
    marginTop: theme.spacing(2),
  },
  cardText:{
    marginBottom: theme.spacing(2.3),
  },
  cardContent:{
    maxWidth: 400,
  },
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#fff',
    textAlign: "center",
  },
}));