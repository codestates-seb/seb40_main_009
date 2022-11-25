import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';
import * as S from '../../style/CreateChallenge/Challenge.styled';
import exampleImg from '../../image/example.png';
import axios from 'axios';
import Loading from '../Loading/Loading';

const TimeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

function ChallengeAsk4({ register }) {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [imageTransform, setImageTransfrom] = useState(exampleImg);
  const [quantity, setQuantity] = useState('-1');
  const [isThree, setIsThree] = useState(false);
  const [checkCounts, setCheckCounts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onValid = async (data) => {
    const quantity = Number(data.challengeAuthCycle);
    if (quantity !== data.time.length) {
      // 네이밍 바꾸기 if가 alert와 같은 의미를 갖도록
      alert('선택한 인증 횟수와 인증 시간이 맞지 않습니다.');
    }
    setCreateChallenge({ ...create, ...data });
    console.log('안', create);
  };

  const addTime = (e) => {
    if (e.target.checked) {
      setCheckCounts([...checkCounts, e.target.value]);
    }
    if (!e.target.checked) {
      setCheckCounts(checkCounts.filter((el) => el !== e.target.value));
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

  const isThreeBtn = (e) => {
    setQuantity(e.target.value);
    if (e.target.value === '3') {
      setIsThree(true);
    }
  };
  const checkQuantity = (e) => {
    setQuantity(e.target.value);
  };

  // const postData = async () => {
  //   setLoading(true);
  //   try {
  //     await axios.post(
  //       `/challenges`,
  //       { data: create },
  //       {
  //         headers: {
  //           'ngrok-skip-browser-warning': 'none',
  //           Authorization:
  //             'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NkBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.i4rAIdLBMReygLX0hfFZzySqQAnnc5fG-j6AhBQhW5KW-qaHk9PPuuzCrhC3rR0xamUVlHeR0-QgLElR1WLjMQ',
  //         },
  //       }
  //     );
  //     await setLoading(false);
  //   } catch (error) {
  //     console.log('error : ', error);
  //   }
  // };

  if (isLoading) return <Loading />;

  return (
    <S.CreateAsk>
      <section className="imgSection">
        {imageTransform && (
          <S.ImgExample src={imageTransform} alt="preview.img" />
        )}
      </section>
      <div className="question">
        <h3>인증방법</h3>
        <span>최대 3장까지 설정 가능합니다.</span>
        <input
          type={'file'}
          accept="image/*"
          {...register('challengeExamImagePath', {
            required: 'Please Upload Image',
          })}
          onChange={(e) => {
            onChange(e.target.files[0]);
          }}
          multiple
        />
      </div>
      <div className="question">
        <h3>인증 방법을 설명해주세요</h3>
        <input
          {...register('challengeAuthDescription', {
            required: 'Please Write validExplain',
          })}
          placeholder="인증 방법 설명하기"
        />
      </div>
      <div className="question">
        <h3>인증 빈도</h3>
        {!isThree ? (
          <>
            <label>
              <input
                type={'radio'}
                {...register('challengeAuthCycle', {
                  required: 'Please Choice Quantity',
                })}
                onClick={isThreeBtn}
                value={'1'}
              />
              하루 한번
            </label>
            <label>
              <input
                type={'radio'}
                {...register('challengeAuthCycle', {
                  required: 'Please Choice Quantity',
                })}
                onClick={isThreeBtn}
                value={'2'}
              ></input>
              하루 두번
            </label>
            <label>
              <input
                type={'radio'}
                {...register('challengeAuthCycle', {
                  required: 'Please Choice Quantity',
                })}
                onClick={isThreeBtn}
                value={'3'}
              ></input>
              세번 이상
            </label>
          </>
        ) : null}

        {isThree ? (
          <>
            <span>원하는 횟수를 입력하세요</span>
            <input
              type={'number'}
              {...register('challengeAuthCycle', {
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
                {...register('challengeAuthAvailableTime', {
                  required: 'Please Choice Validate Time',
                })}
                value={el}
              />
              {el}
            </label>
          ))}
        </TimeContainer>
      </div>
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
