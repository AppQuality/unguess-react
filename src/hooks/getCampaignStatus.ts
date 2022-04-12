export const getCampaignStatus = (campaign: Component["campaign"]) => {
    //Current Date
    const now = new Date().getTime();

    if (campaign.status_id === 2) {
        return "COMPLETED";
    } else if (campaign.status_id === 1) {
        if (new Date(campaign.start_date).getTime() > now) {
            return "INCOMING";
        } else {
            return "PROGRESS";
        }
    }
}