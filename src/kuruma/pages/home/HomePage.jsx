import { Card, CardMedia } from "@mui/material";
import ContainerComponents from "../../components/ContainerComponents";

const HomePage = () => {
  return (
    <ContainerComponents
      color="#636466"
      width={500}
      title="INICIO"
      subTitle="Bienvenidos a KURUMA"
    >
      <Card>
        <CardMedia
          component="img"
          image="src/assets/logos-pcr-all.png"
          alt="Logo"
        />
      </Card>
    </ContainerComponents>
  );
};

export default HomePage;
