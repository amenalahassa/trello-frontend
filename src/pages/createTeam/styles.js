import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    overflowY:"auto",
  },
  logotype: {
    display: "flex",
    alignItems: "center",
    jystifyContent:"center",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
  },
  logotypeText: {
    fontWeight: 500,
  },
  logotypeIcon: {
    width: 120,
  },
  textfielInput : {
    marginTop:theme.spacing(4),
  },
  InputToGetMember: {
    marginTop:theme.spacing(4),
    width:320,
  },
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(1),
    padding:theme.spacing(3),
    width: 500,
  },
  button : {
    marginTop:theme.spacing(4.5),
    marginLeft:theme.spacing(4.5),
    height: 46,
    textTransform: "none",
  },
  buttonSave : {
    height: 46,
    textTransform: "none",
  },
  saveButtonContainer: {
    marginTop:theme.spacing(5),
    marginBottom:theme.spacing(4),
    display:"flex",
    justifyContent: "center",
    alignItems:"center",
    height: 46,
  },
  textFieldUnderline: {
    "&:before": {
      borderBottomColor: theme.palette.primary.light,
    },
    "&:after": {
      borderBottomColor: theme.palette.primary.main,
    },
    "&:hover:before": {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  },
  textField: {
    borderBottomColor: theme.palette.background.light,
  },
}));
