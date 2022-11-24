import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function ChartBar({ percentage }) {
  return (
    <S.ChartBarComponent percentage={percentage}>
      <div className="level-bar">
        Lv-1
        <div className="progress-bar">
          <div className="progress">{percentage}%</div>
        </div>
      </div>
    </S.ChartBarComponent>
  );
}

export default ChartBar;
