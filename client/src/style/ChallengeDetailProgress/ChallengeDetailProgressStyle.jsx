import styled from 'styled-components';

export const Container = styled.header`
  width: 1024px;
  margin: 0 auto;
  padding-top: 120px;
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
    padding: 0.5%;
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
  & .margin_left {
    margin-right: 10%;
  }
  & .margin_left2 {
    margin-right: 12.5%;
  }
  & .margin_left3 {
    margin-right: 7.7%;
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
    font-size: 20px;
  }
  & > .pd-5 {
    padding-top: 5%;
  }
  & > img {
    padding-top: 5%;
    width: 100%;
  }
`;

export const Review = styled.div`
  border: 2px solid #eff1fe;
  margin-top: 5%;
  height: 500px;
  font-size: 20px;
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

export const CertifiationImageWrapper = styled.div`
  width: 100%;
  margin-top: 3%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const CertificationImage = styled.div`
  border: 2px solid red;
  width: 90%;
  height: 180px;
  display: flex;
  margin-bottom: 3%;
`;

export const ViewMore = styled.div`
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Width = styled.div`
  width: 100%;
`;

export const ReviewImageWrapper = styled.div`
  width: 90%;
  height: 180px;
  display: flex;
  margin-top: 3%;
  margin-left: 1%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
`;

export const ReviewImage = styled.div`
  border: 2px solid red;
  width: 90%;
  height: 180px;
  display: flex;
  margin-bottom: 3%;
`;
