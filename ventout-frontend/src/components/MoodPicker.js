import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
  BsEmojiAngry,
  BsEmojiAngryFill,
  BsEmojiFrown,
  BsEmojiFrownFill,
  BsEmojiNeutral,
  BsEmojiNeutralFill,
  BsEmojiSmile,
  BsEmojiSmileFill,
  BsEmojiLaughing,
  BsEmojiLaughingFill,
} from 'react-icons/bs';
import useTodaysMood from '../hooks/api/useTodaysMood';
import useSavesMood from '../hooks/api/useSaveMood';
import dateFilters from '../utils/dateUtils';

import { mainPalette } from '../utils/colors';
import moods from '../utils/MoodsUtils';

export default function MoodPicker() {
  const { getTodaysMood } = useTodaysMood();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const checkTodaysMood = async () => {
      const filter = {
        date: new Date(),
        param: dateFilters.day,
      };

      try {
        const todaysMood = await getTodaysMood(filter);

        if (todaysMood) {
          setSelected(todaysMood.name);
        }
      } catch (error) {
        toast('Cannot load your mood!');
      }
    };

    checkTodaysMood();
  }, []);

  return (
    <StyledMoodPicker mainPalette={mainPalette}>
      <Mood setSelected={setSelected}>
        { selected === moods.great
          ? <BsEmojiLaughingFill name={moods.great} />
          : <BsEmojiLaughing name={moods.great} />}

        { selected === moods.good
          ? <BsEmojiSmileFill name={moods.good} />
          : <BsEmojiSmile name={moods.good} />}

        { selected === moods.meh
          ? <BsEmojiNeutralFill name={moods.meh} />
          : <BsEmojiNeutral name={moods.meh} />}

        { selected === moods.bad
          ? <BsEmojiFrownFill name={moods.bad} />
          : <BsEmojiFrown name={moods.bad} />}

        { selected === moods.angry
          ? <BsEmojiAngryFill name={moods.angry} />
          : <BsEmojiAngry name={moods.angry} />}
      </Mood>
    </StyledMoodPicker>
  );
}

function Mood({ children, setSelected }) {
  const { saveMood, saveMoodLoading } = useSavesMood();

  async function selectMood(mood) {
    if (saveMoodLoading) {
      return;
    }

    const body = {
      name: mood,
      newMood: {
        updatedAt: new Date(),
      },
    };

    try {
      await saveMood(body);

      setSelected(mood);
    } catch (error) {
      toast('Cannot save your mood!');
    }
  }

  return (
    <MoodWrapper mainPalette={mainPalette}>
      {children.map((mood, index) => (
        <div key={index} onClick={() => selectMood(mood.props.name)}>
          <>{mood}</>
          <h5>{mood.props.name}</h5>
        </div>
      ))}
    </MoodWrapper>
  );
}

const MoodWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    z-index: 2;

    div {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    h5 {
        font-size: 14px;
        font-weight: 700;
        color: ${(props) => props.mainPalette.main};
        margin: 0 !important;
    }

    svg {
        width: 40px;
        height: 40px;
        color: ${(props) => props.mainPalette.main};
    }

    @media(min-width: 768px) and (max-width: 1023px) {
        max-width: 700px;
        margin: 0 auto;
    }

    @media(min-width: 1024px) {
        max-width: 800px;
        margin: 0 auto;
    }
`;

const StyledMoodPicker = styled.div`
    background-color: white;
    width: 100%;
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: ${(props) => props.mainPalette.border};
    position: absolute;
    left: 0;
    top: 80px;
    z-index: 2;
`;
