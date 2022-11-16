import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import { Loading } from "../../../components/Loading/Loading";
import { AppButton } from "../../../components/Button";
import { useGetBillStatus, useGetOrderByStatusId } from "./api/hook";
import { convertMsToDate } from "../../../utils/serverUtils";
import { useGetUserById } from "../user/api/hooks";
import { DropDown } from "../../../components/Dropdown";
import { billApi } from "../../../api/billApi";

export function Orders() {
  const [page, setPage] = useState(0);
  const { data: statusList } = useGetBillStatus();
  const [status, setStatus] = useState({
    id: 2,
    name: "Đang xử lí",
  });
  const [isRerender, setIsRerender] = useState(false);
  const { data, error, loading } = useGetOrderByStatusId({
    status: status.id,
    isRerender: isRerender,
  });
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
        renderCell: ({ value, row }) => {
          return <span>{GetUserName(value)} </span>;
        },
      },
      {
        field: "date",
        headerName: "Ngày mua hàng",
        width: 150,
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
        field: "status",
        headerName: "Trạng thái",
        width: 200,
        renderCell: ({ value, row }) => {
          return (
            <span>
              {row.status ? statusList[row.status - 1].name : "Undefined"}
            </span>
          );
        },
      },
      {
        field: "id",
        headerName: "Action",
        width: 200,
        renderCell: ({ value, row }) => {
          return (
            <Box
              display={"flex"}
              flexDirection={"rows"}
              alignItems={"center"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <AppButton
                onClick={(e) => {
                  navigate(`/dashboard/order/detail/${value}`);
                  e.stopPropagation();
                }}
                style={{ textTransform: "capitalize" }}
              >
                Chi tiết
              </AppButton>
              <Button
                onClick={(e) => {
                  billApi
                    .updateBillById(value, 3)
                    .then(() => setIsRerender(!isRerender))
                    .catch((err) => console.log(err));
                }}
                sx={{ display: row.status === 2 ? "" : "none" }}
                variant={"contained"}
                style={{ textTransform: "capitalize" }}
              >
                Đã giao
              </Button>
            </Box>
          );
        },
      },
    ];
  }, [status, statusList]);

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
        marginBottom={"52px"}
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
    </>
  );
}
