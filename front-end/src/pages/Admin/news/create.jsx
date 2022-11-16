import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../../utils/firebase";
import { async } from "@firebase/util";
import { newApi } from "../../../api/newApi";
import { useNavigate } from "react-router-dom";

export const uploadFiles = (
  value,
  setProgress,
  setValue,
  name,
  setListImages
) => {
  if (!value) return;
  const storageRef = ref(storage, `file/${value.name}`);
  const uploadTask = uploadBytesResumable(storageRef, value);

  uploadTask.on(
    "stage_changed",
    (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setProgress(prog);
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          setValue(name, url);
          setListImages((prevValue) => {
            // console.log(prevValue);
            prevValue.push({ imgPath: url });
            // console.log(newListImg);
            return prevValue;
          });
        })
        .catch((err) => console.log(err));
    }
  );
};

export function CreateNews() {
  const [progress, setProgress] = useState(0);
  const [listImages, setListImages] = useState([]);
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {},
  });

  const { handleSubmit, setValue } = methods;

  const setUrl = (name, file) => {
    uploadFiles(file, setProgress, setValue, name);
  };

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
          label: "Mô tả ",
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

  const onSubmit = (values) => {
    const data = { ...values, listImages };
    delete data.image;
    newApi
      .addNews(data)
      .then((res) => navigate("/dashboard/news"))
      .catch((err) => console.log(err));
  };
  return (
    <Paper sx={{ padding: "24px", marginBottom: "50px" }}>
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
                  Create News
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
