/* eslint-disable no-undef */
import './Header.css';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Avatar } from '@mui/material';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BoardsData } from '../App';

const Header = () => {
  let back = useContext(BoardsData);

  let { id } = useParams();
  let style = {};
  let backer = '';
  if (back) {
    backer = back.filter((e) => e.id == id)[0];
    if (backer) {
      style = {
        ...backer.prefs,

        backgroundColor: backer.prefs.backgroundTopColor,
        color: 'white',
        border: '1px solid rgb(108,116,119)',
      };
    }
  }
  return (
    <header style={style}>
      <a href="/">
        {' '}
        <h4 className="heading"></h4>
      </a>
      <div className="side-bar">
        <Search className="name">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <CircleNotificationsIcon />
        <Avatar id="avatar">AB</Avatar>
      </div>
    </header>
  );
};

export default Header;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
