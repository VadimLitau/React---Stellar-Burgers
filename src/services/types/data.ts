export interface IIngr {
  calories: string | number;
  carbohydrates: string | number;
  fat: string | number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: string | number;
  type: string;
  __v: number;
  _id: string;
  count: number;
  id: string;
}
export interface IDeleteIngr {
  count: number;
  id: string;
  index: string;
  key: string;
  name: string;
  price: number;
  src: string;
  type: string;
}
export interface IAddElem {
  count: number;
  id: string;
  index: string;
  name: string;
  key: string;
  price: number;
  src: string;
  type: string;
  _id?: string;
}

export interface IAddElems {
  payload: IAddElem;
}

export interface IChangeElem {
  count: number;
  id: string;
  index?: string;
  key?: string;
  name: string;
  price: number;
  src: string;
  type: string;
}

export interface INewElem {
  type: string;
  count: number;
  _id: string;
  name: string;
  image: string;
  price: number;
}

export interface IFeedItem {
  createAd: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updateAt: string;
  _id: string;
}

export interface IChangeItem {
  index: number;
  item: IChangeElem;
}
export interface LocationState {
  background: any;
}

export interface IBun {
  count: number;
  id: string;
  index: string;
  key: string;
  name: string;
  price: number;
  src: string;
  type: string;
  _id?: string;
}
