from graphene_sqlalchemy import SQLAlchemyObjectType
import graphene
from mira.backend.models import ModelTag


class TagAttributes:
    name = graphene.String(description="Name of tag")


class Tag(SQLAlchemyObjectType, TagAttributes):

    class Meta:
        model = ModelTag
        interfaces = (graphene.relay.Node,)