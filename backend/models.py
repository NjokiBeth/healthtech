
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Patient(db.Model):
    __tablename__ = 'patients'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100))
    
    # MySQL specific index
    __table_args__ = (
        db.Index('idx_phone', 'phone'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'email': self.email
        }

class Appointment(db.Model):
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    reason = db.Column(db.String(200), nullable=False)
    reminder_sent = db.Column(db.Boolean, default=False)
    confirmed = db.Column(db.Boolean, default=False)

    patient = db.relationship('Patient', backref='appointments')
    
    # MySQL specific indexes
    __table_args__ = (
        db.Index('idx_date', 'date'),
        db.Index('idx_patient_date', 'patient_id', 'date'),
    )
    
    def to_dict(self):
        return {
            'id': self.id,
            'patient': self.patient.to_dict(),
            'date': self.date.strftime('%Y-%m-%d'),
            'reason': self.reason,
            'reminder_sent': self.reminder_sent,
            'confirmed': self.confirmed
        }