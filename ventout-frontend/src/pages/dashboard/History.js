import styled from 'styled-components';
import { IoChevronForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import { mainPalette } from '../../utils/colors';
import options from '../../utils/HistoryUtils';

export default function History() {
  return (
    <StyledHistory mainPalette={mainPalette}>
      <Link to="moods"><HistoryOption option={options.moods} /></Link>
      <Link to="reports"><HistoryOption option={options.reports} /></Link>
      <Link to="charts"><HistoryOption option={options.charts} /></Link>
    </StyledHistory>
  );
}

function HistoryOption({ option }) {
  return (
    <div>
      <h4>{option}</h4>
      <IoChevronForward />
    </div>
  );
}

export const StyledHistory = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  position: absolute;
  top: 80px;
  left: 0;

  div {
    width: 100%;
    height: 70px;
    background-color: white;
    padding: 10px 20px;
    border: solid 1px ${(props) => props.mainPalette.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.mainPalette.main};
  }

  h4 {
    font-size: 20px;
  }

  a {
    text-decoration: none;
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.mainPalette.placeholder};
  }

  .alternative-message {
    margin-left: 20px;
  }

  .infinite-scroll {
    width: 100%;
    min-height: 100vh !important;
    height: auto !important;
    display: flex;
    flex-direction: column;
    padding: 0 0 90px 0;
    border: 0;
    background-color: ${(props) => props.mainPalette.background} !important;
    justify-content: start;
  }

  .infinite-scroll > a {
    width: 100%;
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    .alternative-message {
      margin-left: 0;
    }
  }

  @media(min-width: 1024px) {
    position: initial;
    flex-direction: row;
    padding: 20px 150px;
    flex-wrap: wrap;
    justify-content: center;

    div {
      border-radius: 10px;
      width: 180px;
      height: 180px;
    }

    a {
      margin: 10px;
    }

    h4 {
    font-size: 24px;
    width: 100%;
    text-align: center;
    }

    svg {
      display: none;
    }

    .alternative-message {
    margin-left: 0;
    }

    .infinite-scroll {
    flex-direction: row;
    padding: 0 0 90px 0;
    background-color: ${(props) => props.mainPalette.background} !important;
    align-items: baseline;
    flex-wrap: wrap;
    min-height: 0 !important;
  }

  .infinite-scroll > a {
    width: 180px;
    height: 180px;
    margin: 20px !important;
    display: block;
  }

  .infinite-scroll span {
    margin: 0 !important;
    padding: 40px 5px 50px 5px;
  }

  .infinite-scroll > span {
    margin: 18px !important;
  }
}
`;
