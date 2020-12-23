import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import withStyles from "@material-ui/core/styles/withStyles";
import Badge from "@material-ui/core/Badge";
import classNames from "classnames";

export default function GroupAvatars(props) {
    // const link = "https://source.unsplash.com/32x32/?nature"
    const users = [...props.users || [], ...props.invited || []]
    return (
       <div className={classNames(props.classes)}>
            <AvatarGroup max={4}>
                { users && users.map((val, id) => {
                    return <UserAvartarWithBadge key={id} children={ <Avatar alt={val.name} src={val.photo || val.name || undefined} />}/>
                })}
            </AvatarGroup>
       </div>
    );
}

 function UserAvartarWithBadge({children})
 {
     return(
         <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
             {children}
        </StyledBadge>
     );
 }

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);
