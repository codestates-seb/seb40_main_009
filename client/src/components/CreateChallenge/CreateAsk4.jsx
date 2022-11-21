import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';
import * as S from '../../style/CreateChallenge/Challenge.styled';
import exampleImg from '../../image/example.png';

const TimeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

function ChallengeAsk4() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [imageTransform, setImageTransfrom] = useState(exampleImg);
  const [quantity, setQuantity] = useState();
  const [checkThree, setCheckThree] = useState(false);
  const [checkCount, setCheckCount] = useState([]);

  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...create, ...data });
    if (data.quantity * 1 !== data.time.length) {
      alert('선택한 인증 횟수와 인증 시간이 맞지 않습니다.');
    }
  };

  const addTime = (e) => {
    if (e.target.checked) {
      setCheckCount([...checkCount, e.target.value]);
    }
    if (!e.target.checked) {
      setCheckCount(checkCount.filter((el) => el !== e.target.value));
    }
  };

  //이미지 미리보기
  const onChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageTransfrom(reader.result);
        resolve();
      };
    });
  };

  const checkThreeBtn = (e) => {
    setQuantity(e.target.value);
    if (e.target.value === '3') {
      setCheckThree(true);
    }
  };
  const checkQuantity = (e) => {
    setQuantity(e.target.value);
  };
  useEffect(() => console.log(`현재 상태는` + create), [create]);
  return (
    <S.CreateAsk>
      <section className="imgSection">
        {imageTransform && (
          <S.ImgExample src={imageTransform} alt="preview.img" />
        )}
      </section>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="question">
          <h3>인증방법</h3>
          <span>최대 3장까지 설정 가능합니다.</span>
          <input
            type={'file'}
            accept="image/*"
            {...register('image', { required: 'Please Upload Image' })}
            onChange={(e) => {
              onChange(e.target.files[0]);
            }}
            multiple
          />
        </div>
        <div className="question">
          <h3>인증 방법을 설명해주세요</h3>
          <input
            {...register('validExplain', {
              required: 'Please Write validExplain',
            })}
            placeholder="인증 방법 설명하기"
          />
        </div>
        <div className="question">
          <h3>인증 빈도</h3>
          {!checkThree ? (
            <>
              <label>
                <input
                  type={'radio'}
                  {...register('quantity', {
                    required: 'Please Choice Quantity',
                  })}
                  onClick={checkThreeBtn}
                  value={'1'}
                />
                하루 한번
              </label>
              <label>
                <input
                  type={'radio'}
                  {...register('quantity', {
                    required: 'Please Choice Quantity',
                  })}
                  onClick={checkThreeBtn}
                  value={'2'}
                ></input>
                하루 두번
              </label>
              <label>
                <input
                  type={'radio'}
                  {...register('quantity', {
                    required: 'Please Choice Quantity',
                  })}
                  onClick={checkThreeBtn}
                  value={'3'}
                ></input>
                세번 이상
              </label>
            </>
          ) : null}

          {checkThree ? (
            <>
              <span>원하는 횟수를 입력하세요</span>
              <input
                type={'number'}
                {...register('quantity', {
                  required: 'Please Choice Quantity',
                  validate: (value) => value < 25,
                })}
                placeholder="그럼 몇번?"
                onChange={checkQuantity}
              />
            </>
          ) : null}
        </div>
        <div className="question">
          <h3>인증 시간</h3>
          <span>선택한 시간부터 최대 10분까지 인증 가능합니다.</span>

          <TimeContainer>
            {timeTable.map((el) => (
              <label key={el}>
                <input
                  onClick={(e) => addTime(e)}
                  type={'checkbox'}
                  {...register('time', {
                    required: 'Please Choice Validate Time',
                  })}
                  value={el}
                />
                {el}
              </label>
            ))}
          </TimeContainer>
        </div>
        <button className="submitBtn">저장</button>
      </form>
    </S.CreateAsk>
  );
}

export default ChallengeAsk4;

const timeTable = [
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];
