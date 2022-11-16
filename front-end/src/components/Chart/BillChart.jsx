import React, { useCallback } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Chart, Line, Pie } from "react-chartjs-2";
import { useGetTotalPriceByMonth } from "../../pages/Admin/order/api/hook";
import { colorScheme } from "../../utils/randomColor";

ChartJS.register(...registerables);

export const BillChart = () => {
  const { data: bills, loading: loadingBills } = useGetTotalPriceByMonth();

  const getData = ({ bills }) => {
    if (!bills)
      return {
        labels: [],
        datasets: [
          {
            label: "Bill Chart",
            data: [],
          },
        ],
      };

    const labels = bills.map((item) => {
      return item.monthYear;
    });

    const data = bills.map((item) => {
      return item.totalByMonth;
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Tổng thu nhập theo tháng",
          data,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
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
        marginLeft: "100px",
      }}
    >
      <Line
        style={{ maxWidth: "800px", maxHeight: "400px" }}
        type="Line"
        data={getData({ bills })}
      />
    </div>
  );
};
