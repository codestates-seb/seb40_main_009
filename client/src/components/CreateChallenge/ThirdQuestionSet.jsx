import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

import * as S from '../../style/CreateChallenge/Challenge.styled';

import { createChallengeStateNumber } from '../../atoms/atoms';

export default function ThirdQuestionSet({ register }) {
  const setPageNumber = useSetRecoilState(createChallengeStateNumber);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [dateInfomation] = date;

  const startDate = format(dateInfomation.startDate, 'yyyy-MM-dd');
  const lastDate = format(dateInfomation.endDate, 'yyyy-MM-dd');

  useEffect(() => {
    setPageNumber(4);
  }, []);

  return (
    <S.CreateAsk>
      <DateRange
        editableDateInputs={false}
        onChange={(item) => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        locale={ko}
      />
      <div className="question">
        <h3>챌린지 시작일</h3>
        <input
          value={startDate}
          {...register('challengeStartDate', {
            required: 'Please Write FirstDay',
          })}
          placeholder="챌린지 시작일"
          readOnly
        />
      </div>
      <div className="question">
        <h3>챌린지 종료일</h3>
        <input
          value={lastDate}
          {...register('challengeEndDate', {
            required: 'Please Write LastDay',
          })}
          placeholder="챌린지 종료일"
          readOnly
        />
      </div>
    </S.CreateAsk>
  );
}
