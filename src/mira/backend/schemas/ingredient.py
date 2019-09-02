from graphene_sqlalchemy import SQLAlchemyObjectType
import graphene
from mira.backend.models import ModelIngredient


class IngredientAttributes:
    name = graphene.String(description="Name of Ingredient")
    amount = graphene.String(description="Amount of this ingredient")
    measured_in = graphene.String(description="What is this ingredient measured in")
    best_before = graphene.String(description="Best before date")


class Ingredient(SQLAlchemyObjectType, IngredientAttributes):

    class Meta:
        model = ModelIngredient
        interfaces = (graphene.relay.Node,)