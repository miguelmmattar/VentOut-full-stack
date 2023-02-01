import { mainPalette } from '../../utils/colors';
import Container from '../StyledComponents/Container';

export default function Chart({ label, children }) {
  return (
    <>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        {children}
      </Container>
    </>
  );
}
