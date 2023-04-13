import { Grid, Typography } from "@mui/material";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      className="animate__animated animate__gadeIn animate__fadeInLeft"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", p: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { md: 450 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
