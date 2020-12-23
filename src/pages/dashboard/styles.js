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
    },
    marginRight:theme.spacing(2),
  },
  buttonBoardText:{
    color: "white",
    marginRight:theme.spacing(2),

  },
  buttonAboutBoard:{
    color: "white",
    backgroundColor: "#ffffff6b",
    '&:hover': {
      backgroundColor: "#ffffff61",
    },
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
  ownerRoot:{
    flexGrow:1,
    display: "flex"
  },
  teamAvatar:{
    marginRight: theme.spacing(2),
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
    marginTop: theme.spacing(1),
  },
  cardText:{
    marginBottom: theme.spacing(2.3),
  },
  cardContent:{
    maxWidth: 400,
  },
  textPrivateTeam:{
    marginTop:theme.spacing(1),
    marginRight:theme.spacing(2)
  },
  buttonBoardMenu:{
    marginTop: theme.spacing(10),
    width: 300,
    ['& .MuiList-padding']:{
      paddingTop:0,
    }
  },
  buttonBoardMenuToolBar:{
    display: "flex",
    flexDirection:"row",
    padding:"0 10px !important",
    minHeight:24,
    borderBottom: "1px #00000021 solid",
    boxShadow: "0 0px 0px 0 grey !important",
    ['& .MuiSvgIcon-root']:{
      fontSize:"1.2rem",
    }

  },
  buttonBoardMenuHeaderMenuIcon:{
    flexGrow:1,
    display: "flex",
    flexDirection:"row",
  },
  buttonBoardMenuHeaderMenuIconTitle:{
    flex:1,
    fontWeight:400,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  buttonBoardMenuItem:{
    display: "flex",
    flexDirection:"column",
    maxWidth: 300,
    whiteSpace:"normal",
    paddingBottom:0,
    paddingLeft:theme.spacing(1),
    paddingRight:theme.spacing(1),
  },
  buttonBoardMenuItemSelect:{
    width:"100%",
    padding:theme.spacing(1)
  },
}));
