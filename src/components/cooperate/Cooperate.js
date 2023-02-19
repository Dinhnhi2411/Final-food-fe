import { CardMedia, Container, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { coop } from "../../data/Data";

function Cooperate() {
  return (
    <Container>
      <Divider />
      <Grid container id="coop">
        {coop.map((item, index) => (
          <Grid  key={item.id} item xs={6} sm={3} md={3} lg={3}>

          <CardMedia
              sx={{
                height: {
                  xs: 150,
                  sm:180,
                  md: 200,
                  lg: 250 
                },
                width: {
                  xs: 150,
                  sm:180,
                  md: 200,
                  lg: 250,
                },
                borderRadius: 10,
                mb:1,
                m:1

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
