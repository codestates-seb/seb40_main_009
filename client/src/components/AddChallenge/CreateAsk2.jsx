import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-date-range';
import { useForm } from 'react-hook-form';
import { addDays } from 'date-fns/esm';

const CreateAsk = styled.section`
  > form > .rdrCalendarWrapper {
    margin-top: 150px;
    margin-bottom: 150px;
    scale: 1.6;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

function ChallengeAsk2() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...data, ...create });
    console.log('data', data);
  };
  let startDate = `${date[0].startDate.getFullYear()}-${date[0].startDate.getMonth()}-${date[0].startDate.getDate()}`;
  let lastDate = date[0].endDate;
  let lastDatee = `${lastDate.getFullYear()}-${lastDate.getMonth()}-${lastDate.getDate()}`;

  return (
    <CreateAsk>
      <form onSubmit={handleSubmit(onValid)}>
        <DateRange
          editableDateInputs={false}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          locale={ko}
        />
        <h3>챌린지 시작일</h3>
        <input
          value={startDate}
          {...register('시작일', { required: 'Please Write FirstDay' })}
          placeholder="챌린지 시작일"
          readOnly
        />
        <h3>챌린지 종료일</h3>
        <input
          value={lastDatee}
          {...register('종료일', { required: 'Please Write LastDat' })}
          placeholder="챌린지 종료일"
          readOnly
        />
        <button>저장</button>
      </form>
    </CreateAsk>
  );
}

export default ChallengeAsk2;
