
type CampaignState = {
  status: "idle"| "loading" | "complete" | "failed";
  campaigns: Array<Component['campaign']> | [];
};