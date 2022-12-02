import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { format } from 'date-fns';
import exampleImg from '../image/example.png';

const { persistAtom } = recoilPersist();

export const createChallengeStateNumber = atom({
  key: 'createChallengeStateNumber',
  default: 1,
  dangerouslyAllowMutability: true,
});

export const createChallengePageNumber = atom({
  key: 'createChallengePageNumber',
  default: 1,
});

export const startDateState = atom({
  key: 'startDate',
  default: format(Date.now(), 'yyyy-MM-dd'),
});

export const lastDateState = atom({
  key: 'lastDate',
  default: format(Date.now(), 'yyyy-MM-dd'),
});

export const createChallangeRepresentationImage = atom({
  key: 'createChallangeRepresentationImage',
  default: exampleImg,
});
