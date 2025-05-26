import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const date = "2025-05-27";
const time = "10:00 AM";
const reason = "Consultation";
const doctor = "Dr. Smith";



const ReminderSettings = () => {
  const [settings, setSettings] = useState({
    reminderTime: '1',
    messageTemplate: 'Reminder: You have an appointment on {date} for {reason}. Please reply CONFIRM to confirm or RESCHEDULE to reschedule.',
    whatsappEnabled: true,
    smsEnabled: false,
    emailEnabled: false
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current settings from backend
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        setSettings(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load settings');
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/settings', settings);
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  if (loading) {
    return <div className="card settings-card">Loading settings...</div>;
  }

  return (
    <div className="card settings-card">
      <h3>Reminder Settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="settings-group">
          <label htmlFor="reminderTime">Default Reminder Time</label>
          <select
            id="reminderTime"
            name="reminderTime"
            value={settings.reminderTime}
            onChange={handleChange}
          >
            <option value="1">1 day before</option>
            <option value="2">2 days before</option>
            <option value="3">3 days before</option>
            <option value="7">1 week before</option>
          </select>
        </div>

        <div className="settings-group">
          <label htmlFor="messageTemplate">Message Template</label>
          <textarea
            id="messageTemplate"
            name="messageTemplate"
            value={settings.messageTemplate}
            onChange={handleChange}
            rows="4"
          />
          <div className="template-tokens">
            Available tokens: <code>{date}</code>, <code>{time}</code>, <code>{reason}</code>, <code>{doctor}</code>
          </div>
        </div>

        <div className="settings-group">
          <label>Notification Channels</label>
          <div className="channel-options">
            <label>
              <input
                type="checkbox"
                name="whatsappEnabled"
                checked={settings.whatsappEnabled}
                onChange={handleChange}
              />
              WhatsApp
            </label>
            <label>
              <input
                type="checkbox"
                name="smsEnabled"
                checked={settings.smsEnabled}
                onChange={handleChange}
              />
              SMS
            </label>
            <label>
              <input
                type="checkbox"
                name="emailEnabled"
                checked={settings.emailEnabled}
                onChange={handleChange}
              />
              Email
            </label>
          </div>
        </div>

        <div className="settings-group">
          <label htmlFor="businessHours">Business Hours</label>
          <div className="time-range">
            <input
              type="time"
              name="startTime"
              value={settings.startTime || '09:00'}
              onChange={handleChange}
            />
            <span>to</span>
            <input
              type="time"
              name="endTime"
              value={settings.endTime || '17:00'}
              onChange={handleChange}
            />
            <span>(Only send reminders during these hours)</span>
          </div>
        </div>

        <button type="submit" className="save-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ReminderSettings;