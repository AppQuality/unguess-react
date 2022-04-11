import { GroupedTable } from "@appquality/unguess-design-system";

export const TableList = ({
  campaigns,
}: {
  campaigns: Array<Array<Component["campaign"]>>;
}) => {
  console.log("Tablelist", campaigns);

  

  return <GroupedTable />;
};
