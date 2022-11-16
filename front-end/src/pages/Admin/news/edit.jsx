import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { newApi } from "../../../api/newApi";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { setInitForm } from "../../../utils/setInitForm";
import { useGetNewById } from "./api/hook";

export function EditNews() {
  const methods = useForm({
    defaultValues: {
      title: "",
      image: "",
      shortDescription: "",
      description: "",
    },
  });
  const navigate = useNavigate();
  const { id } = useParams();
  //TODO getDetailProduct (1)
  const { data: detailNews, loading: loadingNews } = useGetNewById(id);
  const [listImages, setListImages] = useState([]);
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const fields = useMemo(() => {
    return [
      {
        type: "text",
        fieldProps: {
          label: "Tiêu đề",
        },
        formProps: {
          name: "title",
          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },

      {
        type: FIELD_TYPES.IMAGE_UPLOAD,
        fieldProps: {
          images: listImages,
          title: "Danh sách hình ảnh",
          max: 5,
          setListImages: setListImages,
          setValue: setValue,
        },
        formProps: {
          name: "image",
          rules: {
            validate: () => {
              const isEmpty = listImages.length === 0;
              if (isEmpty) {
                return "Trường này là bắt buộc";
              }
            },
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "multiline",
        fieldProps: {
          label: "Mô tả ngắn",
        },
        formProps: {
          name: "shortDescription",
          rules: {
            required: "Trường này là bắt buộc",
          },
        },
        cols: {
          xs: 12,
        },
      },
      {
        type: "large_multiline",
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
    ];
  }, [listImages]);

  // handleSubmit update it
  const onSubmit = (values) => {
    const data = { ...values, listImages };
    delete data.image;
    console.log(data);
    newApi
      .updateNews(id, data)
      .then(() => navigate("/dashboard/news"))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (detailNews) {
      setListImages(detailNews?.listImages);
      setInitForm(
        detailNews,
        ["title", "shortDescription", "description"],
        setValue
      );
    }
  }, [detailNews]);

  return (
    <Paper sx={{ padding: "24px", marginBottom: "60px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display={"flex"} justifyContent={"center"}>
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
                  Chỉnh sửa bài viết
                </Typography>
              </Box>
              <AppForm fields={fields} />

              <Box display={"flex"} justifyContent="flex-end">
                <AppButton
                  type="submit"
                  variant="outlined"
                  style={{ marginBlock: "24px" }}
                >
                  Edit
                </AppButton>
              </Box>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Paper>
  );
}
