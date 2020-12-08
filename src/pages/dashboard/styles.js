import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root:{
    width: "100%",
    height: "100%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  gridBar:{
   flexGrow:0,
    backgroundColor:"transparent",
  },
  gridContainer:{
    flexGrow:1,
    color:"#fff",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  gridParent:{
    display:"flex",
    flexGrow:1,
    flexDirection:"column"
  },
  paper:{
    height:"100%",
  },
  hearderRoot:{
    backgroundColor:"transparent",
    minHeight:48,
  },
  toolbar:{
    minHeight:48,
  },
  divider: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    backgroundColor:"#fff",

  },
  buttonBoard: {
    color: "white",
    backgroundColor: "#ffffff6b",
    '&:hover': {
      backgroundColor: "#ffffff61",
    }
  },
  buttonTeamNameBoard: {
    color: "white",
    '&:hover': {
      backgroundColor: "rgba(253,251,251,0.5)",
    }
  },
  team:{
    flexGrow:1,
    display: "flex"
  },
  teamAvatar:{
    marginRight:theme.spacing(2),
    marginLeft:theme.spacing(2),
  },
  headerMenu: {
    marginTop: theme.spacing(10),
    width: 500,
  },
  profileMenu: {
    minWidth: 265,
    boxShadow:"unset"
  },
  boardName:{
    fontWeight:600,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  media: {
    height: 250,
    width: 250,
    margin: "auto",
    padding:theme.spacing(2)
  },
  showErrorRoot :{
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#ffffff7a',
  },
  card: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#fff',
    textAlign: "center",
    borderRadius:10,
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
}));
