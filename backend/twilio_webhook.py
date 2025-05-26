from datetime import datetime
from flask import request
from backend import app, db
from models import Appointment, Patient
from twilio.twiml.messaging_response import MessagingResponse

@app.route('/twilio/reply', methods=['POST'])
def handle_whatsapp_reply():
    incoming_msg = request.values.get('Body', '').lower()
    from_number = request.values.get('From', '')
    
    # Extract the WhatsApp number (remove 'whatsapp:+')
    phone = from_number.replace('whatsapp:+', '')
    
    patient = Patient.query.filter_by(phone=phone).first()
    resp = MessagingResponse()
    
    if not patient:
        resp.message("Sorry, we don't have your number in our system. Please contact your doctor directly.")
        return str(resp)
    
    if 'confirm' in incoming_msg:
        # Handle appointment confirmation
        upcoming = Appointment.query.filter(
            Appointment.patient_id == patient.id,
            Appointment.date >= datetime.now()
        ).order_by(Appointment.date.asc()).first()
        
        if upcoming:
            upcoming.confirmed = True
            db.session.commit()
            resp.message(f"Your appointment on {upcoming.date.strftime('%B %d')} has been confirmed. Thank you!")
        else:
            resp.message("You don't have any upcoming appointments.")
    
    elif 'reschedule' in incoming_msg:
        # Handle rescheduling logic
        resp.message("Please reply with your preferred new date (YYYY-MM-DD) to reschedule.")
    
    else:
        resp.message("Sorry, I didn't understand that. Please reply with 'confirm' or 'reschedule'.")
    
    return str(resp)