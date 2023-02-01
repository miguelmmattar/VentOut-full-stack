import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import DoughnutChart from '../../components/charts/DoughnutChart';
import RadarChart from '../../components/charts/RadarChart';
import StackedBarChart from '../../components/charts/StackedBarChart';

import MoodPicker from '../../components/MoodPicker';
import Divider from '../../components/StyledComponents/Divider';
import { mainPalette } from '../../utils/colors';
import useChartsData from '../../hooks/api/useChartsData';
import dateFilters from '../../utils/dateUtils';
import StyledHome from '../../components/StyledComponents/StyledHome';
import Chart from '../../components/charts/Chart';

export default function Home() {
  const { getChartsData, chartsDataLoading } = useChartsData();
  const [data, setData] = useState({
    emotions: null,
    symptoms: null,
  });

  useEffect(() => {
    const loadChartsData = async () => {
      const filter = {
        date: new Date(),
        param: dateFilters.week,
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
  }, []);

  return (
    <>
      <MoodPicker />

      { data.emotions?.length === 0
        ? <p className="alternative-message">It looks like you haven&apos;t made any reports lately...</p> : (

          <StyledHome mainPalette={mainPalette}>
            <div className="week-area emotions-area">
              <Chart label="My Week">
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
    </>
  );
}
