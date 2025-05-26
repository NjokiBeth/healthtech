from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from twilio.rest import Client
from datetime import datetime, timedelta
from backend.config import Config
from backend.models import db, Patient, Appointment
import threading

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
#db = SQLAlchemy(app)

# Initialize Twilio client
twilio_client = Client(app.config['TWILIO_ACCOUNT_SID'], app.config['TWILIO_AUTH_TOKEN'])

# Import models after db initialization


@app.route('/api/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.filter(
        Appointment.date >= datetime.now().date()
    ).order_by(Appointment.date.asc()).all()
    return jsonify([appt.to_dict() for appt in appointments])

@app.route('/api/appointments', methods=['POST'])
def create_appointment():
    data = request.json
    patient = Patient.query.filter_by(phone=data['phone']).first()
    
    if not patient:
        patient = Patient(
            name=data['name'],
            phone=data['phone'],
            email=data.get('email')
        )
        db.session.add(patient)
        db.session.commit()
    
    appointment = Appointment(
        patient_id=patient.id,
        date=datetime.strptime(data['date'], '%Y-%m-%d'),
        reason=data['reason'],
        reminder_sent=False
    )
    db.session.add(appointment)
    db.session.commit()
    
    # Schedule reminder
    schedule_reminder(appointment.id)
    
    return jsonify(appointment.to_dict()), 201

def schedule_reminder(appointment_id):
    def send_reminder():
        appointment = Appointment.query.get(appointment_id)
        if appointment and not appointment.reminder_sent:
            message = twilio_client.messages.create(
                body=f"Reminder: You have an appointment on {appointment.date.strftime('%B %d, %Y')} for {appointment.reason}",
                from_='whatsapp:+14155238886',  # Twilio WhatsApp number
                to=f"whatsapp:{appointment.patient.phone}"
            )
            appointment.reminder_sent = True
            db.session.commit()
    
    # Schedule to run one day before appointment
    appointment = Appointment.query.get(appointment_id)
    reminder_time = appointment.date - timedelta(days=1)
    timer = threading.Timer((reminder_time - datetime.now()).total_seconds(), send_reminder)
    timer.start()

@app.route('/twilio/webhook', methods=['POST'])
def twilio_webhook():
    # Handle incoming WhatsApp messages
    from_number = request.form.get('From')
    message_body = request.form.get('Body')
    
    # Process the message (confirmations, rescheduling, etc.)
    # Implementation would go here
    
    return '', 200

if __name__ == '__main__':
    app.run(debug=True)