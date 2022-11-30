import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

import * as S from '../../style/CreateChallenge/Challenge.styled';

import { createChallengeStateNumber } from '../../atoms/atoms';

export default function ThirdQuestionSet({ register }) {
  const setPageNumber = useSetRecoilState(createChallengeStateNumber);

  useEffect(() => {
    setPageNumber(4);
  }, []);

  return (
    <S.CreateAsk>
      {/* <DateRange
        editableDateInputs={false}
        onChange={(item) => {
          setDate([item.selection]);
        }}
        moveRangeOnFirstSelection={false}
        ranges={date}
        locale={ko}
      /> */}
      <div className="question">
        <h3>챌린지 시작일</h3>
        <input
          {...register('challengeStartDate', {
            required: 'Please Write FirstDay',
          })}
          type="date"
          placeholder="챌린지 시작일"
        />
      </div>
      <div className="question">
        <h3>챌린지 종료일</h3>
        <input
          {...register('challengeEndDate', {
            required: 'Please Write LastDay',
          })}
          type="date"
          placeholder="챌린지 종료일"
        />
      </div>
    </S.CreateAsk>
  );
}
