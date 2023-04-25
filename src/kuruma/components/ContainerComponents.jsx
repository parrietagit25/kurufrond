import React from "react";
import { Grid } from "@mui/material";
import KurumaLayout from "../layout/KurumaLayout";

const Container = ({ children, color = "", width, title, subTitle }) => {
  return (
    <KurumaLayout title={title} subTitle={subTitle}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 5 }}
      >
        <Grid
          item
          className="box-shadow"
          xs={12}
          sx={{
            width: { md: width },
            backgroundColor: `${color}`,
            padding: 1,
            borderRadius: 2,
          }}
        >
          {children}
        </Grid>
      </Grid>
    </KurumaLayout>
  );
};

export default Container;
