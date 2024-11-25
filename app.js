import React from 'react';
import './App.scss';

// Importing Backpack Calendar components
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from 'bpk-component-calendar';

function App() {
  // Calendar configuration
  const formatDateFull = (date) => date.toDateString();
  const formatMonth = (date) => date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flight Schedule</h1>
      </header>
      <main>
        <div className="calendar-container">
          <BpkCalendar
            id="calendar"
            onDateSelect={handleDateSelect}
            formatDateFull={formatDateFull}
            formatMonth={formatMonth}
            selectionConfiguration={{
              type: CALENDAR_SELECTION_TYPE.single,
            }}
          />
        </div>
        <button className="continue-button">Continue</button>
      </main>
    </div>
  );
}

export default App;
