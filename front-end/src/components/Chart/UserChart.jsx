import React, { useCallback } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Chart, Pie } from "react-chartjs-2";
import { useGetRoles, useGetUsers } from "../../pages/Admin/user/api/hooks";

ChartJS.register(...registerables);

export const UserChart = () => {
  const { data: users, loading: loadingUsers } = useGetUsers({});
  const { data: roles, loading: loadingRoles } = useGetRoles({});

  const getData = ({ roles, users }) => {
    if (!roles && !users)
      return {
        labels: [],
        datasets: [
          {
            label: "User Chart",
            data: [],
          },
        ],
      };

    const rolesWithCount = roles.map((roles) => ({
      ...roles,
      count: 0,
    }));

    users.forEach((user) => {
      const indexIncreaseRole = rolesWithCount.findIndex(
        (role) => role.id === user.role.id
      );
      rolesWithCount[indexIncreaseRole].count += 1;
    });

    const labels = rolesWithCount.map((item) => {
      return item.name;
    });

    const data = rolesWithCount.map((item) => {
      return item.count;
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "User Chart",
          data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
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
      <Pie
        style={{ maxWidth: "400px", maxHeight: "400px" }}
        type="pie"
        data={getData({ roles, users })}
      />
    </div>
  );
};
