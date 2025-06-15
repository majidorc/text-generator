import React, { useState, useEffect } from "react";
import { Box, Container, Paper, Tabs, Tab } from "@mui/material";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
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

  useEffect(() => {
    const shouldSync =
      operatorForm.addressOption !== 'sendLater' &&
      operatorForm.addressOption !== 'without' &&
      operatorForm.hotel &&
      (customerForm.pickUp === '' || customerForm.pickUp === lastHotelSynced);
    if (shouldSync) {
      setCustomerForm((prev) => ({ ...prev, pickUp: operatorForm.hotel }));
      setLastHotelSynced(operatorForm.hotel);
    }
    // Clear pickUp if addressOption is sendLater/without
    if ((operatorForm.addressOption === 'sendLater' || operatorForm.addressOption === 'without') && customerForm.pickUp) {
      setCustomerForm((prev) => ({ ...prev, pickUp: '' }));
      setLastHotelSynced("");
    }
  }, [operatorForm.hotel, operatorForm.addressOption]);

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 2, bgcolor: "#231f3a", color: "#fff", borderRadius: 2, mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
          centered
        >
          <Tab label="Operator Form" />
          <Tab label="Customer Form" />
        </Tabs>
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
    </Container>
  );
} 