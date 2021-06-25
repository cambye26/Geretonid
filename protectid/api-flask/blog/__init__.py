from .views import app
from . import models
import logging
import slugify

models.db.init_app(app)

@app.cli.command('init_db')
def init_db():
    models.init_db()