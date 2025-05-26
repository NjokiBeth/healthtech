# HealthTrack Reminders 🏥⏰


A modern patient follow-up management system with automated WhatsApp reminders for healthcare providers.

Pitchdeck: https://gamma.app/docs/Healthtech-Follow-Up-Reminder-System-h24xcu9t5oz2xn3?mode=doc 

## Features ✨

### Core Functionality
- **Appointment Scheduling**
  - Intuitive patient registration
  - Flexible calendar management
  - Automated reminders (WhatsApp/SMS/Email)
  
### Patient Management
- 📝 Digital patient records
- 🔔 Customizable reminder templates
- 📊 Appointment analytics dashboard

### Clinic Integration
- ⏰ Configurable business hours
- 📱 Two-way WhatsApp communication
- 📅 Recurring appointment support

## Tech Stack 🛠️

**Frontend**  
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![date-fns](https://img.shields.io/badge/date--fns-2.30-green)](https://date-fns.org/)

**Backend**  
[![Flask](https://img.shields.io/badge/Flask-2.3-red?logo=flask)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com/)

**Integrations**  
[![Twilio](https://img.shields.io/badge/Twilio-WhatsApp-green?logo=twilio)](https://www.twilio.com/whatsapp)

## Installation Guide 💻

### Prerequisites
- Node.js v16+
- Python 3.8+
- MySQL 8.0

### Backend Setup
```bash
# Clone repository
git clone https://github.com/your-repo/healthtrack-reminders.git
cd healthtrack-reminders/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials
```
### Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Here's the cleaned up markdown version of your configuration and documentation sections:

```markdown
## Configuration ⚙️

### Twilio Integration
1. Obtain credentials from [Twilio Console](https://console.twilio.com)
2. Update `backend/.env`:
   ```env
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

### Database Setup
```sql
CREATE DATABASE healthtrack;
GRANT ALL PRIVILEGES ON healthtrack.* TO 'user'@'localhost';
```

## API Documentation 📚

| Endpoint              | Method | Description                      |
|-----------------------|--------|----------------------------------|
| `/api/appointments`   | GET    | Retrieve upcoming appointments   |
| `/api/appointments`   | POST   | Create new appointment           |
| `/twilio/webhook`     | POST   | Handle WhatsApp responses        |

**Sample Appointment Request:**
```json
{
  "patient": {
    "name": "John Doe",
    "phone": "+254712345678"
  },
  "date": "2023-12-15",
  "reason": "Annual checkup"
}
```

## Project Structure 📂

```
healthtrack-reminders/
├── backend/
│   ├── app.py               # Flask application
│   ├── models.py            # Database models
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/                 # React components
│   └── public/              # Static assets
└── docs/                    # Additional documentation
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

## License 📄

This project is licensed under the [MIT License](LICENSE).
```


