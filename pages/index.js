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
  Paper,
  Snackbar,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "addressOption") {
      if (value === "without") {
        setForm((prev) => ({ ...prev, addressOption: value, hotel: "" }));
      } else if (value === "sendLater") {
        setForm((prev) => ({ ...prev, addressOption: value, hotel: "Send Later" }));
      } else {
        setForm((prev) => ({ ...prev, addressOption: value }));
      }
    } else if (name === "hotel") {
      setForm((prev) => ({ ...prev, hotel: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, tourDate: date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true);
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
    setShowConfirm(false);
  };

  const confirmationText = `Please confirm  for this booking:\n\nBooking no : ${form.bookingNumber}\nTour date : ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY") : ""}\nProgram : ${form.program}\nName : ${form.name}\nPax : ${form.adult} adult\nPhone Number : ${form.phoneNumber}\nCash on tour : ${form.cashTours || "None"}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(confirmationText);
    setSnackbar({ open: true, message: "Copied to clipboard!" });
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
              {form.addressOption !== "without" && (
                <TextField
                  fullWidth
                  label="Hotel :"
                  name="hotel"
                  value={form.hotel}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#fff" } }}
                  sx={{ bgcolor: "#322b4d" }}
                />
              )}
              <FormControl component="fieldset" sx={{ mt: 2 }}>
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
              <PhoneInput
                country={"th"}
                value={form.phoneNumber}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  background: "#322b4d",
                  color: "#fff",
                  border: "1px solid #6c63a7",
                  borderRadius: 4,
                  height: 56,
                  fontSize: 16,
                }}
                buttonStyle={{
                  background: "#322b4d",
                  border: "none",
                }}
                dropdownStyle={{
                  background: "#322b4d",
                  color: "#000",
                }}
                specialLabel="phoneNumber :"
                inputProps={{
                  name: "phoneNumber",
                  required: false,
                  autoFocus: false,
                }}
              />
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

        {showConfirm && (
          <Paper
            elevation={3}
            sx={{
              mt: 6,
              p: 3,
              bgcolor: "#262344",
              color: "#fff",
              borderRadius: 2,
              border: "1px solid #888",
            }}
          >
            <Typography sx={{ mb: 2, fontWeight: 500 }}>
              Please confirm  for this booking:
            </Typography>
            <pre style={{ color: "#fff", fontFamily: "inherit", fontSize: 16 }}>
              {confirmationText}
            </pre>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button variant="contained" color="secondary" onClick={handleCopy}>
                Copy
              </Button>
            </Box>
          </Paper>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ open: false, message: "" })}
          message={snackbar.message}
        />
      </Container>
    </Box>
  );
} 