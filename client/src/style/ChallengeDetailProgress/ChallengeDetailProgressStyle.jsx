import styled from 'styled-components';

export const Container = styled.header`
  width: 1024px;
  margin: 0 auto;
  padding-top: 120px;
`;

export const ChallengeViewCount = styled.div`
  margin-bottom: 1%;
  color: #787878;
  margin-right: auto;
`;

export const ChallengeProgress = styled.div`
  display: flex;
  width: 100%;
  & > .image {
    width: 35%;
  }
`;

export const ChallengeImage = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 20px;
`;

export const ChallengeWrapper = styled.div`
  margin-left: 3%;
  width: 100%;
  border-radius: 20px;
`;

export const ChallengeTitle = styled.div`
  display: flex;
  align-items: center;
  & > .title {
    font-size: 30px;
    margin-bottom: 2%;
    margin-right: auto;
  }
  & > .d_day {
    border: 3px solid #eff1fe;
    padding: 1%;
    border-radius: 20px;
  }
`;

export const Description = styled.div`
  padding: 5%;
  font-size: 17px;
  & > .challenge-name {
    margin-bottom: 6%;
    font-size: 30px;
    display: flex;
    justify-content: center;
  }
`;

export const ChallengeDescription = styled.div`
  padding-bottom: 2%;
  display: flex;
  width: 100%;
  font-size: 20px;
  & .margin_right {
    margin-right: 10%;
  }
  & .margin_right2 {
    margin-right: 12.5%;
  }
  & .margin_right3 {
    margin-right: 7.7%;
  }
  & .margin_right4 {
    margin-right: 12%;
  }
`;

export const Certification = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
`;

export const CertificationWrapper = styled.div`
  border: 2px solid #eff1fe;
  width: 25%;
  padding: 3%;
  border-radius: 20px;
  & > .title {
    display: flex;
    justify-content: center;
    font-size: 25px;
    border-bottom: 2px solid #cfc7fd;
  }
  & > .pd-5 {
    padding-top: 5%;
    font-size: 20px;
  }
  & > img {
    padding-top: 5%;
    width: 100%;
  }
`;

export const Review = styled.div`
  margin-top: 5%;
  font-size: 25px;
  width: 100%;
  & > .flex {
    display: flex;
    align-items: center;
  }
  & > .flex .marginRight {
    margin-right: auto;
  }
  & > .flex .cursur {
    cursor: pointer;
  }
`;

export const ReviewWrapper = styled.div`
  margin-top: 120px;
  height: 500px;
  font-size: 25px;
  width: 100%;
  & > .flex {
    display: flex;
    align-items: center;
  }
  & > .flex .marginRight {
    margin-right: auto;
  }
  & > .flex .cursur {
    cursor: pointer;
  }
`;

export const CertificationDescription = styled.div`
  border: 2px solid #eff1fe;
  width: 60%;
  padding: 3%;
  border-radius: 20px;
  & > .title {
    display: flex;
    justify-content: center;
    font-size: 25px;
    border-bottom: 2px solid #cfc7fd;
  }
  & > .pd-5 {
    padding-top: 3%;
    font-size: 20px;
    padding-bottom: 3%;
  }
`;

export const Image = styled.img`
  border: 1px solid #eff1fe;
  width: 30%;
  height: 155px;
  margin-right: 2%;
  border-radius: 20px;
  box-shadow: 3px 7px 12px 0 #c2c2c2;
`;

export const CertificationImage = styled.div`
  width: 600px;
  height: 180px;
  display: flex;
`;

export const ViewMore = styled.div`
  background-color: #8673ff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 220px;
  cursor: pointer;
`;

export const ReviewImage = styled.div`
  width: 220px;
  height: 180px;
  display: flex;
  margin-bottom: 3%;
`;

export const CertificationModal = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

export const CertificationModalWrapper = styled.div`
  background-color: #eff1fe;
  width: 20%;
  height: 35%;
  border-radius: 20px;
  padding: 2%;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CertImage = styled.div`
  font-size: 25px;
  margin: 0 auto;
  margin-bottom: 2%;
`;

export const Button = styled.button`
  background-color: #8673ff;
  border: #8673ff;
  color: #ffff;
  border-radius: 5px;
  font-size: 17px;
`;

export const ImageCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CertModal = styled.div`
  background-color: #eff1fe;
  width: 30%;
  height: 30%;
  border-radius: 20px;
  padding: 2%;
`;

export const ModalTtile = styled.input`
  margin: 0 2%;
  width: 80%;
  border: none;
  font-size: 17px;
  border-radius: 5px;
`;

export const ModalTextarea = styled.textarea`
  margin: 0 2%;
  width: 80%;
  border: none;
  font-size: 17px;
  border-radius: 5px;
  resize: none;
  height: 100px;
`;

export const CertificationModalImage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  z-index: 10000;
`;

export const ShowCertImage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 10000;
`;

export const ShowReviewImage = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  position: fixed;
  overflow: auto;
  z-index: 10000;
`;

export const ReviewImg = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ReviewImgWrapper = styled.div`
  width: 580px;
  background-color: #eff1fe;
  padding: 1%;
  border-radius: 10px;
`;

export const ReviewTitle = styled.div`
  display: flex;
  margin-bottom: 2%;
  font-size: 18px;
`;

export const User = styled.div`
  width: 600px;
  font-size: 20px;
  display: flex;
  margin-bottom: 10px;
`;

export const ParticipateUser = styled.div`
  display: grid;
  width: 442px;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
`;

export const ParticipateUserName = styled.div`
  margin: 0 3px;
  border-radius: 20px;
  padding: 0 2% 2% 0;
`;

export const NextChallenge = styled.div`
  width: 100%;
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

export const ButtonType = styled.button`
  margin-left: 1%;
  background-color: #8673ff;
  border: #8673ff;
  border-radius: 5px;
  font-size: 17px;
  color: #ffff;
`;

export const CertTime = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  font-size: 20px;
  width: 1024px;
  margin-bottom: 5px;
  margin-top: 5px;
  place-items: center;
`;

export const CertificationTtime = styled.div`
  background-color: #eff1fe;
  width: 100%;
  border-radius: 7px;
  padding: 3px 0 3px 13px;
  margin-bottom: 7px;
`;

export const NonReviewList = styled.div`
  border: 2px solid #eff1fe;
  width: 100%;
  height: 450px;
  margin-top: 1%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
`;

export const List = styled.div`
  border: 2px solid #eff1fe;
  width: 1000px;
  height: 450px;
  margin-top: 1%;
  font-size: 20px;
  border-radius: 20px;
  padding: 2% 0 2% 2%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const CertButtonType = styled.button`
  width: 10%;
  background-color: #8673ff;
  border: #8673ff;
  border-radius: 5px;
  font-size: 17px;
  color: #ffff;
  cursor: pointer;
`;

export const Comment = styled.input`
  width: 1024px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 2px solid #8673ff;
`;

export const CommentButton = styled.button`
  margin-left: 5%;
  width: 5%;
  background-color: #8673ff;
  border: #8673ff;
  border-radius: 5px;
  font-size: 17px;
  color: #ffff;
`;

export const CommentList = styled.div`
  border: 2px solid #eff1fe;
  padding: 1% 1% 0 1%;
  border-radius: 10px;
  margin-top: 2%;
  width: 1000px;
`;

export const CommentWrapper = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  margin-bottom: 1%;
  border-bottom: 2px solid #eff1fe;
`;

export const DeleteButton = styled.button`
  margin-left: 1%;
  width: 5%;
  background-color: #8673ff;
  border: #8673ff;
  font-size: 17px;
  border-radius: 5px;
  color: #ffff;
  margin-right: 10px;
`;
