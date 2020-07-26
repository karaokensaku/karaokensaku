import React, { useContext, useState, useEffect } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';


import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myPageState } from '../../atoms/myPage';
import { Link } from 'react-router-dom';
import { IconButton, Hidden } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [plus, setPlus] = useState(false);
  const myPages = useRecoilValue(myPageState)
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ul>
          <h2>MENU</h2>
          <li><Link to='/main'>Home</Link></li>
          <li><Link to='/hotpage'>HOT</Link><br /></li>
          <li><Link to='/userSettingPage'>UserSettingPage</Link></li>
        </ul>
        {/* <Link to='/'>Home</Link> */}

        <TreeView
          className="myList"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="My リスト">
            {myPages.map((myPage, index) => {
              const number = index + 2
              return (
                <Link to={`/mypages/${myPage.id}`} key={myPage.id}>
                  <TreeItem nodeId={number.valueOf()} label={myPage.title} />
                </Link>
              )
            })}
            <TreeItem
              nodeId={myPages.length + 2}
              label={
                <div>
                  {plus &&
                    <form >
                      <input name="title" />
                      <button type="submit">追加</button>
                    </form>
                  }
                  <IconButton aria-label="settings" component="span" >
                    <AddIcon />
                  </IconButton>
                </div>
              }
            />
          </TreeItem>
        </TreeView>

      </List>
    </div>
  );

  //モーダルを開いたり閉じたりする関数達
  const openLoginModal = () => {
    setLoginModalIsOpen(true)
  }

  const closeLoginModal = () => {
    setLoginModalIsOpen(false)
  }

  const openSignUpModal = () => {
    setSignUpModalIsOpen(true)
  }

  const closeSignUpModal = () => {
    setSignUpModalIsOpen(false)
  }    

  return (
    <>
      <Hidden mdUp>

        <div>
          {['left',].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
      </Hidden>

      {RenderHeader(user)}
    </>
  );
}