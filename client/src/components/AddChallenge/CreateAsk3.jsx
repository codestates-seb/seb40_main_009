import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { createChallenge } from '../../atoms/atoms';

const CreateAsk = styled.section``;

function ChallengeAsk3() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [imageTransform, setImageTransfrom] = useState();

  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    console.log(data);
    // setCreateChallenge();
  };
  console.log(create);
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

  //   console.log(imageTransform.length);
  return (
    <CreateAsk>
      <div>
        {imageTransform && <img src={imageTransform} alt="preview.img" />}
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
        />
        <h3>인증 방법을 설명해주세요</h3>
        <input
          {...register('validExplain', {
            required: 'Please Write validExplain',
          })}
          placeholder="인증 방법 설명하기"
        />
        <h3>인증 빈도</h3>
        <button>하루 한번</button>
        <button>하루 두번</button>
        <button>하루 여러번(3번 이상)</button>
        <input type={'number'} placeholder="그럼 몇번?" />
        <h3>인증 시간</h3>

        <button>01:00</button>
        <button>02:00</button>
        <button>03:00</button>
        <button>04:00</button>
        <button>05:00</button>
        <button>06:00</button>
        <button>07:00</button>
        <button>08:00</button>
        <button>09:00</button>
        <button>10:00</button>
        <button>11:00</button>
        <button>12:00</button>
        <button>13:00</button>
        <button>14:00</button>
        <button>15:00</button>
        <button>16:00</button>
        <button>17:00</button>
        <button>18:00</button>
        <button>19:00</button>
        <button>20:00</button>
        <button>21:00</button>
        <button>22:00</button>
        <button>23:00</button>
        <button>24:00</button>
        <button>submit</button>
      </form>
    </CreateAsk>
  );
}

export default ChallengeAsk3;
