/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Navclick } from './Navclick';
import { BoardsData } from '../App';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Sidenavbar.css';

export default function Sidenavbar({ state }) {
  let back = useContext(BoardsData);

  let { id } = useParams();
  let style = {};
  let backer = '';

  if (back) {
    backer = back.filter((e) => e.id == id)[0];

    if (backer) {
      style = {
        backgroundColor: backer.prefs.backgroundTopColor,
        color: 'white',
        border: '1px solid rgb(108,116,119)',
      };
    }
  }
  return (
    <div style={style} className="navbar">
      <List className="list">
        {['Board'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {state && <Navclick />}
    </div>
  );
}
