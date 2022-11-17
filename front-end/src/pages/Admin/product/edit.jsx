import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useMemo, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../../../api/productApi";
import { AppButton } from "../../../components/Button";
import { AppForm, FIELD_TYPES } from "../../../components/Form";
import { getOptions } from "../../../utils/getOptions";
import { setInitForm } from "../../../utils/setInitForm";
import { useGetCategories, useGetProduct } from "./api/hooks";

export function EditProduct() {
    const methods = useForm({
        defaultValues: {
            name: "",
            listImages: "",
            description: "",
            basePrice: 0,
            quantity: 0,
            cateId: 0,
            deal: 0,
        },
    });

    const { id } = useParams();
    const { data: categories, loading: loadingCategories } = useGetCategories(
        {}
    );
    //TODO getDetailProduct (1)
    const { data: detailProduct, loading: loadingProducts } = useGetProduct(id);
    const [listImages, setListImages] = useState([]);

    const { handleSubmit, setValue } = methods;
    const navigate = useNavigate();
    //
    const fields = useMemo(() => {
        return [
            {
                type: "text",
                fieldProps: {
                    label: "Name",
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
                },
                cols: {
                    xs: 12,
                },
            },
            {
                type: "multiline",
                fieldProps: {
                    label: "Description",
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
                            const basePriceRule = +value <= 0;
                            if (basePriceRule) {
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
                    label: "Quantity",
                },
                formProps: {
                    name: "quantity",
                    rules: {
                        required: "Trường này là bắt buộc",
                        validate: (value) => {
                            const basePriceRule = +value <= 0;
                            if (basePriceRule) {
                                return "Số lượng phải > 0!";
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
                    label: "Category",
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
                    label: "Deal",
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

    // handleSubmit update it
    const onSubmit = (values) => {
        const data = {
            ...values,
            listImages: listImages,
        };
        productApi
            .updateProductById(id, data)
            .then(() => navigate("/dashboard/product"))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        if (detailProduct) {
            setListImages(detailProduct.listImages);
            setInitForm(
                detailProduct,
                [
                    "name",
                    "description",
                    "basePrice",
                    "quantity",
                    "cateId",
                    "deal",
                ],
                setValue
            );
        }
    }, [detailProduct]);

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
                                        fontSize: "36px",
                                        paddingBottom: "24px",
                                        color: "var(--bs-secondary)",
                                    }}
                                >
                                    Chỉnh sửa sản phẩm
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
