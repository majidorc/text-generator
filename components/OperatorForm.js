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
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { useDate } from '../contexts/DateContext';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function OperatorForm({ sharedName, setSharedName, form, setForm }) {
  const { selectedDate, setSelectedDate } = useDate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setSharedName(value);
      setForm((prev) => ({ ...prev, name: value }));
      return;
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...form,
      tourDate: selectedDate,
    };
    setForm(formData);
    setShowConfirm(true);
    navigator.clipboard.writeText(confirmationText);
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const handleClear = () => {
    setForm({
      bookingNumber: "",
      program: "",
      name: "",
      tourDate: dayjs().tz('Asia/Bangkok').add(1, 'day'),
      hotel: "",
      phoneNumber: "",
      addressOption: "",
      cashTours: "None",
      adult: 1,
      parkFee: "none",
      paxRows: [],
    });
    setShowConfirm(false);
    setSharedName("");
  };

  // Compose Pax line for confirmation text
  let paxLine = `Pax : ${form.adult} adult`;
  if (form.paxRows && form.paxRows.length > 0) {
    const childRow = form.paxRows.find(row => row.type === 'child');
    const infantRow = form.paxRows.find(row => row.type === 'infant');
    const parts = [`${form.adult} adult`];
    if (childRow) parts.push(`${childRow.count} child`);
    if (infantRow) parts.push(`${infantRow.count} infant`);
    paxLine = `Pax : ${parts.join(', ')}`;
  }

  function buildConfirmationText() {
    const lines = [];
    if (form.addressOption === "without") {
      lines.push("Please confirm the for this booking:\n");
    } else {
      lines.push("Please confirm the *pickup time* for this booking:\n");
    }
    if (form.bookingNumber) lines.push(`Booking no : ${form.bookingNumber}`);
    if (form.tourDate) lines.push(`Tour date : ${dayjs(form.tourDate).format("DD MMM YYYY")}`);
    if (form.program) lines.push(`Program : ${form.program}`);
    if (form.name) lines.push(`Name : ${form.name}`);
    if (paxLine) lines.push(paxLine);
    if (form.addressOption !== "without" && form.hotel) lines.push(`Hotel : ${form.hotel}`);
    if (form.phoneNumber) lines.push(`Phone Number : ${form.phoneNumber}`);
    if (form.cashTours) lines.push(`Cash on tour : ${form.cashTours}`);
    if (form.addressOption !== "without") {
      lines.push("\nPlease mentioned if there is any additional charge for transfer collect from customer");
    }
    return lines.join("\n");
  }

  const confirmationText = buildConfirmationText();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(confirmationText);
    setSnackbar({ open: true, message: "Copied to clipboard!" });
  };

  const handleAddPax = () => {
    const types = form.paxRows.map((row) => row.type);
    if (!types.includes("child")) {
      setForm((prev) => ({ ...prev, paxRows: [...prev.paxRows, { type: "child", count: 1 }] }));
    } else if (!types.includes("infant")) {
      setForm((prev) => ({ ...prev, paxRows: [...prev.paxRows, { type: "infant", count: 1 }] }));
    }
  };

  const handlePaxTypeChange = (idx, value) => {
    if (form.paxRows.some((row, i) => row.type === value && i !== idx)) return;
    setForm((prev) => ({
      ...prev,
      paxRows: prev.paxRows.map((row, i) => (i === idx ? { ...row, type: value } : row)),
    }));
  };

  const handlePaxCountChange = (idx, value) => {
    setForm((prev) => ({
      ...prev,
      paxRows: prev.paxRows.map((row, i) => (i === idx ? { ...row, count: value } : row)),
    }));
  };

  const handleRemovePax = (idx) => {
    setForm((prev) => ({
      ...prev,
      paxRows: prev.paxRows.filter((_, i) => i !== idx),
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, bgcolor: "background.paper", color: "text.primary", borderRadius: 2, mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                required
                label="Booking Number"
                name="bookingNumber"
                value={form.bookingNumber}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "background.default" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                required
                label="Program"
                name="program"
                value={form.program}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "background.default" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                required
                label="Name"
                name="name"
                value={sharedName}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "background.default" }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Tour Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(dayjs(newValue))}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      variant: "outlined",
                      sx: { bgcolor: "background.default" },
                      autoComplete: "off"
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Hotel"
                name="hotel"
                value={form.hotel}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "background.default" }}
                autoComplete="off"
              />
              <RadioGroup
                row
                name="addressOption"
                value={form.addressOption}
                onChange={handleChange}
                sx={{ mt: 2 }}
              >
                <FormControlLabel
                  value="without"
                  control={<Radio sx={{ color: "text.primary" }} />}
                  label={<span style={{ fontSize: 14, fontWeight: 400 }}>No Transfer</span>}
                  sx={{ mr: 3 }}
                />
                <FormControlLabel
                  value="sendLater"
                  control={<Radio sx={{ color: "text.primary" }} />}
                  label={<span style={{ fontSize: 14, fontWeight: 400 }}>Send Later</span>}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={3}>
              <PhoneInput
                country={"th"}
                value={form.phoneNumber}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: "100%",
                  background: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  border: "1px solid #6c63a7",
                  borderRadius: 8,
                  height: 48,
                  fontSize: 16,
                }}
                buttonStyle={{
                  background: theme.palette.background.default,
                  border: "none",
                }}
                dropdownStyle={{
                  background: theme.palette.background.default,
                  color: theme.palette.text.primary,
                }}
                specialLabel=""
                inputProps={{
                  name: "phoneNumber",
                  required: false,
                  autoFocus: false,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                required
                label="Adult"
                name="adult"
                type="number"
                value={form.adult}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "background.default" }}
                autoComplete="off"
              />
            </Grid>
            {form.paxRows && form.paxRows.length > 0 && (
              <Grid item xs={12} md={6} container spacing={2} alignItems="center">
                {form.paxRows.map((row, idx) => (
                  <Grid item xs={12} md={6} key={idx} container spacing={1} alignItems="center">
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        type="number"
                        value={row.count}
                        onChange={e => handlePaxCountChange(idx, e.target.value)}
                        variant="outlined"
                        sx={{ bgcolor: "background.default" }}
                        autoComplete="off"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        select
                        fullWidth
                        value={row.type}
                        onChange={e => handlePaxTypeChange(idx, e.target.value)}
                        variant="outlined"
                        sx={{ bgcolor: "background.default" }}
                        autoComplete="off"
                      >
                        <MenuItem value="child" disabled={form.paxRows.some((r, i) => r.type === "child" && i !== idx)}>
                          child
                        </MenuItem>
                        <MenuItem value="infant" disabled={form.paxRows.some((r, i) => r.type === "infant" && i !== idx)}>
                          infant
                        </MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Button onClick={() => handleRemovePax(idx)} sx={{ minWidth: 0, color: '#a084e8', borderRadius: 1, p: 1, transition: 'background 0.2s', '&:hover': { background: '#3a2e6e' } }}>
                        <DeleteIcon />
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid item xs={12} md={3}>
              <Button
                variant="text"
                sx={{ color: "#a084e8", ml: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, transition: 'color 0.2s', '&:hover': { color: '#fff' } }}
                onClick={handleAddPax}
              >
                + Add Pax
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                required
                label="Cash on Tour"
                name="cashTours"
                value={form.cashTours}
                onChange={handleChange}
                variant="outlined"
                sx={{ bgcolor: "background.default" }}
                autoComplete="off"
              />
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
                sx={{ mt: 2 }}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio sx={{ color: "text.primary" }} />}
                  label={<span style={{ fontSize: 14, fontWeight: 400 }}>None</span>}
                  sx={{ mr: 3 }}
                />
                <FormControlLabel
                  value="fee"
                  control={<Radio sx={{ color: "text.primary" }} />}
                  label={<span style={{ fontSize: 14, fontWeight: 400 }}>National Park Fee</span>}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", gap: 2, mt: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button type="submit" variant="contained" sx={{ minWidth: 160, fontWeight: 600 }}>
                OK / Copy
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
                sx={{
                  minWidth: 160,
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 4,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  bgcolor: 'background.default',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'background.paper',
                    borderColor: 'primary.main',
                  },
                }}
              >
                CLEAR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      {showConfirm && (
        <Paper sx={{ p: 3, bgcolor: "#231f3a", color: "#fff", borderRadius: 2, mb: 4 }}>
          <pre style={{ color: "#fff", fontFamily: "inherit", fontSize: 16, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {confirmationText}
          </pre>
          <Button variant="contained" sx={{ bgcolor: "#a084e8", mt: 2 }} onClick={handleCopy}>
            Copy
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