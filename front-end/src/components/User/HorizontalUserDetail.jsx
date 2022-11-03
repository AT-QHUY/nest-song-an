import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, Grid } from "@mui/material";
import { accountApi } from "../../api/accountApi";

export const HorizontalUserDetail = ({
    user,
    rerender,
    setRerender,
    successToastStatus,
    setSuccessToastStatus,
}) => {
    const theme = useTheme();

    const handleRerender = () => {
        setSuccessToastStatus(true);
        setRerender(true);
    };

    // Handle block/unblock
    const handleChangeStatus = () => {
        if (user.status === 1)
            accountApi
                .blockUser(user.id)
                .then(() => {
                    handleRerender();
                })
                .catch((err) => {
                    console.log(err);
                });
        else
            accountApi
                .unblockUser(user.id)
                .then(() => {
                    handleRerender();
                })
                .catch((err) => {
                    console.log(err);
                });
    };

    var d = new Date(user.dateOfBirth);

    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    display: "flex",
                    paddingRight: "20px",
                    boxShadow: 3,
                    // paddingY: "20px",
                    backgroundColor: user.status == 1 ? "#43A047" : "#DC3545",
                    color: "white",
                    fontSize: "18px",
                }}
            >
                <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {user.fullname}
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {user.dateOfBirth ? d.toLocaleDateString() : `N/A`}
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {user.phoneNumber}
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {user.address}
                    </CardContent>
                </Grid>
                <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {user.role.name}
                    </CardContent>
                </Grid>

                <Grid
                    item
                    xs={3}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                        {user.status === 1 ? "Active" : "Blocked"}
                    </CardContent>
                </Grid>

                <Grid
                    item
                    xs={2}
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    paddingX={"16px"}
                >
                    {user.role.id !== 1 &&
                        (user.status === 1 ? (
                            <Button
                                variant="contained"
                                sx={{ width: "100px" }}
                                onClick={handleChangeStatus}
                            >
                                Block
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="warning"
                                sx={{ width: "100px" }}
                                onClick={handleChangeStatus}
                            >
                                Unblock
                            </Button>
                        ))}
                </Grid>
            </Card>
        </Grid>
    );
};
