import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Paper, Tabs, Tab, IconButton, TextField, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeModeContext } from "./_app";
import { useTheme } from "@mui/material/styles";
dayjs.extend(utc);
dayjs.extend(timezone);

// Dynamically import the forms to avoid SSR issues
const OperatorForm = dynamic(() => import("../components/OperatorForm"), { ssr: false });
const CustomerForm = dynamic(() => import("../components/customer"), { ssr: false });

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function IndexPage() {
  const [tab, setTab] = useState(0);
  const [sharedName, setSharedName] = useState("");
  const [headerText, setHeaderText] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Operator form state
  const [operatorForm, setOperatorForm] = useState({
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
  // Customer form state
  const [customerForm, setCustomerForm] = useState({
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
  // Track last hotel value synced to pickUp
  const [lastHotelSynced, setLastHotelSynced] = useState("");
  const { mode, handleToggle } = useContext(ThemeModeContext);

  // Load company name from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('companyName');
      if (saved) setHeaderText(saved);
    }
  }, []);

  // Save company name to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('companyName', headerText);
    }
  }, [headerText]);

  useEffect(() => {
    if (
      operatorForm.addressOption !== 'sendLater' &&
      operatorForm.addressOption !== 'without'
    ) {
      setCustomerForm((prev) => ({ ...prev, pickUp: operatorForm.hotel }));
    }
    if ((operatorForm.addressOption === 'sendLater' || operatorForm.addressOption === 'without')) {
      setCustomerForm((prev) => ({ ...prev, pickUp: '' }));
    }
  }, [operatorForm.hotel, operatorForm.addressOption]);

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 2, bgcolor: "background.paper", color: "text.primary", borderRadius: 2, mb: 4 }}>
        {isMobile ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              textColor="inherit"
              indicatorColor="secondary"
              centered
              sx={{ mb: 1 }}
            >
              <Tab label="Operator Form" />
              <Tab label="Customer Form" />
            </Tabs>
            {tab === 1 && (
              <TextField
                label="Your Company Name"
                value={headerText}
                onChange={e => setHeaderText(e.target.value)}
                size="small"
                fullWidth
                sx={{ mb: 1 }}
              />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleToggle} color="inherit" aria-label="toggle dark mode">
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              textColor="inherit"
              indicatorColor="secondary"
              centered
              sx={{ flex: 1 }}
            >
              <Tab label="Operator Form" />
              <Tab label="Customer Form" />
            </Tabs>
            {tab === 1 && (
              <TextField
                label="Your Company Name"
                value={headerText}
                onChange={e => setHeaderText(e.target.value)}
                size="small"
                sx={{ minWidth: 180, mx: 2 }}
              />
            )}
            <IconButton onClick={handleToggle} color="inherit" aria-label="toggle dark mode" sx={{ ml: 2 }}>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        )}
      </Paper>
      <TabPanel value={tab} index={0}>
        <OperatorForm
          sharedName={sharedName}
          setSharedName={setSharedName}
          form={operatorForm}
          setForm={setOperatorForm}
          companyName={headerText}
        />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <CustomerForm
          sharedName={sharedName}
          setSharedName={setSharedName}
          form={customerForm}
          setForm={setCustomerForm}
          companyName={headerText}
        />
      </TabPanel>
    </Container>
  );
} 