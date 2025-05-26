import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.app import app
from backend.models import db, Patient, Appointment
from datetime import datetime, timedelta

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Add sample data
        if not Patient.query.first():
            patient1 = Patient(
                name="John Doe",
                phone="+1234567890",
                email="john@example.com"
            )
            patient2 = Patient(
                name="Jane Smith",
                phone="+1987654321",
                email="jane@example.com"
            )
            
            db.session.add(patient1)
            db.session.add(patient2)
            db.session.commit()
            
            # Add sample appointments
            appointment1 = Appointment(
                patient_id=patient1.id,
                date=datetime.now() + timedelta(days=2),
                reason="Annual checkup",
                reminder_sent=False
            )
            appointment2 = Appointment(
                patient_id=patient2.id,
                date=datetime.now() + timedelta(days=5),
                reason="Follow-up consultation",
                reminder_sent=False
            )
            
            db.session.add(appointment1)
            db.session.add(appointment2)
            db.session.commit()
            
            print("Sample data added successfully!")

if __name__ == '__main__':
    init_db()