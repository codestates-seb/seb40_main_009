import * as S from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function ChartBar() {
  return (
    <S.ChartBarComponent>
      <div className="level-bar">
        Lv-1
        <div className="progress-bar">
          <div className="progress">72%</div>
        </div>
      </div>
    </S.ChartBarComponent>
  );
}

export default ChartBar;
