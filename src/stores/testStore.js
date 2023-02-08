import { ref } from 'vue';
import { defineStore } from "pinia";

export default defineStore('testStore', () => {
  const ww = () => {
    console.log('ww');
  };
  const xx = () => {
    ww();
  };
  return {
    xx
  };
});