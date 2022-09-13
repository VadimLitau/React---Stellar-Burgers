import { RootState } from "../types";

export const getWsConnected = (state: RootState) => state.ws.wsConnected;
