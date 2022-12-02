import { ChartBarComponent } from '../../style/MyProfilePageStyle/MyProfilePageStyle';

function ChartBar({ percentage }) {
  return (
    <ChartBarComponent percentage={percentage}>
      <div className="level-bar">
        Lv-1
        <div className="progress-bar">
          <div className="progress">{percentage}%</div>
        </div>
      </div>
    </ChartBarComponent>
  );
}

export default ChartBar;
