import PlanCard from "../plan-card/PlanCard";
import Box from "@mui/material/Box";
import { ProductPlan } from "../../api/api";

function TariffTable(props: any) {
  return (
    <Box>
      {props.plans?.map((plan: ProductPlan) => (
        <div>
          <PlanCard plan={plan}></PlanCard>
        </div>
      ))}
    </Box>
  );
}

export default TariffTable;
