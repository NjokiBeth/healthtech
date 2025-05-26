import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { format, parseISO, isAfter } from 'date-fns';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './styles/main.css';

// Components
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import AppointmentList from './components/AppointmentList';
import ReminderSettings from './components/ReminderSettings';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/appointments');
      
      // Filter to show only upcoming appointments
      const now = new Date();
      const upcoming = response.data.filter(appt => 
        isAfter(parseISO(appt.date), now)
      );
      
      setAppointments(upcoming);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const handleNewAppointment = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/appointments', {
        ...formData,
        date: format(formData.date, 'yyyy-MM-dd')
      });
      
      setAppointments(prev => [...prev, response.data]);
      toast.success('Appointment created successfully!');
    } catch (error) {
      toast.error('Failed to create appointment');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="dashboard">
        <div className="content-grid">
          <div className="form-section">
            <PatientForm onSubmit={handleNewAppointment} />
            <ReminderSettings />
          </div>
          
          <div className="list-section">
            <AppointmentList 
              appointments={appointments} 
              loading={loading}
              onRefresh={fetchAppointments}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;