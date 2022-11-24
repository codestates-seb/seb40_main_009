import { useRecoilValue } from 'recoil';
import { createNumber } from '../../atoms/atoms';
import styled from 'styled-components';
import ChallengeAsk1 from './CreateAsk1';
import ChallengeAsk2 from './CreateAsk2';
import ChallengeAsk3 from './CreateAsk3';
import ChallengeAsk4 from './CreateAsk4';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function CreateChallenge() {
  const questionNumber = useRecoilValue(createNumber);
  const { register, handleSubmit } = useForm();
  const onValid = (data) => {
    console.log('ho', data);
    try {
      axios.post(
        '/challenges',
        { data },
        {
          headers: {
            'content-type': 'multipart/form-data',
            'ngrok-skip-browser-warning': 'none',
            Authorization:
              'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0NkBrYWthby5jb20iLCJpYXQiOjE2Njg1NjQ0OTMsImV4cCI6MTY3Nzc4NDY3M30.i4rAIdLBMReygLX0hfFZzySqQAnnc5fG-j6AhBQhW5KW-qaHk9PPuuzCrhC3rR0xamUVlHeR0-QgLElR1WLjMQ',
          },
        }
      );
    } catch (error) {
      console.log('error : ', error);
    }
  };

  return (
    <CreateContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <ChallengeAsk1 register={register} />
        <ChallengeAsk2 register={register} />
        <ChallengeAsk3 register={register} />
        <ChallengeAsk4 register={register} />
        <button>submit</button>
      </form>
    </CreateContainer>
    // <CreateContainer>
    //   {questionNumber === 1 ? <ChallengeAsk1 /> : null}
    //   {questionNumber === 2 ? <ChallengeAsk2 /> : null}
    //   {questionNumber === 3 ? <ChallengeAsk3 /> : null}
    //   {questionNumber === 4 ? <ChallengeAsk4 /> : null}
    // </CreateContainer>
  );
}
