import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Backdrop,
  CircularProgress,
//   Select,
} from "@mui/material";
import styled from "styled-components";

const ChooseFile = styled.input`
  margin-bottom: 10px;
`;

const Form = () => {
    const [loading, setLoading] = useState(false);
  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var formdata = new FormData();

    formdata.append("name", e.target.name.value);
    formdata.append("image", e.target.pic.files[0]);
    formdata.append("regNo", e.target.regno.value);
    formdata.append("group", e.target.group.value);
    formdata.append("position", e.target.position.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    setLoading(true)
    fetch( "https:/sonabyss.herokuapp.com/orgnisers", requestOptions)
    .then((response) => {
        setLoading(false);
        console.log(response);
      })
      .then((result) => {
        setLoading(false);
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div>
      <Typography
        gutterBottom
        variant="h1"
        align="center"
        sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
      >
        About
      </Typography>

      <Card sx={{ maxWidth: "450px", margin: "0 auto", padding: "20px 5px" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}></Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ margin: "10px auto" }}
                name="name"
                label="Name"
                placeholder="Enter Name"
                variant="outlined"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <ChooseFile name="pic" type="file" accept="image/*" />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ margin: "10px auto" }}
                name="regno"
                label="Reg No"
                // type={"number"}
                placeholder="Enter Registration Number"
                variant="outlined"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ margin: "10px auto" }}
                name="group"
                label="Group"
                placeholder="Enter Your Group"
                variant="outlined"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                sx={{ margin: "10px auto" }}
                name="position"
                label="Position"
                placeholder="Enter Your Position"
                variant="outlined"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
    </div>
  );
};

export default Form;
