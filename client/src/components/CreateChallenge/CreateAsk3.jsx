import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { createChallenge, validButton } from '../../atoms/atoms';
import { ko } from 'date-fns/locale';
import { DateRange } from 'react-date-range';
import { useForm } from 'react-hook-form';
import { addDays } from 'date-fns/esm';
import * as S from '../../style/CreateChallenge/Challenge.styled';

function ChallengeAsk3({ register }) {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [checkBtn, setCheckBtn] = useRecoilState(validButton);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [dateInfomation] = date;
  // console.log(dateInfomation.startDate.getMonth());
  let startDate = `${date[0].startDate.getFullYear()}-${date[0].startDate.getMonth()}-${date[0].startDate.getDate()}`;
  let lastDate = date[0].endDate;
  let lastDatee = `${lastDate.getFullYear()}-${lastDate.getMonth()}-${lastDate.getDate()}`;

  const onValid = (data) => {
    let now = new Date();
    if (
      now.getFullYear() <= date[0].startDate.getFullYear() &&
      now.getMonth() <= date[0].startDate.getMonth() &&
      now.getDate() <= date[0].startDate.getDate()
    ) {
      setCreateChallenge({ ...data, ...create });
      setCheckBtn(true);
    } else {
      alert(
        `시작일은 ${now.getFullYear()}년 ${now.getMonth()}월 ${now.getDate()}일 이후여야 합니다.`
      );
    }
  };
  useEffect(() => {
    setCheckBtn(false);
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

export default ChallengeAsk3;
