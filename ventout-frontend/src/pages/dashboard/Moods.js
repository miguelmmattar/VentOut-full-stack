import {
  BsEmojiAngry,
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiLaughing,
} from 'react-icons/bs';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroller';
import { RotatingLines } from 'react-loader-spinner';

import moods from '../../utils/MoodsUtils';
import { StyledHistory } from './History';
import { mainPalette } from '../../utils/colors';
import useMoods from '../../hooks/api/useMoods';
import ScrollLoader from '../../components/StyledComponents/ScrollLoader';

export default function Moods() {
  const { getMoods } = useMoods();
  const [moodsList, setMoodsList] = useState([]);
  const [loadMore, setLoadMore] = useState([false]);

  async function loadMoodsData() {
    try {
      const result = await getMoods(moodsList.length);

      if (result) {
        setMoodsList(result);
      }
    } catch (error) {
      toast('Cannot load moods data!');
    }

    setLoadMore(false);
  }

  useEffect(() => {
    loadMoodsData();
  }, []);

  return (
    <StyledHistory mainPalette={mainPalette}>
      { moodsList.length === 0
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
              if (moodsList.length % 30 !== 0) return;
              setLoadMore(true);
              setTimeout(loadMoodsData, 1000);
            }}
          >

            {moodsList.map((data, index) => (
              <PastMood
                key={index}
                data={data}
              />
            ))}
          </InfiniteScroll>
        )}
    </StyledHistory>
  );
}

function PastMood({ data }) {
  const date = dayjs(data.date).format('ddd MM/DD/YYYY');

  return (
    <StyledMood color={data.color} mainPalette={mainPalette}>
      <h5>{date}</h5>

      {data.mood === moods.great
        && <BsEmojiLaughing />}
      {data.mood === moods.good
        && <BsEmojiSmile />}
      {data.mood === moods.meh
        && <BsEmojiNeutral />}
      {data.mood === moods.bad
        && <BsEmojiFrown />}
      {data.mood === moods.angry
        && <BsEmojiAngry />}
    </StyledMood>
  );
}

const StyledMood = styled.span`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px !important;
  background-color: ${(props) => props.color};

  border: 1px solid ${(props) => props.mainPalette.border};

  h5 {
    font-size: 18px;
    color: ${(props) => props.mainPalette.main};
    text-align: left;
    font-weight: 700;
  }

  svg {
    width: 40px !important;
    height: 40px !important;
    margin-right: 10px;
    color: ${(props) => props.mainPalette.main} !important;
  }

  @media(min-width: 1024px) {
    border-radius: 10px;
    width: 190px;
    height: 190px;
    margin: 10px;
    flex-direction: column-reverse;
    padding: 40px 0 20px 0 !important;

    h5 {
      width: 100%;
      text-align: center;
    }
    
    svg {
      display: initial !important;
      width: 80px !important;
      height: 80px !important;
      margin: 0;
    };
  }
`;
