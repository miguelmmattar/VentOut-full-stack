import styled from 'styled-components';

const ScrollLoader = styled.div`
  width: 64%;
  display: ${(props) => (props.rendered ? 'flex' : 'none')} !important;
  justify-content: center;
  margin: 20px 0 20px 0;
  border: 0 !important;
  align-items: center !important;
  background-color: transparent !important;

  svg {
    width: 30px;
    height: 30px;
    margin: auto;
  }
`;

export default ScrollLoader;
