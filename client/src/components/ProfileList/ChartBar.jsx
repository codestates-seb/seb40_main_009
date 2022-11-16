import styled from 'styled-components';

const ChartBarComponent = styled.div`
  .level-bar {
    width: 350px;
  }
  .progress-bar {
    width: 100%;
    height: 20px;
    background-color: #eff1fe;
    font-weight: 600;
    font-size: 0.8rem;
  }

  .progress-bar .progress {
    width: 72%; // 나타내고자 하는 퍼센트 값을 넣으면 됩니다.
    height: 20px;
    padding: 0;
    text-align: center;
    background-color: #b0b4f9;
    color: #111;
  }
`;
function ChartBar() {
  return (
    <ChartBarComponent>
      <div className="level-bar">
        Lv-1
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </ChartBarComponent>
  );
}

export default ChartBar;
