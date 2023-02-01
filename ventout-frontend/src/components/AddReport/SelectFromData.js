import Select from 'react-select';
import { mainPalette } from '../../utils/colors';
import Container from '../StyledComponents/Container';

export default function SelectFromData({
  label, placeholder, givenData, setDataOut,
}) {
  const colorStyles = {
    control: (styles) => ({ ...styles, border: 0, boxShadow: 'none' }),
    option: (styles, {
      data, isDisabled, isFocused, isSelected,
    }) => ({ ...styles, color: data.color }),
    multiValue: (styles, { data }) => ({
      ...styles, backgroundColor: data.color, color: 'white', borderRadius: '10px', paddingLeft: '5px',
    }),
    multiValueLabel: (styles, { data }) => ({ ...styles, color: 'white' }),
    multiValueRemove: (styles, { data }) => ({
      ...styles, color: 'white', cursor: 'pointer', ':hover': { color: 'white' },
    }),
  };

  function handleChange(selectedOption) {
    setDataOut(selectedOption);
  }

  return (
    <div>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        <Select
          placeholder={<div style={{ color: `${mainPalette.placeholder}` }}>{placeholder}</div>}
          options={givenData}
          isMulti
          styles={colorStyles}
          onChange={handleChange}
        />
      </Container>
    </div>
  );
}
