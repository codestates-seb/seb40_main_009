import { useRecoilState, useSetRecoilState } from 'recoil';
import { createChallenge, validButton } from '../../atoms/atoms';
import * as S from '../../style/CreateChallenge/Challenge.styled';

function ChallengeAsk1({ register }) {
  const [create, setCreateChallenge] = useRecoilState(createChallenge);
  const checkBtn = useSetRecoilState(validButton);

  const onValid = (data) => {
    setCreateChallenge({ ...create, ...data });
    checkBtn(true);
  };

  return (
    <S.CreateAsk>
      <div className="question">
        <h3>카테고리를 선택하세요</h3>
        <div>
          <label>
            <input
              type={'radio'}
              {...register('challengeCategoryId', {
                required: 'Please Choice Quantity',
              })}
              value={'1'}
            />
            버킷 리스트
          </label>
          <label>
            <input
              type={'radio'}
              {...register('challengeCategoryId', {
                required: 'Please Choice Quantity',
              })}
              value={'2'}
            />
            공유 챌린지
          </label>
          <label>
            <input
              type={'radio'}
              {...register('challengeCategoryId', {
                required: 'Please Choice Quantity',
              })}
              value={'3'}
            />
            오프라인 챌린지
          </label>
        </div>
      </div>
      <div className="question">
        <h3>함께할 최소인원수를 정해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeMinParty', {
            required: 'Please Write Content',
          })}
          placeholder="최소 인원수를 입력하세요"
          type={'number'}
        />
      </div>
      <div className="question">
        <h3>함께할 최대인원수를 정해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeMaxParty', {
            required: 'Please Write Content',
          })}
          placeholder="최대 인원수를 입력하세요"
          type={'number'}
        />
      </div>
      <div className="question">
        <h3>챌린지 참가금액을 입력해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeFeePerPerson', {
            required: 'Please Write Content',
          })}
          placeholder="참가 금액"
          type={'number'}
        />
      </div>
    </S.CreateAsk>
  );
}

export default ChallengeAsk1;
