import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';

const CreateAsk = styled.section``;

const ImgExample = styled.img`
  height: 400px;
`;

const TimeContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

function ChallengeAsk3() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [imageTransform, setImageTransfrom] = useState();
  const [quantity, setQuantity] = useState();
  const [checkCount, setCheckCount] = useState();

  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...create, ...data });
  };

  const countCheck = (e) => {
    console.log(e);
  };

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

  const checkQuantityy = () => {
    setQuantity(false);
  };
  const checkQuantity = () => {
    setQuantity(true);
  };
  useEffect(() => console.log(create), [create]);
  return (
    <CreateAsk>
      <div>
        {/* {imageTransform && (
          <ImgExample src={imageTransform} alt="preview.img" />
        )} */}
      </div>
      <form onSubmit={handleSubmit(onValid)}>
        <h3>인증방법</h3>
        <input
          type={'file'}
          accept="image/*"
          {...register('image', { required: 'Please Upload Image' })}
          onChange={(e) => {
            onChange(e.target.files[0]);
          }}
          multiple
        />
        <h3>인증 방법을 설명해주세요</h3>
        <input
          {...register('validExplain', {
            required: 'Please Write validExplain',
          })}
          placeholder="인증 방법 설명하기"
        />
        <h3>인증 빈도</h3>
        {!quantity ? (
          <label>
            <input
              type={'radio'}
              {...register('quantity', { required: 'Please Choice Quantity' })}
              onClick={checkQuantityy}
              value={'1'}
            />
            하루 한번
          </label>
        ) : null}
        {!quantity ? (
          <label>
            <input
              type={'radio'}
              {...register('quantity', { required: 'Please Choice Quantity' })}
              onClick={checkQuantityy}
              value={'2'}
            ></input>
            하루 두번
          </label>
        ) : null}
        <label>
          <input
            type={'radio'}
            {...register('quantity', { required: 'Please Choice Quantity' })}
            onClick={checkQuantity}
            value={'3'}
          ></input>
          세번 이상
        </label>
        {quantity ? (
          <input
            type={'number'}
            {...register('quantity', { required: 'Please Choice Quantity' })}
            placeholder="그럼 몇번?"
          />
        ) : null}
        <h3>인증 시간</h3>
        {/* <section>
          <input
            type={'time'}
            {...register('time', { required: 'Please Choice Quantity' })}
          />
        </section> */}
        <TimeContainer>
          {timeTable.map((el) => (
            <label>
              <input
                onChange={(e) => countCheck(e)}
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
        <button>submit</button>
      </form>
    </CreateAsk>
  );
}

export default ChallengeAsk3;

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
