import { makeStyles } from "@material-ui/styles";
import {viewportSize} from "../../Module/biblio";

let image = "https://source.unsplash.com/" + viewportSize().width + "x" + viewportSize().height + "/?africa,evening,smile,joy,world"

export default makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection:"column",
    maxWidth: "100vw",
    overflowX: "hidden",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height:"100vh",
    backgroundImage: `url(${image})`,
    backgroundColor: "rgb(27 19 19 / 65%)",
},
  content: {
    flexGrow: 1,
    display:"flex",
    backgroundColor: "#ffffff1a"
  },
  link: {
    '&:not(:first-child)': {
      paddingLeft: 15
    }
  }
}));
