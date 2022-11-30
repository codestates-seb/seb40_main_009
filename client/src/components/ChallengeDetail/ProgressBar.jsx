import { ChartBarComponent } from '../../style/ChallengeDetailProgress/ProgressBar';

export default function ProgressBar({ percentage }) {
  return (
    <ChartBarComponent percentage={percentage}>
      <div className="level-bar">
        <div className="progress-bar">
          <div className="progress">{percentage}%</div>
        </div>
      </div>
    </ChartBarComponent>
  );
}
