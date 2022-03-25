
type UserState = {
  status: "idle" | "loading" | "logged" | "failed";
  userData: Users["getUserMe"]
};

type Users = {
  getUserMe: ApiOperations["get-users-me"]["responses"]["200"]["content"]["application/json"]
}