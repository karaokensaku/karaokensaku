import { atom } from "recoil";

const initialMypages = []

export const myPageState = atom({
  key: "myPage",
  default: initialMypages
});