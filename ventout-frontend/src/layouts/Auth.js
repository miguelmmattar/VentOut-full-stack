import styled from 'styled-components';
import { mainPalette } from '../utils/colors';

export default function Auth({ children }) {
  return (
    <StyledAuth mainPalette={mainPalette}>
      {children}
    </StyledAuth>
  );
}

const StyledAuth = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.mainPalette.background};

    .container {
      width: 100%;
      height: 100%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: baseline;
      align-items: center;
      padding: 30px 30px;

      img {
          width: 150px;
          margin: 30px 0 40px 0;
      }

      h2 {
        font-size: 20px;
        font-weight: 700;
        color: ${(props) => props.mainPalette.main};
        width: 100%;
        text-align: left;
      }

      h5 {
        font-size: 14px;
        color: ${(props) => props.mainPalette.placeholder};
        margin: 0 10px;
      }

      a {
        text-decoration: none;
        font-size: 14px;
        letter-spacing: 1px;
        color: ${(props) => props.mainPalette.placeholder};
      }

      form {
        margin-top: 20px;

        input {
            height: 40px;
            width: 100%;
            border-radius: 10px;
            margin-bottom: 10px;
            border: solid 1px ${(props) => props.mainPalette.border};
            padding: 10px;
        }

        input[type="submit"] {
          background-color: ${(props) => props.mainPalette.main};
          color: white;
          font-weight: 700;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.25);
          cursor: pointer;
        }

        input[type="text"]::placeholder,
        input[type="password"]::placeholder {
          color: ${(props) => props.mainPalette.placeholder};
        }
      }

      @media(min-width: 1024px) {
          width: 500px;
          height: auto;
          border-radius: 20px;
          border: solid 1px ${(props) => props.mainPalette.border};
          box-shadow: 2px -2px 4px rgba(0, 0, 0, 0.15);

          img {
            margin: 50px 0 40px 0; 
          }
      }
    }
`;

export const Divider = styled.div`
width: 100%;
display: flex;
flex-direction: row !important;
align-items: center;
justify-content: space-between;
margin: 20px 0 !important;
padding: 0 !important;
`;

export const Line = styled.span`
width: 100%;
height: 1px;
background-color: #8E8E8E;
opacity: 0.3;
`;

export const OAuthWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row !important;
align-items: center;
justify-content: center;
padding: 0 20px;
margin-bottom: 10px;

div {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
`;

export const LogoWrapper = styled.span`
width: 44px;
height: 44px;
border-radius: 50%;
border: 2px solid ${(props) => props.color};
display: flex;
align-items: center;
justify-content: center;
margin: 10px 14px;

svg {
  width: 24px;
  height: 24px;
} 
`;
