import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { Loading } from "../../../components/Loading/Loading";
import { AppButton } from "../../../components/Button";
import { useGetBillStatus, useGetOrderByStatusId } from "./api/hook";
import { convertMsToDate } from "../../../utils/serverUtils";
import { useGetUserById } from "../user/api/hooks";
import { DropDown } from "../../../components/Dropdown";

export function Orders() {
  const [page, setPage] = useState(0);
  const { data: statusList } = useGetBillStatus();
  const [status, setStatus] = useState({
    id: 2,
    name: "Đang xử lí",
  });
  const { data, error, loading } = useGetOrderByStatusId(status.id);
  const navigate = useNavigate();
  const GetUserName = (id) => {
    return useGetUserById(id).data.fullname;
  };
  useEffect(() => {}, [status]);
  const columns = useMemo(() => {
    return [
      {
        field: "customerId",
        headerName: "Tên khách hàng",
        width: 300,
        renderCell: ({ value }) => {
          return <span>{GetUserName(value)} </span>;
        },
      },
      {
        field: "date",
        headerName: "Ngày mua hàng",
        width: 350,
        renderCell: ({ value }) => {
          return <span>{convertMsToDate(value)} </span>;
        },
      },
      {
        field: "address",
        headerName: "Địa chỉ giao hàng",
        width: 300,
        renderCell: ({ value }) => {
          return <span>{value ? value : "Trống"} </span>;
        },
      },
      {
        field: "phoneNumber",
        headerName: "Số điện thoại",
        width: 300,
        renderCell: ({ value }) => {
          return <span>{value ? value : "Trống"} </span>;
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
                navigate(`/dashboard/order/detail/${value}`);
                e.stopPropagation();
              }}
              style={{ textTransform: "capitalize" }}
            >
              Chi tiết
            </AppButton>
          );
        },
      },
    ];
  }, []);

  if (loading) return <Loading />;

  if (error) return <Navigate to="404" />;

  return (
    <Box marginBottom={8}>
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
          <Box display={"flex"} flexDirection={"rows"} alignItems={"center"}>
            <Typography marginRight={8} variant="h5">
              Quản lí đơn hàng{" "}
            </Typography>
            <DropDown
              itemList={statusList}
              setStatus={setStatus}
              status={status}
            />
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
            setPage={setPage}
            autoHeight
          />
        </Paper>
      </Grid>
    </Box>
  );
}
