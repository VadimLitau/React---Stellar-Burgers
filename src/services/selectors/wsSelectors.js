export const getMessages = (store) => store.ws.messages || [];
export const getUser = (store) => store.route.userAuthProfile;