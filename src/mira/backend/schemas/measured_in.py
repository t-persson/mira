from graphene_sqlalchemy import SQLAlchemyObjectType
import graphene
from mira.backend.models import ModelMeasuredIn


class MeasuredInAttributes:
    measurement = graphene.String(description="Which format is this measured in")


class MeasuredIn(SQLAlchemyObjectType, MeasuredInAttributes):

    class Meta:
        model = ModelMeasuredIn
        interfaces = (graphene.relay.Node,)