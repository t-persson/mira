from graphene_sqlalchemy import SQLAlchemyObjectType
import graphene
from ..database import db_session
from ..models import ModelRecipe
from ..lib.utils import input_to_dictionary
# from .ingredient import Ingredient
from importlib import import_module


class RecipeAttributes:

    name = graphene.String(description="Name of Recipe")
    steps = graphene.String(description="Steps to take to finish this recipe")
    description = graphene.String(description="Description of the recipe")
    author = graphene.String(description="The author of this recipe")
    tag_id = graphene.List(graphene.ID)
    portions = graphene.Int(description="How many portions does this recipe produce")


class Recipe(SQLAlchemyObjectType, RecipeAttributes):

    ingredients = graphene.List(lambda: import_module('.ingredient', "mira_api.schemas").Ingredient)

    @graphene.resolve_only_args
    def resolve_ingredients(self):
        print(self.ingredients)
        return [ingredient.ingredient for ingredient in self.ingredients]

    class Meta:
        model = ModelRecipe
        interfaces = (graphene.relay.Node,)



class CreateRecipeInput(graphene.InputObjectType, RecipeAttributes):
    pass


class CreateRecipe(graphene.Mutation):
    recipe = graphene.Field(lambda: Recipe, description="Recipe created by this mutation")

    class Arguments:
        input = CreateRecipeInput(required=True)

    def mutate(self, info, input):
        data = input_to_dictionary(input)

        recipe = ModelRecipe(**data)
        db_session.add(recipe)
        db_session.commit()
        return CreateRecipe(recipe=recipe)


class UpdateRecipeInput(graphene.InputObjectType, RecipeAttributes):
    id = graphene.ID(required=True, description="Global ID of the recipe")


class UpdateRecipe(graphene.Mutation):
    recipe = graphene.Field(lambda: Recipe, description="Recipe created by this mutation")

    class Arguments:
        input = CreateRecipeInput(required=True)

    def mutate(self, info, input):
        data = input_to_dictionary(input)

        recipe = db_session.query(ModelRecipe).filter_by(id=data["id"])
        recipe.update(data)
        db_session.commit()
        recipe = db_session.query(ModelRecipe).filter_by(id=data["id"]).first()
        return UpdateRecipe(recipe=recipe)