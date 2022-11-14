import styled from 'styled-components';

const ContentA = styled.div`
  transition: 0.5s;

  img {
    max-width: 230px;
    border-radius: 10px;
  }

  h4 {
    opacity: 0.4;
    margin: 10px 0 0;
    padding: 0;
    color: black;
    text-align: center;
    font-size: 1.2em;
  }
`;

const ContentB = styled.div`
  padding-top: 100px;
  text-align: center;
  > a {
    margin-top: 10px;
    display: inline-block;
    text-decoration: none;
    height: 20px;

    :hover {
      background: #8673ff;
      color: #fff;
    }
  }
`;

const Face = styled.div`
  width: 280px;
  transition: 0.5s;
  border-radius: 10px;

  &.face1 {
    height: 220px;
    position: relative;
    background: #eff1fe;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
  }

  &.face2 {
    height: 200px;
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(-100px);
  }
`;

const Card = styled.div`
  position: relative;
  margin-top: -90px;
  cursor: pointer;

  :hover {
    ${Face} {
      &.face1 {
        transform: translateY(10px);
      }

      &.face2 {
        transform: translateY(-100px);
      }
    }
    ${ContentA} {
      > h4 {
        opacity: 1;
        font-weight: bold;
        color: #8673ff;
      }
    }
  }
`;

function Challenge() {
  return (
    <>
      <Card>
        <Face className="face1">
          <ContentA>
            <img
              alt="chllenge"
              src="https://wp.penguin.co.uk/wp-content/uploads/2022/01/Penguin-Reading20Challenge-main-image-1800x1200-1.jpg"
            />
            <h4>ChallengeName</h4>
          </ContentA>
        </Face>
        <Face className="face2">
          <ContentB>
            <p>About Challenge, abcdefghijklmnopqrstuvwxyz</p>
            <a href="none">Read More</a>
          </ContentB>
        </Face>
      </Card>
    </>
  );
}

export default Challenge;
