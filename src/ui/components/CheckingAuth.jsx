import { CircularProgress, Grid } from '@mui/material'

const CheckingAuth = () => {
  return (
    <Grid
      container
      className="animate__animated animate__gadeIn animate__fadeInLeft"
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", p: 4 }}
    >
      <Grid 
        container
        className="animate__animated animate__gadeIn animate__fadeInLeft"
        direction='row'
        justifyContent='center'>
            <CircularProgress color='warning' />
      </Grid>
    </Grid>
  )
}

export default CheckingAuth
