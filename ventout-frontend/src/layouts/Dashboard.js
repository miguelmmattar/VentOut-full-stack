import styled from 'styled-components';

import { mainPalette } from '../utils/colors';

export default function Dashboard({ children }) {
  return (
    <StyledDashboard mainPalette={mainPalette}>
      {children}
    </StyledDashboard>
  );
}

const StyledDashboard = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.mainPalette.background};
  padding: 80px 20px 40px 20px;
  position: relative;
  margin-bottom: 60px;

  .alternative-message {
    margin-top: 120px;
    line-height: 26px;
    color: ${(props) => props.mainPalette.placeholder};
    font-size: 18px;
  }

  .history-page {
    margin-top: 40px !important;
  }

  @media(min-width: 768px) and (max-width: 1023px) {
    padding-left: 140px;
    padding-right: 140px;

    .alternative-message, .history-page {
      width: 100%;
      text-align: center;
      margin-top: 300px !important;
      font-size: 22px;
      line-height: 28px;
    }
  }

  @media(min-width: 1024px) {
    margin-bottom: 0;
    padding: 80px 100px 40px 100px;

    .alternative-message, .history-page {
      width: 100%;
      text-align: center;
      margin-top: 300px !important;
      font-size: 22px;
  }
  }
`;
