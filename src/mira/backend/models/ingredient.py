from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from mira.backend.database import Base


class ModelIngredient(Base):
    __tablename__ = "ingredient"

    id = Column('id', Integer, primary_key=True)
    name = Column('name', String)
    amount = Column('amount', Float)
    measured_in_id = Column(Integer, ForeignKey("measured_in.id"))
    measured_in = relationship("ModelMeasuredIn", backref="ingredient")
    best_before = Column('best_before', DateTime, nullable=True)

    def __init__(self, name, amount, measured_in, best_before):
        self.name = name
        self.amount = amount
        self.measured_in = measured_in
        self.best_before = best_before