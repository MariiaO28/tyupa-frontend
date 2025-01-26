export const selectEmail = (state) => state.auth.user.email;
export const selectToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectisRefreshing = (state) => state.auth.isRefreshing;