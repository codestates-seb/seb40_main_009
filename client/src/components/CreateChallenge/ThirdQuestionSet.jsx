import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DateRange } from 'react-date-range';
import { ko } from 'date-fns/locale';
import { isAfter, format, parseISO } from 'date-fns';

import * as S from '../../style/CreateChallenge/Challenge.styled';

import { createChallengeStateNumber } from '../../atoms/atoms';

export default function ThirdQuestionSet({
  register,
  clearErrors,
  setError,
  errors,
  watch,
}) {
  const setPageNumber = useSetRecoilState(createChallengeStateNumber);

  const checkEndDate = (event) => {
    if (
      !isAfter(
        parseISO(watch('challengeEndDate')),
        parseISO(event.target.value)
      )
    ) {
      setError('fastEndDate', {
        message: '시작일자는 종료일자보다 빨라야합니다',
      });
    } else {
      clearErrors('fastEndDate');
    }
  };

  const checkStartDate = (event) => {
    if (
      isAfter(
        parseISO(watch('challengeStartDate')),
        parseISO(event.target.value)
      )
    ) {
      setError('lateStartDate', {
        message: '종료일자는 시작일자보다 느려야합니다',
      });
    } else {
      clearErrors('lateStartDate');
    }
  };

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
          className="dateInput"
          {...register('challengeStartDate', {
            required: 'Please Write FirstDay',
          })}
          type="date"
          placeholder="챌린지 시작일"
          onChange={(event) => checkEndDate(event)}
        />
        <S.ErrorMessage>{errors.fastEndDate?.message}</S.ErrorMessage>
      </div>
      <div className="question">
        <h3>챌린지 종료일</h3>
        <input
          className="dateInput"
          {...register('challengeEndDate', {
            required: 'Please Write LastDay',
          })}
          type="date"
          placeholder="챌린지 종료일"
          onChange={(event) => checkStartDate(event)}
        />
        <S.ErrorMessage>{errors.lateStartDate?.message}</S.ErrorMessage>
      </div>
    </S.CreateAsk>
  );
}
