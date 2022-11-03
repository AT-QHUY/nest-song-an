import { Box, Grid, Paper, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useGetUsersCount, useGetUsersPagination } from "./api/hooks";
import { Loading } from "../../../components/Loading/Loading";
import { AppButton } from "../../../components/Button";
import { convertMsToDate } from "../../../utils/serverUtils";

export function Users() {
  const [page, setPage] = useState(0);
  const [isRerender, setRerender] = useState(false);
  const [pageSize, setPageSize] = useState(7);
  const { data, error, loading } = useGetUsersPagination({
    offset: page + 1,
    limit: pageSize,
  });
  const { data: count } = useGetUsersCount({});
  const navigate = useNavigate();
  const handleStatusChange = (id) => {
    setRerender(!isRerender);
    console.log(1);
  };

  const columns = useMemo(() => {
    return [
      { field: "fullname", headerName: "Họ và tên", width: 300 },
      { field: "address", headerName: "Địa chỉ", width: 350 },
      {
        field: "dateOfBirth",
        headerName: "Ngày sinh",
        width: 350,
        renderCell: ({ value }) => {
          return <span>{convertMsToDate(value)} </span>;
        },
      },
      { field: "phoneNumber", headerName: "SDT", width: 150 },
      {
        field: "status",
        headerName: "Trạng thái",
        width: 150,
        renderCell: ({ value }) => {
          return <span>{value === 0 ? "Đang ẩn" : "Hoạt động"} </span>;
        },
      },
      {
        field: "id",
        headerName: "Action",
        width: 150,
        renderCell: ({ value }) => {
          return (
            <AppButton
              onClick={(e) => {
                handleStatusChange();
                e.stopPropagation();
              }}
              style={{ textTransform: "capitalize" }}
            >
              Chuyển trạng thái
            </AppButton>
          );
        },
      },
    ];
  }, []);

  if (loading) return <Loading />;

  if (error) return <Navigate to="404" />;

  return (
    <>
      <Grid item variant="outlined" style={{ display: "flex" }}>
        {/* For search & Filter */}
        <Paper
          sx={{
            width: "100%",
            padding: "12px",
            display: "flex",
            justifyContent: "space-between",
            paddingInline: "24px",
            alignItems: "center",
          }}
        >
          <Box>
            {" "}
            <Typography variant="h5">Quản lí người dùng </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid
        item
        sx={{ width: "100%" }}
        variant="outlined"
        style={{ display: "flex" }}
      >
        <Paper sx={{ width: "100%", padding: "24px", height: "100%" }}>
          <AppTable
            data={data || []}
            columns={columns}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            autoHeight
            total={count}
          />
        </Paper>
      </Grid>
    </>
  );
}
