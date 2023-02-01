import styled from 'styled-components';
import { IoChevronForward } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroller';
import { RotatingLines } from 'react-loader-spinner';

import { StyledHistory } from './History';
import { mainPalette } from '../../utils/colors';
import useReports from '../../hooks/api/useReports';
import ScrollLoader from '../../components/StyledComponents/ScrollLoader';

export default function Reports() {
  const { getReports } = useReports();
  const [reportsList, setReportsList] = useState([]);
  const [loadMore, setLoadMore] = useState([false]);

  async function loadReportsData() {
    try {
      const result = await getReports(reportsList.length);

      if (result) {
        setReportsList(reportsList.concat(result));
      }
    } catch (error) {
      toast('Cannot load reports data!');
    }

    setLoadMore(false);
  }

  useEffect(() => {
    loadReportsData();
  }, []);

  return (
    <StyledHistory mainPalette={mainPalette}>
      { reportsList.length === 0
        ? <p className="alternative-message history-page">It looks like you haven&apos;t made any reports lately...</p> : (
          <InfiniteScroll
            className="infinite-scroll"
            pageStart={0}
            hasMore
            initialLoad={false}
            loader={(
              <ScrollLoader key={0} rendered={loadMore}>
                <RotatingLines
                  strokeColor={mainPalette.placeholder}
                  animationDuration="0.75"
                  visible
                />
              </ScrollLoader>
            )}
            loadMore={async () => {
              if (reportsList.length % 40 !== 0) return;
              setLoadMore(true);
              setTimeout(loadReportsData, 1000);
            }}
          >

            {reportsList.map((data, index) => (
              <Link to={`${data?.id}`} key={index}>
                <PastReport
                  data={data}
                />
              </Link>
            ))}
          </InfiniteScroll>
        )}
    </StyledHistory>
  );
}

function PastReport({ data }) {
  const date = dayjs(data?.date).format('ddd MM/DD/YYYY');

  return (
    <StyledReport mainPalette={mainPalette}>
      <h5>{date}</h5>
      <IoChevronForward />
    </StyledReport>
  );
}

const StyledReport = styled.span`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background-color: white;
  border: 1px solid ${(props) => props.mainPalette.border};

  h5 {
    font-size: 18px;
    color: ${(props) => props.mainPalette.main};
    text-align: left;
    font-weight: 700;
  }

  @media(min-width: 1024px) {
    border-radius: 10px;
    width: 190px;
    height: 190px;
    margin: 10px;
    flex-direction: column-reverse;
    padding: 40px 0 50px 0;

    h5 {
      width: 100%;
      text-align: center;
      font-size: 24px;
      line-height: 40px;
    }
  }
`;
