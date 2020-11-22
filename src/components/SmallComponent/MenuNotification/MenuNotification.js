import React from "react";

import {Menu, MenuItem} from '@material-ui/core'

import {Typography} from "../../Wrappers";
import UserAvatar from "../../UserAvatar";
import classNames from "classnames";



function MenuNotification(props) {

    let {notifications, mailMenu, setMailMenu, classes } = props

    return (
        <Menu
            id="mail-menu"
            open={Boolean(mailMenu)}
            anchorEl={mailMenu}
            onClose={() => setMailMenu(null)}
            MenuListProps={{ className: classes.headerMenuList }}
            className={classes.headerMenu}
            classes={{ paper: classes.profileMenu }}
            disableAutoFocusItem
        >
            <div className={classes.profileMenuUser}>
                <Typography variant="h4" weight="medium">
                    New Messages
                </Typography>
                <Typography
                    className={classes.profileMenuLink}
                    component="a"
                    color="secondary"
                >
                    {notifications.length} New Messages
                </Typography>
            </div>
            {notifications.map(message => (
                <MenuItem key={message.id} className={classes.messageNotification}>
                    <div className={classes.messageNotificationSide}>
                        <UserAvatar color={message.variant} name={message.name} />
                        <Typography size="sm" color="text" colorBrightness="secondary">
                            {message.time}
                        </Typography>
                    </div>
                    <div
                        className={classNames(
                            classes.messageNotificationSide,
                            classes.messageNotificationBodySide,
                        )}
                    >
                        <Typography weight="medium" gutterBottom>
                            {message.name}
                        </Typography>
                        <Typography color="text" colorBrightness="secondary">
                            {message.message}
                        </Typography>
                    </div>
                </MenuItem>
            ))}
        </Menu>
  );
}

export default MenuNotification;
