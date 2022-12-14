import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { InputImageList } from "../ImageList";

const renderTextField = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return <TextField fullWidth {...field} {...fieldProps} />;
      }}
    />
  );
};

const renderNumber = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <TextField type={"number"} fullWidth {...field} {...fieldProps} />
        );
      }}
    />
  );
};

const renderMultiline = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <TextField multiline rows={6} fullWidth {...field} {...fieldProps} />
        );
      }}
    />
  );
};

const renderLargeMultiline = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <TextField multiline rows={20} fullWidth {...field} {...fieldProps} />
        );
      }}
    />
  );
};

const renderSelect = ({ fieldProps, controllerProps }) => {
  const { options, ...restFieldProps } = fieldProps;

  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return (
          <FormControl fullWidth label={restFieldProps.label}>
            <InputLabel
              style={{
                color: restFieldProps?.error
                  ? "var(--bs-danger)"
                  : "var(--bs-gray)",
              }}
            >
              {restFieldProps.label}
            </InputLabel>
            <Select {...field} {...restFieldProps}>
              {Boolean(options) && options.length !== 0 ? (
                options.map((option, index) => {
                  return (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No Items Found</MenuItem>
              )}
            </Select>
            {restFieldProps?.helperText && (
              <FormHelperText
                style={{ color: "var(--bs-danger)" }}
                id="my-helper-text"
              >
                {restFieldProps?.helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

const renderAutoComplete = ({ fieldProps, controllerProps }) => {
  return (
    <Controller
      {...controllerProps}
      render={({ field }) => {
        return <Autocomplete fullWidth {...field} {...fieldProps} />;
      }}
    />
  );
};

const renderUpload = ({ fieldProps, controllerProps }) => {
  const { setValue, ...restFieldProps } = fieldProps;
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value, ...rest } }) => {
        const handleChange = ({ target }) => {
          //Maybe call process upload or set directory files
          setValue(controllerProps.name, target.files[0]);
        };
        return (
          <FormControl fullWidth label={restFieldProps.label}>
            <InputLabel
              style={{
                color: restFieldProps?.error
                  ? "var(--bs-danger)"
                  : "var(--bs-gray)",
              }}
            >
              {restFieldProps.label}
            </InputLabel>
            <TextField
              type="file"
              onChange={handleChange}
              {...rest}
              {...fieldProps}
            />
          </FormControl>
        );
      }}
    />
  );
};

const renderMultipleUpload = ({ fieldProps, controllerProps }) => {
  const { setValue, images, setListImages, title, max, ...restFieldProps } =
    fieldProps;
  return (
    <Controller
      {...controllerProps}
      render={({ field: { onChange, value, ...rest } }) => {
        return (
          <FormControl fullWidth label={restFieldProps.label}>
            <InputImageList
              images={images}
              title={title}
              max={max}
              setValue={setValue}
              setListImages={setListImages}
            />
            {restFieldProps?.helperText && (
              <FormHelperText
                style={{ color: "var(--bs-danger)" }}
                id="my-helper-text"
              >
                {restFieldProps?.helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export const FIELD_TYPES = {
  TEXT: "text",
  SELECT: "select",
  AUTOCOMPLETE: "autocomplete",
  UPLOAD: "upload",
  MULTILINE: "multiline",
  LARGE_MULTILINE: "large_multiline",
  NUMBER: "number",
  IMAGE_UPLOAD: "image_upload",
};

const FORM_MAPPING = {
  [FIELD_TYPES.TEXT]: renderTextField,
  [FIELD_TYPES.MULTILINE]: renderMultiline,
  [FIELD_TYPES.SELECT]: renderSelect,
  [FIELD_TYPES.AUTOCOMPLETE]: renderAutoComplete,
  [FIELD_TYPES.UPLOAD]: renderUpload,
  [FIELD_TYPES.LARGE_MULTILINE]: renderLargeMultiline,
  [FIELD_TYPES.NUMBER]: renderNumber,
  [FIELD_TYPES.IMAGE_UPLOAD]: renderMultipleUpload,
};

export const AppForm = ({ fields }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={"24px"}>
      {fields.map(({ type, cols, fieldProps, formProps }, index) => {
        const controllerProps = { control, ...formProps };
        const isError = formProps.name in errors;
        const helperText = isError ? errors[formProps.name]?.message : "";

        return (
          <Grid item {...cols} key={index}>
            {FORM_MAPPING[type]({
              fieldProps: { ...fieldProps, helperText, error: isError },
              controllerProps,
              errors,
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};
