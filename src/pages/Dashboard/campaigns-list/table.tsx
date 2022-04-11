import { GroupedTable } from "@appquality/unguess-design-system";

export const TableList = ({
  campaigns,
}: {
  campaigns: Array<Array<Component["campaign"]>>;
}) => {
  console.log("Tablelist", campaigns);

  let columns = [
      { name: "Title", field: "name" },
      { name: "Campaign Type", field: "type" },
      { name: "Test Type", field: "testType" },
      { name: "Start Date", field: "startDate" },
      { name: "Status", field: "status" },
  ];

  //Colonne Nome Campagna, Tipologia, Tipo Test, StartDate, Status

  let groups: any = [];

  campaigns.forEach((campaignGroup) => {
    let projectName = campaignGroup[0].project_name;
    let campaigns: any = [];
    campaignGroup.forEach((campaign) => {
      campaigns.push({
        name: campaign.title,
        type: campaign.campaign_type_name,
        testType: campaign.campaign_type_name,
        startDate: campaign.start_date,
        status: campaign.status_id === 1 ? "Running" : "Completed",
      });
    });

    groups.push({
      groupName: projectName,
      items: campaigns,
    });
  });

  return <GroupedTable groups={groups} columns={columns} />;
};
