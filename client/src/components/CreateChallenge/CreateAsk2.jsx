import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { createChallenge, validBtn } from '../../atoms/atoms';
import * as S from '../../style/CreateChallenge/Challenge.styled';
import exampleImg from '../../image/example.png';

function ChallengeAsk2() {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const [checkBtn, setCheckBtn] = useRecoilState(validBtn);
  const [imageTransform, setImageTransfrom] = useState(exampleImg);

  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    setCreateChallenge({ ...data, ...create });
    setCheckBtn(true);
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

  useEffect(() => {
    setCheckBtn(false);
  }, []);
  return (
    <S.CreateAsk>
      <section className="imgSection">
        <S.ImgExample src={imageTransform} alt="preview.img" />
      </section>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="question">
          <h3>대표 이미지를 설정해주세요</h3>
          <input
            type={'file'}
            {...register('titleImage', { required: 'Please Upload Picture' })}
            onChange={(e) => {
              onChange(e.target.files[0]);
            }}
          />
        </div>
        <div className="question">
          <h3>챌린지 제목을 입력해주세요</h3>
          <input
            className="inputBox"
            {...register('title', { required: 'Please Write Title' })}
            placeholder="ex) 미라클 모닝 챌린지"
          />
        </div>
        <div className="question">
          <h3>챌린지 내용을 입력해주세요</h3>
          <input
            className="inputBox"
            {...register('content', { required: 'Please Write Content' })}
            placeholder="ex) 매일 아침 지정된 시간에 인증합니다"
          />
        </div>

        <button className="submitBtn">저장</button>
      </form>
    </S.CreateAsk>
  );
}

export default ChallengeAsk2;
