from sqlalchemy import Column, String, Integer
from mira.backend.database import Base


class ModelMeasuredIn(Base):
    __tablename__ = "measured_in"

    id = Column('id', Integer, primary_key=True)
    measurement = Column('measurement', String, unique=True)

    def __init__(self, measurement):
        self.measurement = measurement

    def __repr__(self):
        return str(self.measurement)