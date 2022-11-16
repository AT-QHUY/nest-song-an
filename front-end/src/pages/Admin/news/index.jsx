import { Box, Grid, Paper, Button, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Loading } from "../../../components/Loading/Loading";
import { AppButton } from "../../../components/Button";
import { useGetNews } from "./api/hook";

export function News() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, error, loading } = useGetNews();
  const navigate = useNavigate();
  const columns = useMemo(() => {
    return [
      { field: "title", headerName: "Tiêu đề", width: 300 },
      {
        field: "listImages",
        headerName: "Hình ảnh",
        width: 200,
        renderCell: (values) => {
          return (
            <img
              style={{ minWidth: 200 }}
              src={values?.value ? values?.value[0]?.imgPath : ""}
            ></img>
          );
        },
      },
      {
        field: "cate",
        headerName: "Loại",
        width: 150,
        renderCell: (values) => {
          return <span>{values?.value?.title}</span>;
        },
      },
      { field: "shortDescription", headerName: "Mô tả ngắn", width: 350 },
      { field: "description", headerName: "Thông tin", width: 550 },
      {
        field: "id",
        headerName: "Action",
        width: 100,
        renderCell: ({ value }) => {
          return (
            <AppButton
              onClick={(e) => {
                navigate(`/dashboard/news/edit/${value}`);
                e.stopPropagation();
              }}
              style={{ textTransform: "capitalize" }}
            >
              Edit
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
            <Typography variant="h5">Quản lí bài viết </Typography>
          </Box>
          <Box>
            <AppButton
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={() => {
                navigate("/dashboard/news/create");
              }}
              style={{ textTransform: "capitalize" }}
            >
              Create
            </AppButton>
          </Box>
        </Paper>
      </Grid>
      <Grid
        item
        sx={{ width: "100%" }}
        variant="outlined"
        style={{ display: "flex" }}
      >
        <Paper
          sx={{
            width: "100%",
            padding: "24px",
            height: "100%",
            marginBottom: "60px",
          }}
        >
          <AppTable
            data={data || []}
            columns={columns}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
            autoHeight
          />
        </Paper>
      </Grid>
    </>
  );
}
