import { Box, Grid, Paper, Typography, Card, CardMedia } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AppTable from "../../../components/Table";
import { Loading } from "../../../components/Loading/Loading";
import { useGetOrderByOrderId, useGetUserData } from "./api/hook";
import { convertMsToDate } from "../../../utils/serverUtils";

export function Detail() {
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const { data, error, loading } = useGetOrderByOrderId(id);
  const [detail, setDetail] = useState([]);
  const { data: userData } = useGetUserData(data.customerId);
  const navigate = useNavigate();
  console.log(userData);

  useEffect(() => {
    setDetail(data.listBillDetails);
  }, [data, data.customerId]);

  const columns = useMemo(() => {
    return [
      {
        field: "product",
        headerName: "Sản phẩm",
        width: 800,
        renderCell: ({ value }) => {
          return (
            <Card display={"flex"} sx={{ width: "100%", boxShadow: "none" }}>
              <Box
                display={"flex"}
                flexDirection={"rows"}
                alignItems="center"
                justifyContent="space-between"
              >
                <span>{value.name}</span>
                <CardMedia
                  component="img"
                  sx={{ width: 220, height: 120 }}
                  image={`${
                    value?.listImages[0] ? value.listImages[0].imgPath : ""
                  }?w=200&h=50`}
                />
              </Box>
            </Card>
          );
        },
      },
      {
        field: "quantity",
        headerName: "Số lượng",
        width: 300,
      },
      { field: "price", headerName: "Giá tiền", width: 300 },
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
            <Typography variant="h5" marginBottom={2}>
              {`Đơn hàng ngày:`}&emsp;&nbsp;{`${convertMsToDate(data.date)} `}{" "}
            </Typography>
            <Typography variant="h5">
              {`Khách hàng:`}&emsp;&emsp;&emsp;{`${userData.fullname} `}{" "}
            </Typography>
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
            data={detail || []}
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
