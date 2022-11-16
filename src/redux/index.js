import { configureStore } from "@reduxjs/toolkit";
import { amenitiesSlice } from "./amenity";
import { amenityItemsSlice } from "./amenityItems";
import { announcementsSlice } from "./announcements";
import { authMiddleware, authSlice } from "./auth";
import { chatSlice } from "./chat";
import { houseCouncilSlice } from "./houseCouncil";
import { notificationSlice } from "./notification";
import { profilesSlice } from "./profiles";
import menuReducer from "./reducers/menuReducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    residentProfiles: profilesSlice.reducer,
    houseCouncil: houseCouncilSlice.reducer,
    announcements: announcementsSlice.reducer,
    amenities: amenitiesSlice.reducer,
    amenityItems: amenityItemsSlice.reducer,
    chat: chatSlice.reducer,
    menu: menuReducer,
    notification: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
