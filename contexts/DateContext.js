import { createContext, useContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const DateContext = createContext();

export function DateProvider({ children }) {
  // Initialize with null to avoid hydration mismatch
  const [selectedDate, setSelectedDate] = useState(null);

  // Set the initial date on the client side only
  useEffect(() => {
    const tomorrow = dayjs().tz('Asia/Bangkok').add(1, 'day');
    setSelectedDate(tomorrow);
  }, []);

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
} 