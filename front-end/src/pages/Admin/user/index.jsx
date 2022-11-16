import { Box, Grid, Paper, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useGetUsersCount, useGetUsersPagination } from "./api/hooks";
import { Loading } from "../../../components/Loading/Loading";
import { AppButton } from "../../../components/Button";
import { convertMsToDate } from "../../../utils/serverUtils";
import { userApi } from "../../../api/userApi";
import { accountApi } from "../../../api/accountApi";

export function Users() {
  const [page, setPage] = useState(0);
  const [isRerender, setRerender] = useState(false);
  const [pageSize, setPageSize] = useState(7);
  const { data, error, loading } = useGetUsersPagination({
    offset: page + 1,
    limit: pageSize,
    isRerender: isRerender,
  });
  const { data: count } = useGetUsersCount({});
  const navigate = useNavigate();
  const handleStatusChange = (id, status) => {
    accountApi
      .changeStatus(id, status)
      .then(() => {
        setRerender((current) => !current);
      })
      .catch((err) => console.log(err));
  };

  const columns = useMemo(() => {
    return [
      { field: "fullname", headerName: "Họ và tên", width: 300 },
      { field: "address", headerName: "Địa chỉ", width: 350 },
      {
        field: "dateOfBirth",
        headerName: "Ngày sinh",
        width: 200,
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
          const data = {
            color: value === 1 ? "green" : "red",
          };
          return (
            <span style={{ color: data.color }}>
              {value === 0 ? "Đang ẩn" : "Hoạt động"}{" "}
            </span>
          );
        },
      },
      {
        field: "role",
        headerName: "Chức vụ",
        width: 150,
        renderCell: ({ value }) => {
          return <span>{value.id === 2 ? "Khách hàng" : "Quản lí"} </span>;
        },
      },
      {
        field: "id",
        headerName: "Action",
        width: 150,
        renderCell: ({ value, row }) => {
          const data = {
            isCustomer: row.role.id === 2,
            isActive: row.status === 1,
            color: row.status === 1 ? "error" : "success",
          };
          return (
            <Button
              onClick={(e) => {
                if (data.isActive) {
                  handleStatusChange(value, 0);
                } else {
                  handleStatusChange(value, 1);
                }
              }}
              variant={"contained"}
              color={data.color}
              style={{ textTransform: "capitalize" }}
              sx={{ display: data.isCustomer ? "" : "none" }}
            >
              {data.isActive ? "Ẩn người dùng" : "Hiện người dùng"}
            </Button>
          );
        },
      },
    ];
  }, []);

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
        sx={{ width: "100%", marginBottom: "40px" }}
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
