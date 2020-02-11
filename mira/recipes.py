"""Mira 2020."""
from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from mira.graphql.queries import RECIPELIST, RECIPE
from mira.graphql.client import GraphqlClient

BLUEPRINT = Blueprint('recipes', __name__)

@BLUEPRINT.route('/')
def index():
    """Index page."""
    client = GraphqlClient("http://localhost:5000/graphql")
    recipelist = client.query(RECIPELIST)
    return render_template('index.html', recipelist=recipelist['recipeList']['edges'])


@BLUEPRINT.route('/recipe/<recipe_id>/', methods = ['GET'])
def view_recipe(recipe_id):
    """Index page."""
    client = GraphqlClient("http://localhost:5000/graphql")
    recipe = client.query(RECIPE % recipe_id)
    return render_template('recipe.html', recipe=recipe['recipe'])
