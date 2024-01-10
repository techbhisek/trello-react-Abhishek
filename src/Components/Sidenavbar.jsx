/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Navclick } from './Navclick';
import { useParams, useLocation } from 'react-router-dom';
import './Sidenavbar.css';

export default function PermanentDrawerLeft({ state }) {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const name = searchParams.get('name');
  const color = '#' + searchParams.get('color');

  let style;
  if (color && id) {
    style = { backgroundColor: color };
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
