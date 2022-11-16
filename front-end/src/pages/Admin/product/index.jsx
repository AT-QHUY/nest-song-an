import { Box, Grid, Paper, Button, Typography } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AppTable from "../../../components/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  useGetCategories,
  useGetProductsCount,
  useGetProductsPagination,
} from "./api/hooks";
import { Loading } from "../../../components/Loading/Loading";
import { AppButton } from "../../../components/Button";
import { productApi } from "../../../api/productApi";
import { DropDown } from "../../../components/Dropdown";

export function Products() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isRerender, setIsRerender] = useState(false);
  const [status, setStatus] = useState({
    id: 0,
    name: "Tất cả",
  });
  const { data, error, loading } = useGetProductsPagination({
    category: status.id,
    offset: page + 1,
    limit: pageSize,
    reRender: isRerender,
  });
  const { data: categories } = useGetCategories([]);
  const { data: count } = useGetProductsCount({});
  const navigate = useNavigate();
  const handleSwitchStatus = (id, status) => {
    productApi
      .updateProductStatus(id, status)
      .then(() => {
        setIsRerender((current) => !current);
      })
      .catch((err) => console.log(err));
  };

  const columns = useMemo(() => {
    return [
      { field: "name", headerName: "Name", width: 300 },
      {
        field: "listImages",
        headerName: "Image",
        width: 150,
        renderCell: (values) => {
          return (
            <img src={values?.value ? values.value[0]?.imgPath : ""}></img>
          );
        },
      },
      { field: "description", headerName: "Description", width: 350 },
      {
        field: "cateId",
        headerName: "Category",
        width: 200,
        renderCell: ({ value }) => {
          return (
            <span>
              {(categories || [])?.find((category) => category?.id === value)
                ?.name || ""}{" "}
            </span>
          );
        },
      },
      { field: "basePrice", headerName: "Price", width: 150 },
      {
        field: "deal",
        headerName: "Deal",
        width: 150,
        renderCell: ({ value }) => {
          return <span>{`${+value * 100} %`} </span>;
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 200,
        renderCell: ({ value, row }) => {
          const submitData = {
            status: value === 1 ? "Đang bán" : "Ngưng bán",
            action: value === 1 ? "Ẩn" : "Hiện",
            statusColor: value === 0 ? "red" : "green",
            actionColor: value === 1 ? "error" : "success",
            product_id: row.id,
            status_action: value === 1 ? 0 : 1,
          };

          return (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-around"}
              alignItems={"center"}
              width={"100%"}
            >
              <span style={{ color: submitData.statusColor }}>
                {submitData.status}
              </span>
              <Button
                sx={{ paddingX: "8px" }}
                color={submitData.actionColor}
                onClick={() =>
                  handleSwitchStatus(
                    submitData.product_id,
                    submitData.status_action
                  )
                }
                variant="contained"
              >
                {submitData.action}
              </Button>
            </Box>
          );
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
                navigate(`/dashboard/product/edit/${value}`);
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
  }, [categories]);

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
            <Typography variant="h5" marginRight={6}>
              Quản lí sản phẩm{" "}
            </Typography>
            <DropDown
              itemList={categories}
              setStatus={setStatus}
              status={status}
            />
          </Box>
          <Box>
            <AppButton
              variant="contained"
              startIcon={<AddOutlinedIcon />}
              onClick={() => {
                navigate("/dashboard/product/create");
              }}
              style={{ textTransform: "capitalize" }}
            >
              Tạo mới
            </AppButton>
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
