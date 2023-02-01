import styled from 'styled-components';

const StyledHome = styled.div`
  padding-top: 90px;
  position: relative;

  p {
    color: ${(props) => props.mainPalette.placeholder};
    padding: 10px;
  }

  h5 {
    font-size: 14px;
    color: ${(props) => props.mainPalette.main};
    text-align: left;
    line-height: 24px;
    font-weight: 700;
    margin: 20px 0 5px 0;
  }

  .week-area canvas,
  .emotions-area canvas,
  .symptoms-area canvas {
    margin: 10px !important;
  }

  @media(min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 100px 100px 0 100px;
    height: 100%;

    .symptoms-area {
      width: 100%;
    }

    .week-area,
    .emotions-area {
      width: 70%;
    }

    h5, h6 {
    font-size: 18px;
  }

    h5 {
      font-weight: 700;
      margin: 30px 0 10px 0;
    }
  }
`;

export default StyledHome;
