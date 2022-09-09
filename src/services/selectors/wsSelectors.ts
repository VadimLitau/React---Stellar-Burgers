import { RootState } from "../types";

export const getMessages = (store: RootState) => store.ws.messages || [];
export const getUser = (store: RootState) => store.route.userAuthProfile;
