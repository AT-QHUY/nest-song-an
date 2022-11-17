import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { productApi } from "../../../api/productApi";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { getOptions } from "../../../utils/getOptions";
import { useGetCategories } from "./api/hooks";
import { useState } from "react";

export function CreateProduct() {
    const navigate = useNavigate();

    const methods = useForm({
        defaultValues: {
            cateId: "1",
        },
    });
    const { data: categories, loading: loadingCategories } = useGetCategories(
        {}
    );
    const [listImages, setListImages] = useState([]);
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
                        validate: (value) => {
                            const dealRule = +value <= 0;
                            if (dealRule) {
                                return "Giá phải > 0!";
                            }
                        },
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
                        validate: (value) => {
                            const dealRule = +value <= 0;
                            if (dealRule) {
                                return "So luong phải  > 0!";
                            }
                        },
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
    }, [categories, listImages]);

    const onSubmit = (values) => {
        const data = { ...values, listImages: listImages };
        productApi
            .addProductAPI(data)
            .then(() => navigate("/dashboard/product"))
            .catch((err) => console.log(err));
    };
    return (
        <Paper sx={{ padding: "24px", marginBottom: "60px" }}>
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
                                    Thêm mới Sản Phẩm
                                </Typography>
                            </Box>
                            <AppForm fields={fields} />
                            <Box display={"flex"} justifyContent="flex-end">
                                <AppButton
                                    type="submit"
                                    variant="outlined"
                                    style={{ marginBlock: "24px" }}
                                >
                                    Tạo mới
                                </AppButton>
                            </Box>
                        </Box>
                    </Box>
                </form>
            </FormProvider>
        </Paper>
    );
}
