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
    width: '90%',
    margin: '20px auto 0',
    padding: "15px",
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
    margin: "0 auto 20px",
  },
  imageContainer: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
    }
  },
  changeForm: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  }
}));

export default () => {
  const classes = useStyles();
  const user = useContext(AuthContext);

  return (
    <div className={classes.userPage}>
      <Typography variant="h5" align="center">アカウント情報</Typography>
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
          <div className={classes.changeForm}>
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