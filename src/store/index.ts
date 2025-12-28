import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/authSlice";
import quantityReducer from "../features/quantitySlice";
import subTotalReducer from "../features/subTotalSlice";
import dateReducer from "../features/dateSlice";
import timeReducer from "../features/timeSlice";
import experienceReducer from "../features/experienceSlice";
import adminReducer from "../features/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    quantity: quantityReducer,
    subTotal:subTotalReducer,
    date:dateReducer,
    time:timeReducer,
    experience: experienceReducer,
    admin:adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;