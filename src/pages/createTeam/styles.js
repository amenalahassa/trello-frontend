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
  paperRoot: {
    boxShadow: theme.customShadows.widgetDark,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    maxWidth: 404,
  },
  textRow: {
    marginBottom: theme.spacing(10),
    textAlign: "center",
  },
  errorCode: {
    fontSize: 148,
    fontWeight: 600,
  },
  safetyText: {
    fontWeight: 300,
    color: theme.palette.text.hint,
  },
  backButton: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    fontSize: 22,
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
}));
