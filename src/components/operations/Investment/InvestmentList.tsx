import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Add, FilterList } from "@mui/icons-material";
import { IconTrash, IconPencil } from "@tabler/icons-react";

import {
  Alert,
  Box,
  Button,
  Collapse,
  Snackbar,
  useTheme,
} from "@mui/material";
import PageContainer from "@components/layout/PageContainer";
import GenericTable from "src/components/generic-table";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { baseUrl, destroy, get, post, put } from "src/services/default";
import InvestmentFilters from "./InvestmentFilters";
import InvestmentDialog from "./dialog/AddInvestmentDialog";
import { DeleteDialog } from "src/components/delete-dialog/DeleteDialog";
import Grid from "@mui/material/Grid2";
import AuthorizeComponent from "src/utils/AuthorizeComponent";
import {
  CAN_ADD_INVESTMENT,
  CAN_DELETE_INVESTMENT,
  CAN_VIEW_INVESTMENT,
  CAN_EDIT_INVESTMENT,
} from "src/constants/Permissions";
import dayjs from "dayjs";

interface TableColumn {
  id: string;
  label: React.ReactNode;
  align: "left" | "center" | "right";
  minWidth: number;
  classNames: string;
  key: string;
  render?: (row: any, index: number) => React.ReactNode;
}

const InvestmentList: React.FC = () => {
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
  const [investmentData, setInvestmentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // Add/Edit dialog state
  const [investmentDialogOpen, setInvestmentDialogOpen] = useState(false);
  const [investmentDialogMode, setInvestmentDialogMode] = useState<
    "Add" | "Edit"
  >("Add");

  const hanldOpenDeleteModal = (row: any) => {
    setSingleUser(row);
    setOpenDeleteModal(true);
  };
  const hanldCloseDeleteModal = () => setOpenDeleteModal(false);

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
      id: "employeeName",
      label: "Employee Name",
      align: "left",
      minWidth: 100,
      classNames: "pr-0 text-nowrap",
      key: "employeeName",
      render: (row) =>
        row?.consultant?.firstName + " " + row?.consultant?.lastName || "-",
    },
    {
      id: "typeOfInvestment",
      label: "Investment Type",
      align: "left",
      minWidth: 100,
      classNames: "pr-0 text-nowrap",
      key: "typeOfInvestment",
      render: (row) => row?.typeOfInvestor || "-",
    },
    {
      id: "durationFrom",
      label: "Duration From",
      align: "left",
      minWidth: 100,
      classNames: "pr-0 text-nowrap",
      key: "durationFrom",
      render: (row) =>
        row?.durationFrom ? dayjs(row?.durationFrom).format("DD-MM-YYYY") : "-",
    },
    {
      id: "durationTo",
      label: "Duration To",
      align: "left",
      minWidth: 100,
      classNames: "pr-0 text-nowrap",
      key: "durationTo",
      render: (row) =>
        row?.durationTo ? dayjs(row?.durationTo).format("DD-MM-YYYY") : "-",
    },
    {
      id: "amount",
      label: "Amount",
      align: "left",
      minWidth: 80,
      classNames: "pr-0 text-nowrap",
      key: "amount",
      render: (row) => row?.amount + "Rs",
    },
    {
      id: "Action",
      label: "Action",
      align: "left",
      minWidth: 10,
      classNames: "pr-0 text-nowrap",
      key: "Action",
      render: (row) => (
        <Box display="flex" gap={1}>
          <AuthorizeComponent permission={CAN_EDIT_INVESTMENT}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconPencil size={18} />}
              onClick={() => {
                setSingleUser(row);
                setInvestmentDialogMode("Edit");
                setInvestmentDialogOpen(true);
              }}
              sx={{ minWidth: "auto" }}
            />
          </AuthorizeComponent>
          {/* <AuthorizeComponent permission={CAN_DELETE_INVESTMENT}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconTrash size={18} />}
              onClick={() => hanldOpenDeleteModal(row)}
              sx={{ minWidth: "auto" }}
            />
          </AuthorizeComponent> */}
        </Box>
      ),
    },
  ];

  const getInvestments = useCallback(
    async (values: any) => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(values).toString();
        const investments: any = await get(
          `${baseUrl}/api/v1/investment?page=${page}&limit=${rowsPerPage}&${queryString}`,
        );
        console.log("investments", investments);
        if (investments.data) {
          setInvestmentData(investments.data.rows || []);
          setTotalCount(investments.data.count || 0);
        } else {
          setInvestmentData([]);
          setTotalCount(0);
          setSnackbar({
            open: true,
            message: investments.message || "",
            severity: "error",
          });
        }
        return investments;
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

  const handleSubmit = async (values: any) => {
    try {
      let result: any;
      if (investmentDialogMode === "Edit") {
        result = await put(
          `${baseUrl}/api/v1/investment/${singleUser.id}`,
          values,
        );
      } else {
        result = await post(`${baseUrl}/api/v1/investment`, values);
      }

      if (result.data) {
        setSnackbar({
          open: true,
          message:
            result.message ||
            `Investment ${investmentDialogMode === "Edit" ? "updated" : "created"} SuccessFully`,
          severity: "success",
        });
        setInvestmentDialogOpen(false);
      } else if (result?.message) {
        setSnackbar({
          open: true,
          message: result.message || "Something went wrong",
          severity: "error",
        });
      }
      console.log("result", result);
    } catch (error: any) {
      console.log("error", error);
      const errorMsg = Array.isArray(error) ? error[0]?.message : error.message;
      setSnackbar({
        open: true,
        message: errorMsg || "Something went wrong",
        severity: "error",
      });
    }
  };

  const deleteInvestment = async () => {
    try {
      await destroy(`${baseUrl}/api/v1/investment/${singleUser.id}`);
      setSnackbar({
        open: true,
        message: "Deleted Successfull",
        severity: "success",
      });
      hanldCloseDeleteModal();
      getInvestments({});
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getInvestments({});
  }, [rowsPerPage, page, investmentDialogOpen]);

  console.log("investmentData", investmentData);

  return (
    <>
      <PageContainer
        heading={<span>Investments ({totalCount || 0})</span>}
        breadcrumbs={[
          { title: t("home"), to: "/" },
          { title: "Investments", to: "/al-munir-system/investment" },
        ]}
        action={
          <AuthorizeComponent permission={CAN_ADD_INVESTMENT}>
            <Button
              variant="contained"
              onClick={() => {
                setInvestmentDialogMode("Add");
                setInvestmentDialogOpen(true);
              }}
              color="primary"
              size="small"
              startIcon={<Add />}
              sx={{ "& .MuiButton-startIcon": { marginRight: 0 } }}
            />
          </AuthorizeComponent>
        }
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
            <InvestmentFilters getInvestments={getInvestments} />
          </Box>
        </Collapse>

        <Grid size={12}>
          <GenericTable
            data={investmentData}
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            totalCount={totalCount || 0}
            isLoading={loading}
          />
        </Grid>
      </PageContainer>

      <InvestmentDialog
        open={investmentDialogOpen}
        onClose={() => setInvestmentDialogOpen(false)}
        handleSubmit={handleSubmit}
        mode={investmentDialogMode}
        singleUser={singleUser}
      />
      <DeleteDialog
        deleteImg={deleteInvestment}
        handleClose={hanldCloseDeleteModal}
        title="Delete Investment"
        subText="Are you sure to delete Investment"
        open={openDeleteModal}
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

export default InvestmentList;
