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
  height: 300px;
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
  margin-bottom: 3%;
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
  /* border: 2px solid red; */
  width: 220px;
  height: 180px;
  display: flex;
  margin-bottom: 3%;
`;
