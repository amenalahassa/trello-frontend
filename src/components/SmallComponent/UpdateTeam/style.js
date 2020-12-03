import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));
