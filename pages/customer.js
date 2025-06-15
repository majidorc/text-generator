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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Customer({ sharedName, setSharedName, form, setForm }) {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });

  // Update confirmation text instantly if box is open and fee mode/values change
  React.useEffect(() => {
    if (showConfirm) {
      navigator.clipboard.writeText(confirmationText(form.withFee));
    }
    // eslint-disable-next-line
  }, [form.withFee, form.feeAdult, form.feeChild, form.exTransfer, form.pickUp, form.tourDate, form.pickupFrom, form.pickupTo, form.name]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "name") {
      setSharedName(value);
      setForm((prev) => ({ ...prev, name: value }));
      return;
    }
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
    setForm((prev) => ({ ...prev, withFee: fee, showFeeFields: fee }));
    setShowConfirm(true);
    navigator.clipboard.writeText(confirmationText(fee));
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const handleToggleFee = () => {
    setForm((prev) => {
      if (prev.withFee) {
        return { ...prev, withFee: false, showFeeFields: false };
      } else {
        return { ...prev, withFee: true, showFeeFields: true };
      }
    });
  };

  const handleWithFeeConfirm = () => {
    setShowConfirm(true);
    navigator.clipboard.writeText(confirmationText(true));
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const handleClear = () => {
    setForm({
      tourDate: dayjs().tz('Asia/Bangkok').add(1, 'day').startOf('day'),
      name: "",
      pickUp: "",
      exTransfer: "",
      pickupFrom: dayjs().hour(8).minute(0),
      pickupTo: dayjs().hour(9).minute(0),
      sendNow: false,
      feeAdult: "0",
      feeChild: "0",
      showFeeFields: false,
      withFee: false,
    });
    setShowConfirm(false);
    setSharedName("");
  };

  const confirmationText = (fee) => {
    const pickUpText = form.exTransfer
      ? `Pick up: ${form.pickUp} ( extra charge for private transfer ${form.exTransfer}THB )`
      : `Pick up: ${form.pickUp}`;
    if (fee) {
      return (
        `Hello ,\n\n` +
        `Warm Greetings from Thailand Tours\nThank you for choosing to book your trip with us!\n\n` +
        `We are pleased to confirm your booking, as detailed below.\n\n` +
        `Tour date:  ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY").replace(/(\d{2}) (\w{3}) (\d{4})/, (m, d, mon, y) => `${parseInt(d)} ${mon} ${y}`) : ""}\n` +
        `${pickUpText}\n` +
        `Pickup time: ${form.pickupFrom ? dayjs(form.pickupFrom).format("HH:mm") : ""} ~ ${form.pickupTo ? dayjs(form.pickupTo).format("HH:mm") : ""}\n\n` +
        `**Please be prepared and ready at the reception a few minutes before, and please note that the driver could be late by 15-30 minutes due to traffic and unwanted clauses.\nWe will try to be on time as possible, please just call us if driver be later more than 10 mins**\n\n` +
        `The national park fee of THB ${form.feeAdult} per adult and THB ${form.feeChild} per child is excluded from the tour price. Please prepare cash for this fee. This fee is a maintenance fee collected by the Thai government department. There is no exception.\n\n` +
        `Should you require any other assistance, please do not hesitate to contact us at anytime by replying to this email.\n\n` +
        `We wish you a great day and a fantastic trip!\n\n` +
        `Best Regards,\nThailand Tours team`
      );
    }
    let text = `Hello ${form.name} ,\n\nWarm Greetings from Thailand Tours\nThank you for choosing to book your trip with us!\n\nWe are pleased to confirm your booking, as detailed below.\n\nTour date: ${form.tourDate ? dayjs(form.tourDate).format("DD MMM YYYY") : ""}\n${pickUpText}\nPickup time: ${form.pickupFrom ? dayjs(form.pickupFrom).format("HH:mm") : ""} ~ ${form.pickupTo ? dayjs(form.pickupTo).format("HH:mm") : ""}`;
    text += `\n\n** Please be prepared and ready at the reception a few minutes before, and please note that the driver could be late by 15-30 minutes due to traffic and unwanted clauses.\nWe will try to be on time as possible , please just call us if driver be later more than 10 mins**\n\nShould you require any other assistance, please do not hesitate to contact us at anytime by replying to this email.\n\nWe wish you a great day and a fantastic trip!\n\nBest Regards,\nThailand Tours team`;
    return text;
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, bgcolor: "#231f3a", color: "#fff", borderRadius: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Name :*"
              name="name"
              value={sharedName}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: "#2d2746" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Ex/Transfer"
              name="exTransfer"
              value={form.exTransfer}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: "#2d2746" }}
              type="number"
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
          <Grid item xs={12} md={3}>
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
          {form.showFeeFields && (
            <>
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={3}>
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
            </>
          )}
          <Grid item xs={12} mt={2} display="flex" justifyContent="center" gap={2}>
            {!form.showFeeFields && (
              <>
                <Button variant="contained" color="primary" sx={{ bgcolor: "#a084e8", minWidth: 180 }} onClick={() => handleSubmit(false)}>
                  OK / Copy
                </Button>
                <Button variant="contained" color="secondary" sx={{ bgcolor: "#a084e8", minWidth: 180 }} onClick={handleToggleFee}>
                  With Fee
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear} sx={{ borderColor: '#a084e8', color: '#fff', fontWeight: 700, borderRadius: 2, px: 4, '&:hover': { bgcolor: '#3a2e6e', borderColor: '#fff' } }}>
                  CLEAR
                </Button>
              </>
            )}
            {form.showFeeFields && (
              <>
                <Button variant="contained" color="primary" sx={{ bgcolor: "#a084e8", minWidth: 180 }} onClick={handleWithFeeConfirm}>
                  OK / Copy
                </Button>
                <Button variant="contained" color="secondary" sx={{ bgcolor: "#a084e8", minWidth: 180 }} onClick={handleToggleFee}>
                  Without Fee
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleClear} sx={{ borderColor: '#a084e8', color: '#fff', fontWeight: 700, borderRadius: 2, px: 4, '&:hover': { bgcolor: '#3a2e6e', borderColor: '#fff' } }}>
                  CLEAR
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
      {showConfirm && (
        <Paper sx={{ p: 3, bgcolor: "#231f3a", color: "#fff", borderRadius: 2, mb: 4 }}>
          <pre style={{ color: "#fff", fontFamily: "inherit", fontSize: 16, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {confirmationText(form.withFee)}
          </pre>
          <Button variant="contained" sx={{ bgcolor: "#a084e8", mt: 2 }} onClick={() => {navigator.clipboard.writeText(confirmationText(form.withFee)); setSnackbar({ open: true, message: "Copied to clipboard!" });}}>
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