type UserState = {
  status: "idle" | "loading" | "logged" | "failed"
  userData: ApiComponents["schemas"]["User"],
};
