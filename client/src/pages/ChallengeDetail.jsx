import * as S from '../style/ChallengeDetail/ChallengeDetailStyle';

function ChallengeDetail() {
  return (
    <S.Container>
      <S.Recruitment>
        <img src="./img/smile.jpg" alt="도전 할 항목의 이미지" />
        <div>
          {/* 챌린지 설명 */}
          <S.Description>
            <div className="challenge-name">8시간 이상 자기</div>

            <S.Title>
              <div className="pd-5">
                <S.PaddingB>현재 참여 인원</S.PaddingB>
                <S.PaddingB>진행률</S.PaddingB>
                <S.PaddingB>챌린지 기간</S.PaddingB>
                <S.PaddingB>결제 금액</S.PaddingB>
                <S.PaddingB>모인 금액</S.PaddingB>
              </div>
              <div>
                <S.PaddingB>최소 / 최대 인원</S.PaddingB>
                <S.PaddingB>챌린지 기간</S.PaddingB>
                <S.PaddingB>챌린지 금액</S.PaddingB>
                <S.PaddingB>모집 기간</S.PaddingB>
                <S.PaddingB>모인 금액</S.PaddingB>
              </div>
            </S.Title>
          </S.Description>
        </div>
      </S.Recruitment>
    </S.Container>
  );
}
export default ChallengeDetail;
