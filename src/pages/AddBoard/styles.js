import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
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
    textfielInput : {
        marginTop:0,
    },
    button:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(4),
        marginRight:theme.spacing(2),
    },
}));
