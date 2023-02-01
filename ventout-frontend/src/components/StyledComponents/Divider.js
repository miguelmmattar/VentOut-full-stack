import styled from 'styled-components';

const Divider = styled.div`
  min-height: calc(100vh - 280px);
  width: 1px;
  margin: 20px 100px 0 100px;
  border: 1px solid ${(props) => props.mainPalette.border};

  @media(max-width: 1023px) {
    display: none;
  }
`;

export default Divider;
