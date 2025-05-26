import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { phone } from 'phone';

const PatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date(),
    reason: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason is required';
    
    const phoneValidation = phone(formData.phone);
    if (!phoneValidation.isValid) newErrors.phone = 'Invalid phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        date: new Date(),
        reason: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card form-card">
      <h3>New Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number (WhatsApp)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Email (Optional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Appointment Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData(prev => ({ ...prev, date }))}
            minDate={new Date()}
            dateFormat="MMMM d, yyyy"
            className="date-picker"
          />
        </div>

        <div className="form-group">
          <label>Reason for Visit</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className={errors.reason ? 'error' : ''}
            rows="3"
          />
          {errors.reason && <span className="error-text">{errors.reason}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Schedule Appointment
        </button>
      </form>
    </div>
  );
};

export default PatientForm;