import styled from 'styled-components';

export const Container = styled.header`
  width: 1024px;
  margin: 0 auto;
  padding-top: 120px;
`;

export const Recruitment = styled.div`
  display: flex;
  & > img {
    height: 350px;
    width: 34%;
    border-radius: 20px 0 0 20px;
  }
  & > div {
    background-color: #eff1fe;
    height: 350px;
    width: 30%;
    position: absolute;
    top: 120px;
    right: 645px;
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

export const Title = styled.div`
  display: flex;
  & > .pd-5 {
    padding-right: 5%;
  }
`;

export const PaddingB = styled.div`
  padding-bottom: 10%;
`;

export const Text = styled.div`
  display: flex;
`;

export const Certification = styled.div`
  margin-top: 5%;
  display: flex;
  justify-content: space-between;
  height: 300px;
`;

export const Wrapper = styled.div`
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
`;

export const BtnWrapper = styled.div`
  display: flex;
  margin-top: 5%;
  //   border: 1px solid orange;
  justify-content: center;
  & > .custom-btn {
    font-size: 20px;
    width: 150px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  & > .btn-8 {
    background-color: #f0ecfc;
    background-image: linear-gradient(315deg, #f0ecfc 0%, #c797eb 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  & > .btn-8 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  //테두리
  & > .btn-8:before,
  .btn-8:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    background: #c797eb;
    transition: all 0.3s ease;
  }
  & > .btn-8:before {
    height: 0%;
    width: 2px;
  }
  & > .btn-8:after {
    width: 0%;
    height: 2px;
  }
  //   마우스올리면 오른쪽 선
  & > .btn-8:hover:before {
    height: 100%;
  }
  //   마우스올리면 아래쪽 선
  & > .btn-8:hover:after {
    width: 100%;
  }
  //   마우스올리면 배경하얗게
  & > .btn-8:hover {
    background: transparent;
  }
  //마우스올리면 글씨색 바뀜
  & > .btn-8 span:hover {
    color: #c797eb;
  }
  & > .btn-8 span:before,
  .btn-8 span:after {
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    background: #c797eb;
    transition: all 0.3s ease;
  }
  & > .btn-8 span:before {
    width: 2px;
    height: 0%;
  }
  & > .btn-8 span:after {
    height: 2px;
    width: 0%;
  }
  //   마우스올리면 오른쪽 선
  & > .btn-8 span:hover:before {
    height: 100%;
  }
  //   마우스올리면 위쪽 선
  & > .btn-8 span:hover:after {
    width: 100%;
  }
`;
