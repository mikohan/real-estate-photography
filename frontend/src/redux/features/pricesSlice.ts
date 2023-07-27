import { createSlice } from '@reduxjs/toolkit';

export interface IPrice {
  name: string;
  value: number;
  thumbnail?: string;
}

const initialState: IPrice = {
  name: '',
  value: 0,
  thumbnail: ''
};
