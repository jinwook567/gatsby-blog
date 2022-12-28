import { atom } from 'recoil';

const categoryState = atom({
  key: 'categoryState',
  default: 'ALL',
});

export default categoryState;
