import styled from 'styled-components';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';

import {
  BsHouseFill, BsFillClockFill, BsFillPlusCircleFill,
} from 'react-icons/bs';
import { IoChevronBack } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

import createTitle from '../utils/HeaderUtils';
import { mainPalette } from '../utils/colors';
import useSignOut from '../hooks/api/useSignOut';
import UserContext from '../contexts/UserContext';

export default function Header() {
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { userData, setUserData } = useContext(UserContext);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(createTitle(location));
  }, [location]);

  function goBack() {
    if (location === '/dashboard/home') {
      return;
    }
    navigate(-1);
  }

  async function handleSignOut() {
    try {
      await signOut(userData.user.id);
      setUserData({});

      navigate('/');
    } catch (error) {
      toast('Unable to logout!');
    }
  }

  return (
    <HeaderContainer>
      <StyledHeader mainPalette={mainPalette} location={location}>
        <IoChevronBack className="back" onClick={goBack} />

        <Title><h1>{title}</h1></Title>

        <div>
          <span className="desktop">
            <Link to="add/report"><BsFillPlusCircleFill className="add" /></Link>
            <Link to="history"><BsFillClockFill className="history" /></Link>
            <Link to="home"><BsHouseFill className="home" /></Link>
          </span>

          <FiLogOut className="logout" onClick={handleSignOut} />
        </div>
      </StyledHeader>
    </HeaderContainer>
  );
}

const Title = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    padding-top: 30px;

    @media(min-width: 768px) and (max-width: 1023px) {
      padding-top: 0;
    }

    @media(min-width: 1024px) {
      padding-top: 0;
    }
`;

const HeaderContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 80px;

`;

const StyledHeader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: ${(props) => props.mainPalette.main};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    position: relative;

    h1 {
        font-size: 32px;
        color: white;
    }

    div {
        display: flex;
    }

    span {
        display: flex;
        align-items: center;
        z-index: 1;
    }

    svg {
        height: 30px;
        width: 30px;
    }

    .back {
        color: ${(props) => (props.location === '/dashboard/home' ? props.mainPalette.disabled : 'white')};
        cursor: ${(props) => (props.location === '/dashboard/home' ? 'initial' : 'pointer')};
        z-index: 1;
    }

    .logout {
      color: white;
      margin: auto 10px;
      cursor: pointer;
      z-index: 1;
    }

    .home {
        color: ${(props) => (props.location === '/dashboard/home' ? props.mainPalette.disabled : 'white')};
        cursor: ${(props) => (props.location === '/dashboard/home' ? 'initial' : 'pointer')};
        margin: 10px;
    }

    .history {
        color: ${(props) => (props.location === '/dashboard/history' ? props.mainPalette.disabled : 'white')};
        cursor: ${(props) => (props.location === '/dashboard/history' ? 'initial' : 'pointer')};
        margin: 10px;
    }

    .add {
        color: ${(props) => (props.location === '/dashboard/add/report' ? props.mainPalette.disabled : 'white')};
        cursor: ${(props) => (props.location === '/dashboard/add/report' ? 'initial' : 'pointer')};
        margin: 10px;
    }
`;
