from .ingredient import ModelIngredient
from .measured_in import ModelMeasuredIn
from .recipe import ModelRecipe
from .tag import ModelTag


def init_db():
    import os
    from mira.backend.database import db_session, engine, db_path
    from mira.backend.database import Base
    if os.path.exists(db_path):
        os.remove(db_path)
    Base.metadata.create_all(engine)

    liter = ModelMeasuredIn("l")
    kilo = ModelMeasuredIn("kg")

    db_session.add(liter)
    db_session.add(kilo)
    db_session.commit()

    tomat = ModelIngredient("tomato", 1, kilo.id)
    biff = ModelIngredient("biff", 5, kilo.id)
    molk = ModelIngredient("milk", 20, liter.id)
    knurf = ModelIngredient("test", 100, liter.id)

    veg = ModelTag("vegetarian")
    boss = ModelTag("boss")
    db_session.add(tomat)
    db_session.add(biff)
    db_session.add(molk)
    db_session.add(knurf)
    db_session.add(veg)
    db_session.add(boss)
    db_session.commit()

    receptet = ModelRecipe(
        "Beef with tomato and milk",
        [tomat.id, biff.id, molk.id],
        "1. Put beef and tomato in pan\n2. Pour milk.",
        "This is a description of the recipe",
        "Receptias",
        [boss.id],
        1
    )


    db_session.add(receptet)
    db_session.commit()
