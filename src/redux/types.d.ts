type GeneralState = {
  menu: MenuState;
  user: UserState;
};
type DispatchType =
  | UserDispatchType
  | MenuDispatchType
