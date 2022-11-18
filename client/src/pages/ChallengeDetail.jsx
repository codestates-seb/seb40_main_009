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
                <S.PaddingB>최소 / 최대 인원</S.PaddingB>
                <S.PaddingB>챌린지 기간</S.PaddingB>
                <S.PaddingB>챌린지 금액</S.PaddingB>
                <S.PaddingB>모집 기간</S.PaddingB>
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
            {/* 참여버튼 */}
            <S.BtnWrapper>
              <button className="custom-btn btn-8">
                <span>참여하기</span>
              </button>
              {/* <div>공유아이콘</div> */}
            </S.BtnWrapper>
          </S.Description>
        </div>
      </S.Recruitment>

      {/* 챌린지 설명 */}
      <S.Certification>
        <S.Wrapper>
          <div className="title">챌린지 설명</div>
          <div className="pd-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            quas, non pariatur odit quia quos cum molestias enim vero itaque
            mollitia, laboriosam doloribus laborum magnam suscipit labore
            temporibus repudiandae id nulla perspiciatis nihil dolore
            voluptatum? Autem, aut odit aliquam in quisquam doloremque iure
            commodi omnis. Reiciendis est ullam incidunt laboriosam.
          </div>
        </S.Wrapper>
        {/* 인증 설명 */}
        <S.Wrapper>
          <div className="title">인증 방법</div>
          <div className="pd-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            quas, non pariatur odit quia quos cum molestias enim vero itaque
            mollitia, laboriosam doloribus laborum magnam suscipit labore
            temporibus repudiandae id nulla perspiciatis nihil dolore
            voluptatum? Autem, aut odit aliquam in quisquam doloremque iure
            commodi omnis. Reiciendis est ullam incidunt laboriosam.
          </div>
        </S.Wrapper>
        {/* 인증 예시 */}
        <S.Wrapper>
          <div className="title">인증 예시</div>
          <img src="./img/smile.jpg" alt="*" />
        </S.Wrapper>
      </S.Certification>

      <S.Review>
        <div>후기 사진</div>
        <div style={{ border: '2px solid red', marginTop: '3%' }}>
          <img src="*" alt="" />
        </div>
      </S.Review>
    </S.Container>
  );
}

export default ChallengeDetail;
