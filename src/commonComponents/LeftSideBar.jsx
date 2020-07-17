import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useRecoilValue } from 'recoil';
import { myPageState } from '../atoms/myPage';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '20%',
  },
});

export default function FileSystemNavigator() {
  const classes = useStyles();
  const myPages = useRecoilValue(myPageState);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="My リスト">
        {myPages.map((myPage, index) => {
          const number = index + 2
          return (
            <>
              <Link to={`/mypages/${myPage.id}`}>
                <TreeItem nodeId={number.valueOf()} label={myPage.title}/>
              </Link>
            </>
          )
        })}
      </TreeItem>
    </TreeView>
  );
};
