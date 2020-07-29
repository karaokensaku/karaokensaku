import React, { useContext } from 'react';
import { Avatar, makeStyles, Box, Typography } from '@material-ui/core';
import { AuthContext } from '../../store/AuthService';
import NameSettingModal from './NameSettingModal';
import EmailSettingModal from './EmailSettingModal';
import PasswordSettingModal from './PasswordSettingModal';
import ImageSettingModal from './ImageSettingModal';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    width: '85%',
    margin: 'auto',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  Container: {
  },
  avatarImg: {
    width: theme.spacing(19),
    height: theme.spacing(19),
    border: "solid 1px #000",
    margin: "auto",
  },
  imageContainer: {
    marginRight: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const user = useContext(AuthContext);

  return (
    <div className={classes.userPage}>
      <Typography variant="h3" align="center">アカウント情報</Typography>
      {user && 
        <Box display="flex" className={classes.container}>
          <Box textAlign="center" className={classes.imageContainer}>
            {user.photoURL ? 
              <Avatar className={classes.avatarImg} src={user.photoURL} />
              : 
              <Avatar className={classes.avatarImg}>{user.displayName.slice(0,2)}</Avatar>
            }
            <ImageSettingModal />
          </Box>
          <div>
              <p>ユーザーネーム：　{user.displayName}</p>
              <NameSettingModal />
              <p>メールアドレス：　{user.email}</p>
              <EmailSettingModal />
              <p>パスワード：　******</p>
              <PasswordSettingModal />
          </div>
        </Box>
      }
    </div>
  );
};