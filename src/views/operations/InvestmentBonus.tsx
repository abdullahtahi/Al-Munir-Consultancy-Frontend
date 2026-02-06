import PageContainer from "@components/container/PageContainer";
import InvestmentBonusComponent from "src/components/operations/InvestmentBonus";
import Box from "@mui/material/Box";

const InvestmentBonus = () => {
  return (
    <PageContainer
      title="Investment Bonus"
      description="this is Investment Bonus"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ width: "100%" }}>
          <InvestmentBonusComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default InvestmentBonus;
