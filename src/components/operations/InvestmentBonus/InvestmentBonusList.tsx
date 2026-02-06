import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { FilterList } from "@mui/icons-material";
import { IconEye } from "@tabler/icons-react";

import {
  Alert,
  Box,
  Button,
  Collapse,
  Snackbar,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import PageContainer from "@components/layout/PageContainer";
import GenericTable from "src/components/generic-table";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { baseUrl, get } from "src/services/default";
import InvestmentBonusFilters from "./InvestmentBonusFilters";
import ViewInvestmentBonusDialog from "./dialog/ViewInvestmentBonusDialog";
import AuthorizeComponent from "src/utils/AuthorizeComponent";
import { CAN_VIEW_BONUS } from "src/constants/Permissions";

interface TableColumn {
  id: string;
  label: React.ReactNode;
  align: "left" | "center" | "right";
  minWidth: number;
  classNames: string;
  key: string;
  render?: (row: any, index: number) => React.ReactNode;
}

const InvestmentBonusList: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [singleUser, setSingleUser] = useState<any>({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success" | "info" | "warning",
  });
  const token = useSelector(
    (state: RootState) => state?.auth?.user?.data?.accessToken,
  );

  // State
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [bonusData, setBonusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Add/Edit dialog state
  const [bonusDialogOpen, setBonusDialogOpen] = useState(false);

  const handleOpenModal = (row: any) => {
    setSingleUser(row);
    setBonusDialogOpen(true);
  };
  const hanldBonusCloseModal = () => setBonusDialogOpen(false);

  const columns: TableColumn[] = [
    {
      id: "S.No",
      label: "S.No",
      align: "left",
      minWidth: 30,
      classNames: "pr-0",
      key: "sNo",
      render: (_, index) => index + 1,
    },
    {
      id: "sponsorName",
      label: "Invested By",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "sponsorName",
      render: (row) =>
        row?.fkFromConsultant?.firstName +
          " " +
          row?.fkFromConsultant?.lastName || "-",
    },
    {
      id: "consultant",
      label: "Consultant(Bonus receiver)",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "consultant",
      render: (row) =>
        row?.fkConsultant?.firstName + " " + row?.fkConsultant?.lastName || "-",
    },
    {
      id: "bonusType",
      label: "Bonus Type",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "bonusType",
      render: (row) => (
        <Typography sx={{ fontWeight: 600, textTransform: "capitalize" }}>
          {row?.bonusType.replace(/_/g, " ")}
        </Typography>
      ),
    },
    {
      id: "amount",
      label: "Transfer Amount",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "amount",
      render: (row) => row.amount + ".RS",
    },
    {
      id: "baseAmount",
      label: "Base Amount",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "baseAmount",
      render: (row) => row.baseAmount + ".RS",
    },
    {
      id: "status",
      label: "Status",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "status",
      render: (row) => (
        <Chip
          label={row?.status || "pending"}
          size="small"
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            backgroundColor: (theme) =>
              row?.status === "processed"
                ? theme.palette.success.light
                : theme.palette.warning.light,
            color: (theme) =>
              row?.status === "processed"
                ? theme.palette.success.main
                : theme.palette.warning.main,
            border: (theme) =>
              `1px solid ${
                row?.status === "processed"
                  ? theme.palette.success.main
                  : theme.palette.warning.main
              }`,
          }}
        />
      ),
    },
    {
      id: "view",
      label: "View",
      align: "left",
      minWidth: 10,
      classNames: "pr-0 text-nowrap",
      key: "view",
      render: (row) => (
        <AuthorizeComponent permission={CAN_VIEW_BONUS}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<IconEye size={18} />}
            onClick={() => handleOpenModal(row)}
            sx={{ minWidth: "auto" }}
          />
        </AuthorizeComponent>
      ),
    },
  ];

  const getBonus = useCallback(
    async (values: any) => {
      try {
        setLoading(true);
        const queryParams = { ...values, admissionId: null };
        const queryString = new URLSearchParams(queryParams).toString();
        const bonuses: any = await get(
          `${baseUrl}/api/v1/bonuses?page=${page}&limit=${rowsPerPage}&${queryString}`,
        );
        if (bonuses.data) {
          setBonusData(bonuses.data.rows);
          setTotalCount(bonuses.data.count);
        } else {
          setSnackbar({
            open: true,
            message: bonuses.message || "",
            severity: "error",
          });
        }
        console.log("bonuses", bonuses);

        return bonuses;
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.message || error,
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [token, rowsPerPage, page],
  );

  useEffect(() => {
    getBonus({});
  }, [rowsPerPage, page, bonusDialogOpen]);

  return (
    <>
      <PageContainer
        heading={<span>Investment Bonus ({totalCount})</span>}
        breadcrumbs={[
          { title: t("home"), to: "/" },
          { title: t("Investment Bonus"), to: "/investment-bonus" },
        ]}
      >
        <Box display="flex" justifyContent="flex-end" mb={1} width="100%">
          <Button
            variant="contained"
            size="small"
            startIcon={<FilterList />}
            onClick={() => setShowFilters((prev) => !prev)}
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.getContrastText(theme.palette.primary.light),
              "&:hover": { backgroundColor: theme.palette.primary.main },
            }}
          >
            {showFilters ? t("hideFilters") : t("showFilters")}
          </Button>
        </Box>

        <Collapse in={showFilters} timeout="auto" unmountOnExit>
          <Box mb={2} width="100%">
            <InvestmentBonusFilters getBonus={getBonus} />
          </Box>
        </Collapse>

        <Box width="100%" overflow="auto">
          <Box minWidth="1200px">
            <GenericTable
              data={bonusData}
              columns={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              totalCount={totalCount}
              isLoading={loading}
            />
          </Box>
        </Box>
      </PageContainer>
      <ViewInvestmentBonusDialog
        open={bonusDialogOpen}
        onClose={hanldBonusCloseModal}
        singleUser={singleUser}
        onSuccess={() => {
          getBonus({});
          setSnackbar({
            open: true,
            message: "Bonus processed successfully",
            severity: "success",
          });
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InvestmentBonusList;
