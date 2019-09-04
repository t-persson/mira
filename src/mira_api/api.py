from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
import graphene
from .schemas.query import Query
from .schemas.mutation import Mutation
from .database import db_session

APP = Flask(__name__)
CORS(APP)
SCHEMA = graphene.Schema(query=Query, mutation=Mutation)
APP.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=SCHEMA, graphiql=True)
)


@APP.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()