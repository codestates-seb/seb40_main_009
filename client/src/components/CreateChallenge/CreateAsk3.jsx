import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';

import * as S from '../../style/CreateChallenge/Challenge.styled';

import { createChallengeStateNumber } from '../../atoms/atoms';

export default function ChallengeAsk3({ register }) {
  const setStatePageNumber = useSetRecoilState(createChallengeStateNumber);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [dateInfomation] = date;

  const startDate = `${dateInfomation.startDate.getFullYear()}-${
    dateInfomation.startDate.getMonth() + 1
  }-${dateInfomation.startDate.getDate()}`;
  const lastDate = dateInfomation.endDate;
  const lastDatee = `${lastDate.getFullYear()}-${
    lastDate.getMonth() + 1
  }-${lastDate.getDate()}`;

  useEffect(() => {
    setStatePageNumber(4);
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
          value={lastDatee}
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
