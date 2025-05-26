import pytest
from backend import create_app, db
from backend.models import Patient, Appointment
from datetime import datetime, timedelta
import os

@pytest.fixture
def app():
    # Use test database configuration
    os.environ['DATABASE_URL'] = 'mysql+pymysql://root:password@localhost/healthtech_test'
    app = create_app()
    app.config['TESTING'] = True
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

def test_create_appointment(client):
    # Create test patient
    patient = Patient(name="Test User", phone="+1234567890")
    db.session.add(patient)
    db.session.commit()
    
    # Create appointment
    response = client.post('/api/appointments', json={
        'name': 'Test User',
        'phone': '+1234567890',
        'date': (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d'),
        'reason': 'Test appointment'
    })
    
    assert response.status_code == 201
    assert 'id' in response.json