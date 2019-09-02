from .ingredient import ModelIngredient
from .measured_in import ModelMeasuredIn
from .recipe import ModelRecipe
from .tag import ModelTag


def init_db():
    from mira.backend.database import db_session, engine
    from mira.backend.database import Base
    Base.metadata.create_all(engine)

    liter = ModelMeasuredIn("l")
    kilo = ModelMeasuredIn("kg")

    tomat = ModelIngredient("tomato", 1, kilo, None)
    biff = ModelIngredient("biff", 5, kilo, None)
    molk = ModelIngredient("milk", 20, liter, None)
    knurf = ModelIngredient("test", 100, liter, None)

    veg = ModelTag("vegetarian")
    boss = ModelTag("boss")

    receptet = ModelRecipe(
        "Beef with tomato and milk",
        [tomat, biff, molk],
        "1. Put beef and tomato in pan\n2. Pour milk.",
        "This is a description of the recipe",
        "Receptias",
        [boss],
        1
    )

    db_session.add(liter)
    db_session.add(kilo)
    db_session.add(tomat)
    db_session.add(biff)
    db_session.add(molk)
    db_session.add(knurf)
    db_session.add(veg)
    db_session.add(boss)
    db_session.add(receptet)
    db_session.commit()