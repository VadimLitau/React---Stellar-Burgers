import { baseUrl } from './constants'

export const getBurgerDataRequest = async() => {
    return await fetch(`${baseUrl}ingredients`);
}