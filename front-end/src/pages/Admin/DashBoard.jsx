import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ToastSuccess } from "../../components/Toast";
import { Bar } from "react-chartjs-2";

export const DashBoard = () => {
  const [isRerender, setIsRerender] = useState(false);
  const [successToastStatus, setSuccessToastStatus] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    // <AdminLayout setRerender={setIsRerender}>
    <Box>
      {/* <ToastSuccess
        successToastStatus={successToastStatus}
        setSuccessToastStatus={setSuccessToastStatus}
      ></ToastSuccess> */}
      <Bar
        data={{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </Box>
  );
};
