import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { mainPalette } from '../../utils/colors';
import SelectFromData from '../../components/AddReport/SelectFromData';
import Container from '../../components/StyledComponents/Container';
import useInitialData from '../../hooks/api/useInitialData';
import useSaveReport from '../../hooks/api/useSaveReport';
import SelectDate from '../../components/AddReport/SelectDate';
import Divider from '../../components/StyledComponents/Divider';

export default function AddReport() {
  const navigate = useNavigate();
  const { getInitialData } = useInitialData();
  const { saveReport } = useSaveReport();
  const [text, setText] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [initialData, setInitialData] = useState([]);
  const [emotions, setEmotions] = useState([]);
  const [physicalSymptoms, setPhysicalSymptoms] = useState([]);
  const [emotionalSymptoms, setEmotionalSymptoms] = useState([]);
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const result = await getInitialData();

        if (result) {
          setInitialData(result);
        }
      } catch (error) {
        toast('Cannot load initial data!');
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (text[0] && emotions[0] && physicalSymptoms[0] && emotionalSymptoms[0]) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [text, emotions, physicalSymptoms, emotionalSymptoms]);

  async function handleSubmit() {
    if (disableSubmit) {
      toast('All fields are required"');
      return;
    }

    const data = {
      text,
      emotions,
      symptoms: physicalSymptoms.concat(emotionalSymptoms),
      date: startDate,
    };

    try {
      await saveReport(data);
      toast('Report successfully created!');
      navigate('home');
    } catch {
      toast('Unable to post report!');
    }
  }

  return (
    <StyledReport mainPalette={mainPalette}>
      <div className="text-area">
        <WriteReport
          label="What would you like to share?"
          text={text}
          setText={setText}
        />
      </div>

      <Divider mainPalette={mainPalette} />

      <div className="selection-area">
        <SelectDate
          label="When did it happen?"
          startDate={startDate}
          setStartDate={setStartDate}
        />

        <SelectFromData
          label="How do you feel about it?"
          placeholder="Add an emotion"
          givenData={initialData?.emotions}
          setDataOut={setEmotions}
        />

        <SelectFromData
          label="Have you had any physical symptoms?"
          placeholder="Add a symptom"
          givenData={initialData?.physicalSymptoms}
          setDataOut={setPhysicalSymptoms}
        />

        <SelectFromData
          label="Have you had any emotional symptoms?"
          placeholder="Add a symptom"
          givenData={initialData?.emotionalSymptoms}
          setDataOut={setEmotionalSymptoms}
        />
      </div>

      <ButtonsWrapper mainPalette={mainPalette} disabled={disableSubmit}>
        <button type="button" name="save" onClick={handleSubmit} disabled={disableSubmit}>SAVE</button>
        <button type="button" name="cancel" onClick={() => navigate('home')}>CANCEL</button>
      </ButtonsWrapper>

    </StyledReport>
  );
}

function WriteReport({ label, text, setText }) {
  return (
    <>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        <textarea
          id="report"
          name="report"
          placeholder="Don't overthink! Write whaterver comes to your mind..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </Container>
    </>
  );
}

export const StyledReport = styled.div`
  h5 {
    font-size: 14px;
    color: ${(props) => props.mainPalette.main};
    text-align: left;
    line-height: 24px;
    font-weight: 700;
    margin: 20px 0 5px 0;
  }

  textarea {
    border: 0;
    width: 100%;
    height: 148px;
    overflow-y: auto;
    padding: 10px;
    border: 0;
    border-radius: 10px;
    resize: none;
    line-height: 22px;
    color: ${(props) => props.mainPalette.placeholder};
  }

  textarea::placeholder {
    color: ${(props) => props.mainPalette.placeholder};
    word-wrap: break-word;
    line-height: 20px;
  }

  .text-area {
    line-height: 22px;
  }

  .text-area div {
    min-height: 150px;
    padding: 0;
  }

  @media(min-width: 1024px) {
    display: flex;
    justify-content: space-between;
    padding: 20px 100px;

    .text-area,
    .selection-area {
      width: 100%;
    }

    .text-area div {
    min-height: 350px;
    }

    textarea {
      height: 350px;
      margin: 7px 0;
      cursor: auto;
    }

    h5, h6 {
    font-size: 18px;
  }

    h5 {
      font-weight: 700;
      margin: 30px 0 10px 0;
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const ButtonsWrapper = styled.div`
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
  
  button {
    width: 100%;
    height: 40px;
    border-radius: 25px;
    background-color: white;
    border: 2px solid ${(props) => props.mainPalette.main};
    box-shadow: 0 0 0 0;
    color: ${(props) => props.mainPalette.main};
    font-weight: 700;
    cursor: pointer;
  }

  button:first-child {
    background-color: ${(props) => props.mainPalette.main};
    border: none;
    color: ${(props) => (props.disabled ? props.mainPalette.disabled : 'white')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  @media(min-width: 1024px) {
    position: absolute;
    flex-direction: row-reverse;
    width: 210px;
    right: 120px;
    bottom: 10px;

    button {
      width: 100px;
    }
  }
`;
