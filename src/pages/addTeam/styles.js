import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    button:{
        marginTop:theme.spacing(4),
        marginLeft:theme.spacing(2),
    },
    buttonModal:{
        marginTop:theme.spacing(2),
        marginBottom:theme.spacing(4),
        marginRight:theme.spacing(2),
    },
    saveButtonContainer: {
        display:"flex",
        justifyContent: "center",
        alignItems:"center",
        width: 68,
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

    InputToGetMember: {
        marginTop:theme.spacing(4),
        width:320,
    },
    toolbar: {
        borderBottom: "1px #00000021 solid",
        boxShadow: "0 0 2px 0 grey",
        minHeight:48,
        paddingLeft:16,
        paddingRight:10,
    },
    title:{
        flex:1,
    }
}));
