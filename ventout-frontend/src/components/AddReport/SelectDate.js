import DateTimePicker from 'react-datetime-picker';
import styled from 'styled-components';

import Container from '../StyledComponents/Container';
import { mainPalette } from '../../utils/colors';

export default function SelectDate({ startDate, setStartDate, label }) {
  return (
    <StyledDatePicker mainPalette={mainPalette}>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        <DateTimePicker
          onChange={setStartDate}
          value={startDate}
          disableClock
          format="dd/MM/y HH:mm a"
          maxDate={new Date()}
        />
      </Container>
    </StyledDatePicker>
  );
}

const StyledDatePicker = styled.div`
  div {
    width: 100%;
    padding: 0 3px;
  }

  input, select, span {
    color: ${(props) => props.mainPalette.main} !important;
    font-weight: 700;
  }

  input[name="year"] {
    width: 42px !important;
    margin-right: 10px !important;
  }

  input[name="day"],
  input[name="month"],
  input[name="hour24"],
  input[name="minute"] {
    width: 20px !important;
  }

  select[name="amPm"] {
    display: none;
  }

  .react-datetime-picker__wrapper {
    border: 0;
    margin: 6px 0;
  }

  svg {
    stroke: ${(props) => props.mainPalette.placeholder} !important;
  }

  svg:hover {
    stroke: ${(props) => props.mainPalette.main} !important;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${(props) => props.mainPalette.main};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${(props) => props.mainPalette.disabled};
  }

  .react-calendar__tile--now {
    background-color: ${(props) => props.mainPalette.border};
  }
  
  .react-calendar__tile--active {
    background-color: ${(props) => props.mainPalette.main};
    color: white;
  }

  .react-calendar__tile:hover {
    background-color: ${(props) => props.mainPalette.disabled};
  }

  .react-calendar__tile--active:hover {
    background-color: ${(props) => props.mainPalette.main};
    cursor: default !important;
  }
`;
