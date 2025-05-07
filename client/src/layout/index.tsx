import {Container, Grid, Theme, useMediaQuery} from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

export default function Layout() {
  const isLargeScreen: boolean = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("md")
  );

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {isLargeScreen ? (
          <Grid container spacing={2} py={3}>
            <Grid item lg={2} md={3}>
              <Sidebar />
            </Grid>
            <Grid item lg={10} md={9}>
              <Main />
            </Grid>
          </Grid>
        ) : (
          <Main />
        )}
      </Container>
      <Footer />
    </>
  );
}
