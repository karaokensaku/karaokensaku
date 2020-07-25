import React, { useContext } from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { AuthContext } from '../../store/AuthService';
import NameSettingModal from './NameSettingModal';
import EmailSettingModal from './EmailSettingModal';
import PasswordSettingModal from './PasswordSettingModal';

const useStyles = makeStyles((theme) => ({
  avatarImg: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default () => {
  const classes = useStyles();
  const user = useContext(AuthContext);

  return (
    <>
      {user && 
        <div>
          <h1>アカウント情報</h1>
          <div>
            <div>
                <div>
                  <Avatar className={classes.avatarImg}>{user.displayName.slice(0,2)}</Avatar>
                </div>
                <button type="button">
                    アカウント画像を変更する
                </button>
            </div>
            <div>
              <form>
                <p>ユーザーネーム：　{user.displayName}</p>
                <NameSettingModal />
                <p>メールアドレス：　{user.email}</p>
                <EmailSettingModal />
                <p>パスワード：　******</p>
                <PasswordSettingModal />
              </form>
            </div>
          </div>
        </div>
      }
    </>
  )
}