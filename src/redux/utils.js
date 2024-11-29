export const handleRejected = (state, action) => {
    state.isRefreshing = false;
    state.error = action.payload;
  };
  export const handlePending = (state) => {
    state.isRefreshing = true;
    state.error = null;
  };