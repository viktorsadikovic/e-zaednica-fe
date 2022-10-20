const INITIAL_STATE = {
  isSidebarOpened: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, isSidebarOpened: action.payload };
    default:
      return state;
  }
};
