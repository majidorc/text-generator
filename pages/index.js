import React, { useState } from "react";
import { Box, Container, Paper, Tabs, Tab } from "@mui/material";
import dynamic from "next/dynamic";

// Dynamically import the forms to avoid SSR issues
const OperatorForm = dynamic(() => import("./OperatorForm"), { ssr: false });
const CustomerForm = dynamic(() => import("./customer"), { ssr: false });

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
        <OperatorForm sharedName={sharedName} setSharedName={setSharedName} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <CustomerForm sharedName={sharedName} setSharedName={setSharedName} />
      </TabPanel>
    </Container>
  );
} 