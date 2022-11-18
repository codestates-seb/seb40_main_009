import { atom } from 'recoil';

export const createChallenge = atom({
  key: 'createChallenge',
  default: {},
});

export const createNumber = atom({
  key: 'addNumber',
  default: 0,
});
