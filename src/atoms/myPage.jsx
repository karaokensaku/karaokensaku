import { atom } from "recoil";

const initialMypages = [
    {
      id: '2',
      title: 'アニソン',
      songs: [
        {
          songTitle: '糸'
        },
        {
          songTitle: 'ハルノヒ'
        },
        {
          songTitle: '春の蕾'
        },
      ]
    },
    {
      id: '3',
      title: '感動する曲',
    },
    {
      id: '4',
      title: '盛り上がる曲',
    }
  ];

export const myPageState = atom({
  key: "myPage",
  default: initialMypages
});