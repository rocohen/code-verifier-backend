export enum KataLevel {
  BASIC = 'Easy',
  MEDIUM = 'Medium',
  HIGH = 'Hard',
}

export interface IKata {
  name: string;
  description: string;
  level: KataLevel;
  author: string;
  date?: Date;
  valoration?: number;
  peopleWhoRated?: number;
  chances?: number;
}
