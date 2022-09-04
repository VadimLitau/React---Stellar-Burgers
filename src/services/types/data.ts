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
    __v:number;
    _id: string;
  }
export interface IDeleteIngr{
    count: number;
    id: string;
    index: string;
    key: string;
    name: string;
    price: number;
    src: string;
    type: string;
}
export interface IAddElem{
    count: number;
    id: string;
    index: string;
    name: string;
    key: undefined|string;
    price: number;
    src: string;
    type: string;}

export interface IChangeElem{
    count: number;
    id: string;
    index: string;
    key: string;
    name: string;
price:number;
src: string;
type:string;
}