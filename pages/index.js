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
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";

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
  const [paxRows, setPaxRows] = useState([]);

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

  // Compose Pax line for confirmation text
  let paxLine = `Pax : ${form.adult} adult`;
  if (paxRows.length > 0) {
    const childRow = paxRows.find(row => row.type === 'child');
    const infantRow = paxRows.find(row => row.type === 'infant');
    const parts = [`${form.adult} adult`];
    if (childRow) parts.push(`${childRow.count} child`);
    if (infantRow) parts.push(`${infantRow.count} infant`);
    paxLine = `Pax : ${parts.join(', ')}`;
  }

  const confirmationText =
    form.addressOption === "without"
      ? `Please confirm the for this booking:\n\nBooking no : ${form.bookingNumber}\nTour date : ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY") : ""}\nProgram : ${form.program}\nName : ${form.name}\n${paxLine}\nPhone Number : ${form.phoneNumber}\nCash on tour : ${form.cashTours || "None"}`
      : `Please confirm the *pickup time* for this booking:\n\nBooking no : ${form.bookingNumber}\nTour date : ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY") : ""}\nProgram : ${form.program}\nName : ${form.name}\n${paxLine}\nHotel : ${form.hotel}\nPhone Number : ${form.phoneNumber}\nCash on tour : ${form.cashTours || "None"}\n\nPlease mentioned if there is any additional charge for transfer collect from customer`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(confirmationText);
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const handleAddPax = () => {
    const types = paxRows.map((row) => row.type);
    if (!types.includes("child")) {
      setPaxRows([...paxRows, { type: "child", count: 1 }]);
    } else if (!types.includes("infant")) {
      setPaxRows([...paxRows, { type: "infant", count: 1 }]);
    }
  };

  const handlePaxTypeChange = (idx, value) => {
    if (paxRows.some((row, i) => row.type === value && i !== idx)) return;
    setPaxRows((prev) => prev.map((row, i) => (i === idx ? { ...row, type: value } : row)));
  };

  const handlePaxCountChange = (idx, value) => {
    setPaxRows((prev) => prev.map((row, i) => (i === idx ? { ...row, count: value } : row)));
  };

  const handleRemovePax = (idx) => {
    setPaxRows((prev) => prev.filter((_, i) => i !== idx));
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
            {/* Move PAX rows directly under Adult field */}
            {paxRows.length > 0 && (
              <Grid item xs={12} md={8} container spacing={2} alignItems="center">
                {paxRows.map((row, idx) => (
                  <Grid item xs={12} md={6} key={idx} container spacing={1} alignItems="center">
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        type="number"
                        value={row.count}
                        onChange={e => handlePaxCountChange(idx, e.target.value)}
                        variant="outlined"
                        InputProps={{ style: { color: "#fff" } }}
                        sx={{ bgcolor: "#322b4d" }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        select
                        fullWidth
                        value={row.type}
                        onChange={e => handlePaxTypeChange(idx, e.target.value)}
                        variant="outlined"
                        InputProps={{ style: { color: "#fff" } }}
                        sx={{ bgcolor: "#322b4d" }}
                      >
                        <MenuItem value="child" disabled={paxRows.some((r, i) => r.type === "child" && i !== idx)}>
                          child
                        </MenuItem>
                        <MenuItem value="infant" disabled={paxRows.some((r, i) => r.type === "infant" && i !== idx)}>
                          infant
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Button onClick={() => handleRemovePax(idx)} sx={{ minWidth: 0, color: '#a084e8' }}>
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                variant="text"
                sx={{ color: "#a084e8", ml: 1 }}
                onClick={handleAddPax}
              >
                + Add Pax
              </Button>
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
              {/* National Park Fee radio group under Cash Tours */}
              <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend" sx={{ color: "#fff" }}>
                  National Park Fee
                </FormLabel>
                <RadioGroup
                  row
                  name="parkFee"
                  value={form.parkFee}
                  onChange={e => {
                    const value = e.target.value;
                    setForm(prev => ({
                      ...prev,
                      parkFee: value,
                      cashTours: value === 'none' ? 'None' : 'National Park Fee',
                    }));
                  }}
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