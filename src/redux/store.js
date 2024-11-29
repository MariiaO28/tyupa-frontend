import { configureStore } from "@reduxjs/toolkit";
// import { contactsReducer } from "./contacts/contactsSlice";
// import { filtersReducer } from "./filter/filtersSlice";
import { authReducer } from "./auth/authSlice.js";
import { petsReducer } from "./pets/petsSlice.js";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// const authPersistConfig = {
//   key: "auth",
//   storage,
//   whitelist: ["token"],
// };

// const authPersistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
  }
});

// export const persistor = persistStore(store);
