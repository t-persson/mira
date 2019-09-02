from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from mira.backend.database import Base


ingredient_association_table = Table("ingredient_association", Base.metadata,
                          Column('recipe_id', Integer, ForeignKey('recipe.id')),
                          Column('ingredient_id', Integer, ForeignKey('ingredient.id')))

tag_association_table = Table("tag_association", Base.metadata,
                          Column('recipe_id', Integer, ForeignKey('recipe.id')),
                          Column('tag_id', Integer, ForeignKey('tag.id')))

class ModelRecipe(Base):
    __tablename__ = "recipe"

    id = Column('id', Integer, primary_key=True)
    name = Column('name', String, unique=True)
    ingredients = relationship("ModelIngredient",
                               secondary=ingredient_association_table,
                               backref="recipe")
    steps = Column('steps', String)
    description = Column('description', String)
    author = Column('author', String)
    tags = relationship("ModelTag",
                        secondary=tag_association_table,
                        backref="recipe")
    portions = Column('portions', Integer)

    def __init__(self, name, ingredients, steps, description, author, tags, portions):
        self.name = name
        self.ingredients = ingredients
        self.steps = steps
        self.description = description
        self.author = author
        self.tags = tags
        self.portions = portions