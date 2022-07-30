import { IKata } from '../interfaces/Ikata.interface';

export type KatasResponse = {
  katas: IKata[];
  totalPages: number;
  currentPage: number;
};
