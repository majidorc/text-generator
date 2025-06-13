import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

export default function Home() {
  const [form, setForm] = useState({
    bookingNumber: "",
    program: "",
    name: "",
    tourDate: dayjs(),
    hotel: "",
    phoneNumber: "",
    addressOption: "",
    cashTours: "",
    adult: 1,
    parkFee: "none",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, tourDate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!\n" + JSON.stringify(form, null, 2));
  };

  const handleClear = () => {
    setForm({
      bookingNumber: "",
      program: "",
      name: "",
      tourDate: dayjs(),
      hotel: "",
      phoneNumber: "",
      addressOption: "",
      cashTours: "",
      adult: 1,
      parkFee: "none",
    });
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#2d2746", color: "#fff", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Operator Form
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 2,
            bgcolor: "#2d2746",
            boxShadow: 3,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Booking Number :*"
                name="bookingNumber"
                value={form.bookingNumber}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Program :*"
                name="program"
                value={form.program}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Name :*"
                name="name"
                value={form.name}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tour Date :*"
                  value={form.tourDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      variant="outlined"
                      InputProps={{ style: { color: "#fff" } }}
                      InputLabelProps={{ style: { color: "#fff" } }}
                      sx={{ bgcolor: "#322b4d" }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Hotel :*"
                name="hotel"
                value={form.hotel}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="phoneNumber :"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "#fff" }}>
                  Address Option
                </FormLabel>
                <RadioGroup
                  row
                  name="addressOption"
                  value={form.addressOption}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="without"
                    control={<Radio sx={{ color: "#fff" }} />}
                    label="Without Address"
                  />
                  <FormControlLabel
                    value="sendLater"
                    control={<Radio sx={{ color: "#fff" }} />}
                    label="Send Later"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Cash Tours :*"
                name="cashTours"
                value={form.cashTours}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label="Adult :*"
                name="adult"
                type="number"
                value={form.adult}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
                sx={{ bgcolor: "#322b4d" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: "#fff" }}>
                  National Park Fee
                </FormLabel>
                <RadioGroup
                  row
                  name="parkFee"
                  value={form.parkFee}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="none"
                    control={<Radio sx={{ color: "#fff" }} />}
                    label="None"
                  />
                  <FormControlLabel
                    value="fee"
                    control={<Radio sx={{ color: "#fff" }} />}
                    label="National Park Fee"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ color: "#a084e8", borderColor: "#a084e8", ml: 2 }}
              >
                Add Pax +
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 