import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { productApi } from "../../../api/productApi";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
import { getOptions } from "../../../utils/getOptions";
import { useGetCategories } from "./api/hooks";

export function CreateProduct() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      cateId: "1",
    },
  });
  const { data: categories, loading: loadingCategories } = useGetCategories({});

  const { handleSubmit, setValue } = methods;

  const fields = useMemo(() => {
    return [
      {
        type: "text",
        fieldProps: {
          label: "Tên sản phẩm",
        },
        formProps: {
          name: "name",
          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "text",
        fieldProps: {
          label: "Hình ảnh-1",
        },
        formProps: {
          name: "image1",
          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "text",
        fieldProps: {
          label: "Hình ảnh-2",
        },
        formProps: {
          name: "image2",
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "text",
        fieldProps: {
          label: "Hình ảnh-3",
        },
        formProps: {
          name: "image3",
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "multiline",
        fieldProps: {
          label: "Mô tả",
        },
        formProps: {
          name: "description",

          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "number",
        fieldProps: {
          label: "Giá",
        },
        formProps: {
          name: "basePrice",
          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "number",
        fieldProps: {
          label: "Số lượng",
        },
        formProps: {
          name: "quantity",
          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "select",
        fieldProps: {
          options: getOptions(categories || []),
          label: "Loại",
          loading: loadingCategories,
        },
        formProps: {
          name: "cateId",
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "number",
        fieldProps: {
          label: "Khuyến mãi",
        },
        formProps: {
          name: "deal",
          rules: {
            required: "Trường này là bắt buộc",
            validate: (value) => {
              const dealRule = +value >= 1 || +value < 0;
              if (dealRule) {
                return "Khuyến mãi phải < 1 và >= 0!";
              }
            },
          },
        },
        cols: {
          xs: 12,
        },
      },
    ];
  }, [categories]);

  const onSubmit = (values) => {
    const data = {
      name: values.name,
      quantity: values.quantity,
      deal: values.deal,
      description: values.description,
      basePrice: values.basePrice,
      cateId: values.cateId,
      status: 1,
      listStringImages: [values.image1],
    };
    if (values.image2 != undefined) data.listStringImages.push(values.image2);
    if (values.image3 != undefined) data.listStringImages.push(values.image3);
    productApi
      .addProductAPI(data)
      .then(() => navigate("/dashboard/product"))
      .catch((err) => console.log(err));
  };
  return (
    <Paper sx={{ padding: "24px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box container display={"flex"} justifyContent={"center"}>
            <Box width="100%" paddingLeft="24px" marginTop={"24px"}>
              <Box display={"flex"} justifyContent="flex-start">
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: "32px",
                    paddingBottom: "24px",
                    color: "var(--bs-secondary)",
                  }}
                >
                  Create Product
                </Typography>
              </Box>
              <AppForm fields={fields} />
              <Box display={"flex"} justifyContent="flex-end">
                <AppButton
                  type="submit"
                  variant="outlined"
                  style={{ marginBlock: "24px" }}
                >
                  Create
                </AppButton>
              </Box>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  );
}
