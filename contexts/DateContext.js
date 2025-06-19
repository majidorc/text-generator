import { createContext, useContext, useState } from 'react';
import { addDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const DateContext = createContext();

export function DateProvider({ children }) {
  // Get tomorrow's date in Bangkok timezone
  const tomorrow = addDays(utcToZonedTime(new Date(), 'Asia/Bangkok'), 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow);

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