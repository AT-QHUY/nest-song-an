import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { AppButton } from "../../../components/Button";
import { AppForm } from "../../../components/Form";
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
  const { id } = useParams();
  //TODO getDetailProduct (1)
  const { data: detailNews, loading: loadingNews } = useGetNewById(id);

  const { handleSubmit, setValue } = methods;

  //
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
        type: "upload",
        fieldProps: {
          setValue: setValue,
        },
        formProps: {
          name: "image",
          rules: {
            required: "Trường này là bắt buộc",
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
  }, []);

  // handleSubmit update it
  const onSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (detailNews) {
      setInitForm(
        detailNews,
        ["title", "image", "shortDescription", "description"],
        setValue
      );
    }
  }, [detailNews]);

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
                  Edit News
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
