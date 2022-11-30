import styled from 'styled-components';
import { keyframes } from 'styled-components';

export const move = keyframes`
	0%{
    	width: 0;
      color: rgba(255, 255, 255, 0);
    }
    70%{
      color: rgba(255, 255, 255, 1);
    }
    100%{
    	width: ${({ percentage }) => percentage}%;
    }
`;

export const ChartBarComponent = styled.div`
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
    width: ${(props) =>
      props.percentage}%; // 나타내고자 하는 퍼센트 값을 넣으면 됩니다.
    height: 20px;
    padding: 0;
    text-align: center;
    background-color: #b0b4f9;
    color: #fff;
    text-align: right;
    line-height: 1.4rem;
    animation: ${move} 3s 1;
  }
`;
