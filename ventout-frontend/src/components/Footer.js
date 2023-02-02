import styled from 'styled-components';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import {
  BsHouseFill, BsFillClockFill, BsFillPlusCircleFill,
} from 'react-icons/bs';

import { mainPalette } from '../utils/colors';

export default function Footer() {
  const location = useLocation().pathname;

  return (
    <FooterContainer className="mobile">
      <StyledFooter mainPalette={mainPalette} location={location}>
        <AddButton mainPalette={mainPalette}><Link to="add/report"><BsFillPlusCircleFill className="add" /></Link></AddButton>
        <Link to="home"><BsHouseFill className="home" /></Link>
        <Link to="history"><BsFillClockFill className="history" /></Link>
      </StyledFooter>
    </FooterContainer>
  );
}

const AddButton = styled.span`
    width: 68px;
    height: 68px;
    position: absolute;
    left: calc(50% - 34px);
    top: -20px;
    border-radius: 50%;
    background-color: ${(props) => props.mainPalette.main};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FooterContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 60px;
`;

const StyledFooter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: ${(props) => props.mainPalette.main};
    box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.25);
    justify-content: space-between;
    align-items: center;
    padding: 0 15%;
    position: relative;

    svg {
        height: 40px;
        width: 40px;
    }

    .back {
        color: ${(props) => (props.location === '/dashboard/home' ? props.mainPalette.disabled : 'white')};
        cursor: ${(props) => (props.location === '/dashboard/home' ? 'initial' : 'pointer')};
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
        width: 58px;
        height: 58px;
    }

    @media(min-width: 768px) and (max-width: 1023px) {
      padding: 0 25%;
    }
`;
