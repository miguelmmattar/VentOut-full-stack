import styled from 'styled-components';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Container from '../../components/StyledComponents/Container';
import { mainPalette } from '../../utils/colors';
import { StyledReport } from './AddReport';
import Divider from '../../components/StyledComponents/Divider';
import useReport from '../../hooks/api/useReport';

export default function MyReport() {
  const { reportId } = useParams();
  const { getReport, reportLoading } = useReport();
  const [reportData, setReportData] = useState({
    text: '',
    date: '',
    emotions: [],
    physicalSymptoms: [],
    emotionalSymptoms: [],
  });

  useEffect(() => {
    const loadReportData = async () => {
      try {
        const result = await getReport(reportId);

        if (result) {
          setReportData(result);
        }
      } catch (error) {
        toast('Cannot load report data!');
      }
    };

    loadReportData();
  }, []);

  return (
    <StyledReport mainPalette={mainPalette}>
      <div className="text-area">
        <ReportText
          label="What you shared?"
          text={reportData.text}
        />
      </div>

      <Divider mainPalette={mainPalette} />

      <div className="selection-area">
        <ReportDate
          label="When it happened"
          date={reportData.date}

        />

        <ReportTags
          label="How you felt about it?"
          tags={reportData.emotions}
        />

        <ReportTags
          label="Your physical symptoms?"
          tags={reportData.physicalSymptoms}
        />

        <ReportTags
          label="Your emotional symptoms?"
          tags={reportData.emotionalSymptoms}
        />
      </div>
    </StyledReport>
  );
}

function ReportText({ label, text }) {
  return (
    <>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        <p>{text}</p>
      </Container>
    </>
  );
}

function ReportTags({ label, tags }) {
  return (
    <div>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        {!tags || !tags[0]
          ? <p>No data found!</p>
          : (tags.map((tag, index) => (
            <Tag color={tag.color} key={index}>{tag.name}</Tag>
          )))}
      </Container>
    </div>
  );
}

function ReportDate({ label, date }) {
  const reportDate = dayjs(date).format('ddd MM/DD/YYYY HH:mm');

  return (
    <div>
      <h5>{label}</h5>
      <Container mainPalette={mainPalette}>
        <p>
          {reportDate}
        </p>
      </Container>
    </div>
  );
}

const Tag = styled.span`
  height: 18px;
  padding: 3.5px 10px;
  background-color: ${((props) => props.color)};
  border-radius: 18px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  margin: 5px;
  display: inline-block;
`;
