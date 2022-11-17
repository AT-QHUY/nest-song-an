import React, { useCallback } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Chart, Pie } from "react-chartjs-2";

import {
    useGetCategories,
    useGetCountProductOnBill,
    useGetProducts,
} from "../../pages/Admin/product/api/hooks";
import {
    colorScheme,
    dynamicColors,
    getRandomColor,
} from "../../utils/randomColor";

ChartJS.register(...registerables);

export const ProductChart = () => {
    const { data: categories, loading: loadingCategories } = useGetCategories(
        {}
    );
    const { data: products, loading: loadingProduct } = useGetProducts({});

    const getData = ({ categories, products }) => {
        if (!categories && !products)
            return {
                labels: [],
                datasets: [
                    {
                        label: "Product Each Category",
                        data: [],
                    },
                ],
            };

        const categoriesWithCount = categories.map((category) => ({
            ...category,
            count: 0,
        }));

        products.forEach((product) => {
            const indexIncreaseCategory = categoriesWithCount.findIndex(
                (category) => category.id === product.cateId
            );
            categoriesWithCount[indexIncreaseCategory].count += 1;
        });

        const labels = categoriesWithCount.map((item) => {
            return item.name;
        });

        const data = categoriesWithCount.map((item) => {
            return item.count;
        });
        const backgroundColor = colorScheme.splice(8, data.length);

        return {
            labels: labels,
            datasets: [
                {
                    label: "Sản phẩm bán được theo loại",
                    data,
                    backgroundColor: backgroundColor,

                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                width: "100%",
                border: "1px solid gray",
                borderRadius: "8px",
                boxShadow: "5px 5px 5px grey",
            }}
        >
            <Bar
                style={{ width: "600px", maxHeight: "400px" }}
                type="line"
                data={getData({ categories, products })}
            />
        </div>
    );
};

export const CountOnBill = () => {
    const { data: products, loading: loadingProduct } =
        useGetCountProductOnBill({});

    const getData = ({ products }) => {
        if (!products)
            return {
                labels: [],
                datasets: [
                    {
                        label: "Product Each Category",
                        data: [],
                    },
                ],
            };

        const labels = products.map((item) => {
            return item.name.slice(0, 12) + "...";
        });

        const backgroundColor = colorScheme.splice(0, products.length);

        const data = products.map((item) => {
            return item.total;
        });

        return {
            labels: labels,
            datasets: [
                {
                    label: "Số sản phẩm bán được trên tổng đơn hàng",
                    data,
                    backgroundColor,
                    borderWidth: 1,
                },
            ],
        };
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "24px",
                width: "100%",
                border: "1px solid gray",
                borderRadius: "8px",
                boxShadow: "5px 5px 5px grey",
                marginTop: "50px",
            }}
        >
            <Bar
                style={{ maxWidth: "100%", maxHeight: "400px" }}
                type="line"
                data={getData({ products })}
            />
        </div>
    );
};
