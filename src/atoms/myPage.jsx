import { atom } from "recoil";

export const myPageState = atom({
  key: "myPage",
  default: [
    {
      myPageName: 'アニソン',
    },
    {
      myPageName: '感動する曲',
    },
    {
      myPageName: '盛り上がる曲',
    },
  ]
});