from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate

load_dotenv()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://10.10.1.149:5173",
                ],
            },
        },
    )

    from .models import Note
    from .api.notes import notes_api

    app.register_blueprint(notes_api, url_prefix="/api")

    @app.get("/health")
    def health():
        return {
            "status": "ok",
        }

    return app