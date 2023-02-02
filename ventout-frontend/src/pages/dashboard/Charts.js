import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Select from 'react-select';

import DoughnutChart from '../../components/charts/DoughnutChart';
import RadarChart from '../../components/charts/RadarChart';
import StackedBarChart from '../../components/charts/StackedBarChart';

import Divider from '../../components/StyledComponents/Divider';
import { mainPalette } from '../../utils/colors';
import useChartsData from '../../hooks/api/useChartsData';
import dateFilters from '../../utils/dateUtils';
import StyledHome from '../../components/StyledComponents/StyledHome';
import Chart from '../../components/charts/Chart';
import Container from '../../components/StyledComponents/Container';

export default function Charts() {
  const { getChartsData, chartsDataLoading } = useChartsData();
  const [data, setData] = useState({
    emotions: null,
    symptoms: null,
  });
  const [window, setWindow] = useState(dateFilters.week);

  useEffect(() => {
    const loadChartsData = async () => {
      const filter = {
        date: new Date(),
        param: window,
      };

      try {
        const result = await getChartsData(filter);

        if (result) {
          setData(result);
        }
      } catch (error) {
        toast('Cannot load charts data!');
      }
    };

    loadChartsData();
  }, [window]);

  return (
    <StyledChartsHistory>
      { data.emotions?.length === 0
        ? <p className="alternative-message history-page">It looks like you haven&apos;t made any reports lately...</p> : (

          <StyledHome mainPalette={mainPalette}>
            <SelectWindow
              placeholder="Add an emotion"
              setWindow={setWindow}
            />

            <div className="week-area emotions-area">
              <Chart label={window === dateFilters.week ? 'My Week' : 'My Weeks'}>
                {!data.week || chartsDataLoading
                  ? <p>Loading...</p>
                  : <StackedBarChart data={data?.week} />}
              </Chart>

              <Chart label="My Emotions">
                {!data.emotions || chartsDataLoading
                  ? <p>Loading...</p>
                  : <DoughnutChart data={data?.emotions} />}
              </Chart>
            </div>

            <Divider mainPalette={mainPalette} />

            <div className="symptoms-area">
              <Chart label="My Symptoms">
                {!data.symptoms || chartsDataLoading
                  ? <p>Loading...</p>
                  : <RadarChart data={data?.symptoms} />}
              </Chart>
            </div>
          </StyledHome>
        )}
    </StyledChartsHistory>
  );
}

function SelectWindow({ placeholder, setWindow }) {
  const windowOptions = [
    { value: dateFilters.week, label: 'Last week' },
    { value: dateFilters.month, label: 'Last month' },
    { value: dateFilters.year, label: 'Last year' },
    { value: dateFilters.allTime, label: 'All time' },
  ];

  const colorStyles = {
    control: (styles) => ({ ...styles, border: 0, boxShadow: 'none' }),
    option: (styles, {
      data, isDisabled, isFocused, isSelected,
    }) => ({
      ...styles,
      color: isSelected || isFocused ? mainPalette.main : mainPalette.placeholder,
      margin: '10px 0',
      backgroundColor: 'white',
      fontWeight: isSelected || isFocused ? 700 : 400,
    }),
    value: (styles) => ({ ...styles, color: mainPalette.main }),
  };

  function handleChange(selectedOption) {
    setWindow(selectedOption.value);
  }

  return (
    <StyledSelect mainPalette={mainPalette}>
      <Container mainPalette={mainPalette}>
        <Select
          placeholder={<div style={{ color: `${mainPalette.main}` }}>Last week</div>}
          options={windowOptions}
          styles={colorStyles}
          onChange={handleChange}
        />
      </Container>
    </StyledSelect>
  );
}

const StyledChartsHistory = styled.div`
  div:first-child {
    padding-top: 0 !important;
  }

  margin-top: 34px;
`;

const StyledSelect = styled.div`
  width: 170px;
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 1;
  border-radius: 10px;
  box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.15);

  div {
    padding: 0 2px;
  }

  .css-1dimb5e-singleValue {
    color: ${(props) => props.mainPalette.main};
  }

  @media(min-width: 1024px) {
    right: 200px;
  }
`;
