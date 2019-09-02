from graphene_sqlalchemy import SQLAlchemyObjectType
import graphene
from mira.backend.models import ModelRecipe


class RecipeAttributes:

    name = graphene.String(description="Name of Recipe")
    ingredient_id = graphene.ID(description="id")
    steps = graphene.String(description="Steps to take to finish this recipe")
    description = graphene.String(description="Description of the recipe")
    author = graphene.String(description="The author of this recipe")
    tag_id = graphene.String(description="Tags for this recipe")
    porition = graphene.String(description="How many portions does this recipe produce")


class Recipe(SQLAlchemyObjectType, RecipeAttributes):

    class Meta:
        model = ModelRecipe
        interfaces = (graphene.relay.Node,)