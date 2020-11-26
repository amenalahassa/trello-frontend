import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
    },
    titleBar:{
        height:"28px",
    },
    titleLink:{
      color:"white",
        ['&:hover'] : {
          color:"white"
        }
    },
    listTitle:{
      ['& .MuiGridListTile-tile']:{
          borderRadius:"3px"
      }
    },
    selected:{
        padding:theme.spacing(1)
    },
    notSelected:{
        padding:theme.spacing(0)
    }

}));
