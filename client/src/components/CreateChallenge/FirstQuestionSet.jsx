import { useSetRecoilState } from 'recoil';

import {
  CreateAsk,
  ErrorMessage,
} from '../../style/CreateChallenge/Challenge.styled';

import { createChallengeStateNumber } from '../../atoms/atoms';

export default function FirstQuestionSet({
  register,
  watch,
  errors,
  setError,
  clearErrors,
}) {
  const setStatePageNumber = useSetRecoilState(createChallengeStateNumber);

  /**1번 페이지에서 입력할 모든 값을 입력시 페이지 이동 버튼 활성화 */
  const answerCheck = (event) => {
    const allValidateList = [
      'challengeCategoryId',
      'challengeMinParty',
      'challengeMaxParty',
      'challengeFeePerPerson',
    ];

    const validateList = allValidateList.filter(
      (element) => element !== event.target.name
    );

    event.target.value &&
    watch(validateList[0]) &&
    watch(validateList[1]) &&
    watch(validateList[2])
      ? setStatePageNumber(2)
      : setStatePageNumber(1);
  };

  /**챌린지 멤버 설정 유효성검사 - 최소 > 최대 인원 */
  const checkMinimumParty = (event) => {
    if (watch('challengeMaxParty') !== '') {
      if (Number(watch('challengeMaxParty')) < Number(event.target.value)) {
        setError('checkMaxMemberError', {
          message: '최대 인원보다 적은 인원을 입력하세요',
        });
      } else {
        clearErrors('checkMaxMemberError');
      }
    }

    if (event.target.value < 1) {
      setError('minimumMemberMoreThanZero', {
        message: '참가자 수는 0보다 많아야 합니다',
      });
    } else {
      clearErrors('minimumMemberMoreThanZero');
    }
  };

  /**챌린지 멤버 설정 유효성검사 - 최소 < 최대 인원 */
  const checkMaxParty = (event) => {
    if (watch('challengeMinParty') !== '') {
      if (Number(watch('challengeMinParty')) > Number(event.target.value)) {
        setError('checkMinimumMemberError', {
          message: '최소 인원보다 많은 인원을 입력하세요',
        });
      } else {
        clearErrors('checkMinimumMemberError');
      }
    }

    if (event.target.value < 1) {
      setError('maximumMemberMoreThanZero', {
        message: '참가자 수는 0보다 많아야 합니다',
      });
    } else {
      clearErrors('maximumMemberMoreThanZero');
    }
  };

  /**참가 포인트 유효성검사 */
  const checkPoint = (event) => {
    const haveMoney = Number(localStorage.getItem('memberMoney'));
    // 현재 보유한 포인트보다 많은 챌린지 포인트를 설정했을때
    if (haveMoney < event.target.value) {
      setError('pointError', {
        message: `현재 보유중인 ${haveMoney
          .toString()
          .replace(
            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
            ','
          )} 포인트보다 많게 설정할 수는 없습니다`,
      });
    } else {
      clearErrors('pointError');
    }
    // 1000 포인트보다 적은 챌린지 포인트를 설정했을때
    if (event.target.value < 1000 && event.target.value > 0) {
      setError('moreThanThousandError', {
        message: `유료 챌린지는 1,000 포인트 이상으로 적어주세요, 무료 챌린지를 원하시면 0을 입력하세요`,
      });
    } else {
      clearErrors('moreThanThousandError');
    }
  };

  return (
    <CreateAsk>
      <div className="question">
        <h3>카테고리를 선택하세요</h3>
        <div>
          <label>
            <input
              type={'radio'}
              {...register('challengeCategoryId', {
                required: 'Please Choice Category',
              })}
              onChange={(event) => answerCheck(event)}
              value={'1'}
            />
            버킷 리스트
          </label>
          <label>
            <input
              type={'radio'}
              {...register('challengeCategoryId', {
                required: 'Please Choice Category',
              })}
              onChange={(event) => answerCheck(event)}
              value={'2'}
            />
            공유 챌린지
          </label>
          <label>
            <input
              type={'radio'}
              {...register('challengeCategoryId', {
                required: 'Please Choice Category',
              })}
              onChange={(event) => answerCheck(event)}
              value={'3'}
            />
            오프라인 챌린지
          </label>
        </div>
      </div>
      <div className="question">
        <h3>함께 챌린지를 진행할 최소 인원을 정해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeMinParty', {
            required: 'Please Write Content',
          })}
          placeholder="최소 인원수를 입력하세요"
          onChange={(event) => {
            answerCheck(event);
            checkMinimumParty(event);
          }}
          type={'number'}
        />
        <ErrorMessage>
          {errors.checkMaxMemberError?.message}
          {errors.minimumMemberMoreThanZero?.message}
        </ErrorMessage>
      </div>
      <div className="question">
        <h3>함께 챌린지를 진행할 최대 인원을 정해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeMaxParty', {
            required: 'Please Write Content',
          })}
          placeholder="최대 인원수를 입력하세요"
          onChange={(event) => {
            answerCheck(event);
            checkMaxParty(event);
          }}
          type={'number'}
        />

        <ErrorMessage>{errors.checkMinimumMemberError?.message}</ErrorMessage>
        <ErrorMessage>{errors.maximumMemberMoreThanZero?.message}</ErrorMessage>
      </div>
      <div className="question">
        <h3>챌린지 참가 포인트를 입력해주세요</h3>
        <input
          className="inputBox"
          {...register('challengeFeePerPerson', {
            required: 'Please Write Content',
          })}
          placeholder="참가 금액"
          onChange={(event) => {
            answerCheck(event);
            checkPoint(event);
          }}
          type={'number'}
        />
        <ErrorMessage>{errors.pointError?.message}</ErrorMessage>
        <ErrorMessage>{errors.moreThanThousandError?.message}</ErrorMessage>
      </div>
    </CreateAsk>
  );
}
