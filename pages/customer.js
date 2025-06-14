import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function Customer() {
  const [form, setForm] = useState({
    tourDate: dayjs(),
    name: "",
    pickUp: "",
    pickupFrom: dayjs().hour(8).minute(0),
    pickupTo: dayjs().hour(9).minute(0),
    sendNow: false,
    feeAdult: "0",
    feeChild: "0",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [showFeeFields, setShowFeeFields] = useState(false);
  const [withFee, setWithFee] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, tourDate: date }));
  };
  const handleTimeFromChange = (date) => {
    setForm((prev) => ({ ...prev, pickupFrom: date }));
  };
  const handleTimeToChange = (date) => {
    setForm((prev) => ({ ...prev, pickupTo: date }));
  };

  const handleSubmit = (fee) => {
    setWithFee(fee);
    setShowFeeFields(fee);
    if (!fee) {
      setShowConfirm(true);
      navigator.clipboard.writeText(confirmationText(false));
      setSnackbar({ open: true, message: "Copied to clipboard!" });
    }
  };

  const handleToggleFee = () => {
    setWithFee((prev) => {
      if (prev) {
        setShowFeeFields(false);
        return false;
      } else {
        setShowFeeFields(true);
        return true;
      }
    });
    setShowConfirm(false);
  };

  const handleWithFeeConfirm = () => {
    setShowConfirm(true);
    navigator.clipboard.writeText(confirmationText(true));
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const confirmationText = (fee) => {
    if (fee) {
      return (
        `Hello ,\n\n` +
        `Warm Greetings from Thailand Tours\nThank you for choosing to book your trip with us!\n\n` +
        `We are pleased to confirm your booking, as detailed below.\n\n` +
        `Tour date:  ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY").replace(/(\d{2}) (\w{3}) (\d{4})/, (m, d, mon, y) => `${parseInt(d)} ${mon} ${y}`) : ""}\n` +
        `Pick up: ${form.pickUp}\n` +
        `Pickup time: ${form.pickupFrom ? dayjs(form.pickupFrom).format("HH:mm") : ""} ~ ${form.pickupTo ? dayjs(form.pickupTo).format("HH:mm") : ""}\n\n` +
        `**Please be prepared and ready at the reception a few minutes before, and please note that the driver could be late by 15-30 minutes due to traffic and unwanted clauses.\nWe will try to be on time as possible, please just call us if driver be later more than 10 mins**\n\n` +
        `The national park fee of THB ${form.feeAdult} per adult and THB ${form.feeChild} per child is excluded from the tour price. Please prepare cash for this fee. This fee is a maintenance fee collected by the Thai government department. There is no exception.\n\n` +
        `Should you require any other assistance, please do not hesitate to contact us at anytime by replying to this email.\n\n` +
        `We wish you a great day and a fantastic trip!\n\n` +
        `Best Regards,\nThailand Tours team`
      );
    }
    let text = `Hello ${form.name} ,\n\nWarm Greetings from Thailand Tours\nThank you for choosing to book your trip with us!\n\nWe are pleased to confirm your booking, as detailed below.\n\nTour date: ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY") : ""}\nPick up: ${form.pickUp}\nPickup time: ${form.pickupFrom ? dayjs(form.pickupFrom).format("HH:mm") : ""} ~ ${form.pickupTo ? dayjs(form.pickupTo).format("HH:mm") : ""}`;
    text += `\n\n** Please be prepared and ready at the reception a few minutes before, and please note that the driver could be late by 15-30 minutes due to traffic and unwanted clauses.\nWe will try to be on time as possible , please just call us if driver be later more than 10 mins**\n\nShould you require any other assistance, please do not hesitate to contact us at anytime by replying to this email.\n\nWe wish you a great day and a fantastic trip!\n\nBest Regards,\nThailand Tours team`;
    return text;
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, bgcolor: "#231f3a", color: "#fff", borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: 2 }}>
          Customer Form Without Fee
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="tour Date :"
                value={form.tourDate}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant="outlined" sx={{ bgcolor: "#2d2746" }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Name :*"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: "#2d2746" }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Pick up :"
              name="pickUp"
              value={form.pickUp}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: "#2d2746" }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Pickup time from:"
                value={form.pickupFrom}
                onChange={handleTimeFromChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant="outlined" sx={{ bgcolor: "#2d2746" }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Pickup time to:"
                value={form.pickupTo}
                onChange={handleTimeToChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant="outlined" sx={{ bgcolor: "#2d2746" }} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {showFeeFields && (
            <>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="FEE Child :"
                  name="feeChild"
                  value={form.feeChild}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "#2d2746" }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="FEE Adult :"
                  name="feeAdult"
                  value={form.feeAdult}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "#2d2746" }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox checked={form.sendNow} onChange={handleChange} name="sendNow" sx={{ color: "#fff" }} />}
              label="Send Now:"
              sx={{ color: "#fff" }}
            />
          </Grid>
          {!showFeeFields && (
            <>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="contained" color="primary" sx={{ bgcolor: "#a084e8" }} onClick={() => handleSubmit(false)}>
                  Send Mail
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="contained" color="secondary" sx={{ bgcolor: "#a084e8" }} onClick={handleToggleFee}>
                  With Fee
                </Button>
              </Grid>
            </>
          )}
          {showFeeFields && (
            <>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="contained" color="primary" sx={{ bgcolor: "#a084e8" }} onClick={handleWithFeeConfirm}>
                  Send Mail
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button fullWidth variant="contained" color="secondary" sx={{ bgcolor: "#a084e8" }} onClick={handleToggleFee}>
                  Without Fee
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
      {showConfirm && (
        <Paper sx={{ p: 3, bgcolor: "#231f3a", color: "#fff", borderRadius: 2, mb: 4 }}>
          <pre style={{ color: "#fff", fontFamily: "inherit", fontSize: 16, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {confirmationText(withFee)}
          </pre>
          <Button variant="contained" sx={{ bgcolor: "#a084e8", mt: 2 }} onClick={() => {navigator.clipboard.writeText(confirmationText(withFee)); setSnackbar({ open: true, message: "Copied to clipboard!" });}}>
            Copy Email
          </Button>
        </Paper>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
      />
    </Container>
  );
}

Customer.pageTitle = "Customer"; 