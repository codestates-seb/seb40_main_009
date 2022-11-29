import { atom } from 'recoil';

export const createChallengeStateNumber = atom({
  key: 'createChallengeStateNumber',
  default: 1,
  dangerouslyAllowMutability: true,
});

export const createChallengePageNumber = atom({
  key: 'createChallengePageNumber',
  default: 1,
});
