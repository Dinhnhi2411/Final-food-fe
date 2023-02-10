import { CardMedia, Container, Divider, Grid } from "@mui/material";
import React from "react";
import { coop } from "../../data/Data";

function Cooperate() {

  return (
    <Container sx={{ backgroundColor:"primary.lighter"}}>
      <Divider />
      <Grid container spacing={1} mt={0}>
        {coop.map((item, index) => (
          <Grid key={item.id} item xs={6} md={4} lg={3}>
            <CardMedia
              sx={{
                height: {
                  xs: 180,
                  md: 200,
                  lg: 250,
                },
                borderRadius: 10,
                p: 2,
              }}
              component="img"
              image={item.cover}
              alt={item.title}
              key={item.id}
            />
          </Grid>
        ))}
      </Grid>
      <Divider />
    </Container>
  );
}

export default Cooperate;
