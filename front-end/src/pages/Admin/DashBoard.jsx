import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ToastSuccess } from "../../components/Toast";
import { Bar } from "react-chartjs-2";
import { CountOnBill, ProductChart } from "../../components/Chart/ProductChart";
import { UserChart } from "../../components/Chart/UserChart";
import { BillChart } from "../../components/Chart/BillChart";

export const DashBoard = () => {
  const [isRerender, setIsRerender] = useState(false);
  const [successToastStatus, setSuccessToastStatus] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  return (
    // <AdminLayout setRerender={setIsRerender}>
    <Box sx={{ marginBottom: "100px" }}>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        {/* <ToastSuccess
        successToastStatus={successToastStatus}
        setSuccessToastStatus={setSuccessToastStatus}
      ></ToastSuccess> */}
        <ProductChart />
        <BillChart />
        {/* <UserChart /> */}
      </Box>
      <CountOnBill />
    </Box>
  );
};
