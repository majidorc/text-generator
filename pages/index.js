import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Paper, Tabs, Tab, IconButton, TextField, useMediaQuery } from "@mui/material";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import CalculateIcon from "@mui/icons-material/Calculate";
import ClearIcon from "@mui/icons-material/Clear";
import { ThemeModeContext } from "./_app";
import { useTheme } from "@mui/material/styles";
import Head from 'next/head';
dayjs.extend(utc);
dayjs.extend(timezone);

// Dynamically import the forms to avoid SSR issues
const OperatorForm = dynamic(() => import("../components/OperatorForm"), { ssr: false });
const CustomerForm = dynamic(() => import("../components/customer"), { ssr: false });
const PercentageCalculator = dynamic(() => import("../components/PercentageCalculator"), { ssr: false });

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
    transferPerPerson: false,
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

  const handleClearCache = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      // Reload the page to clear all cached data
      window.location.reload();
    }
  };



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
    <>
      <Head>
        <title>Thailand Tours Operator & Customer Form</title>
        <meta name="description" content="Modern operator and customer form app for Thailand Tours. Create, preview, and share bookings easily." />
      </Head>
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Paper sx={{ p: 2, bgcolor: "background.paper", color: "text.primary", borderRadius: 2, mb: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 1, fontWeight: 700, fontSize: { xs: 16, sm: 18 }, letterSpacing: 0.5 }}>
            Kos Nane Saeid o SAM
          </Box>
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
                <Tab icon={<CalculateIcon />} aria-label="Calculator" />
              </Tabs>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <IconButton onClick={handleClearCache} color="inherit" aria-label="clear cache" title="Clear Cache">
                  <ClearIcon />
                </IconButton>
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
                <Tab icon={<CalculateIcon />} aria-label="Calculator" />
              </Tabs>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={handleClearCache} color="inherit" aria-label="clear cache" title="Clear Cache">
                  <ClearIcon />
                </IconButton>
                <IconButton onClick={handleToggle} color="inherit" aria-label="toggle dark mode">
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            </Box>
          )}
        </Paper>
        <TabPanel value={tab} index={0}>
          <OperatorForm
            sharedName={sharedName}
            setSharedName={setSharedName}
            form={operatorForm}
            setForm={setOperatorForm}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <CustomerForm
            sharedName={sharedName}
            setSharedName={setSharedName}
            form={customerForm}
            setForm={setCustomerForm}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <PercentageCalculator />
        </TabPanel>
      </Container>
    </>
  );
} 