import React from 'react';
import { format, parseISO } from 'date-fns';
import { FiRefreshCw, FiMessageSquare } from 'react-icons/fi';

const AppointmentList = ({ appointments, loading, onSendReminder, onRefresh }) => {
  const getStatusBadge = (appointment) => {
    if (appointment.confirmed) {
      return <span className="badge confirmed">Confirmed</span>;
    }
    return <span className="badge pending">Pending</span>;
  };

  return (
    <div className="card list-card">
      <div className="card-header">
        <h3>Upcoming Appointments</h3>
        <button onClick={onRefresh} className="refresh-btn">
          <FiRefreshCw className={loading ? 'spin' : ''} />
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : appointments.length === 0 ? (
        <div className="empty-state">No upcoming appointments</div>
      ) : (
        <div className="appointment-table">
          <div className="table-header">
            <div>Patient</div>
            <div>Date</div>
            <div>Reason</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {appointments.map((appt) => (
            <div key={appt.id} className="table-row">
              <div className="patient-info">
                <div className="name">{appt.patient.name}</div>
                <div className="phone">{appt.patient.phone}</div>
              </div>
              <div className="date">
                {format(parseISO(appt.date), 'MMM d, yyyy')}
              </div>
              <div className="reason">{appt.reason}</div>
              <div className="status">
                {getStatusBadge(appt)}
                {appt.reminder_sent && (
                  <span className="reminder-sent">Reminder Sent</span>
                )}
              </div>
              <div className="actions">
                {!appt.reminder_sent && (
                  <button 
                    onClick={() => onSendReminder(appt.id)}
                    className="reminder-btn"
                  >
                    <FiMessageSquare /> Send Reminder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;