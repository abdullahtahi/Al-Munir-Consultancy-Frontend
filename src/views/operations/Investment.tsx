import PageContainer from "@components/container/PageContainer";
import InvestmentComponent from "src/components/operations/Investment";
import Box from "@mui/material/Box";

const Investment = () => {
  return (
    <PageContainer title="Investment" description="this is Investment">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ width: "100%" }}>
          <InvestmentComponent />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Investment;
