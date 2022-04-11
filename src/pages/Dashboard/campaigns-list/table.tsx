import { Anchor, GroupedTable, Span, theme } from "@appquality/unguess-design-system";

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
        name: <Anchor href={`#test/${campaign.id}`}><Span isBold style={{color: theme.palette.grey[800]}}>{campaign.title}</Span></Anchor>,
        type: campaign.campaign_type_name,
        testType: campaign.campaign_type_name,
        startDate: new Date(campaign.start_date).toLocaleDateString(),
        status: campaign.status_id === 1 ? "Running" : "Completed",
      });
    });

    groups.push({
      groupName: projectName,
      items: campaigns,
    });
  });

  return <GroupedTable groups={groups} columns={columns}/>;
};
