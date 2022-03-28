
type CampaignState = {
  status: "idle"| "loading" | "complete" | "failed";
  campaigns: Array<Navigation['campaign']> | [];
};