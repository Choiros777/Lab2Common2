from datetime import datetime, timezone

from app.extensions import db


def utc_now():
    return datetime.now(timezone.utc)


class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    title = db.Column(
        db.String(255),
        nullable=False,
        default="Новая заметка",
    )

    content = db.Column(
        db.Text,
        nullable=False,
        default="",
    )

    is_favorite = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=utc_now,
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=utc_now,
        onupdate=utc_now,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "is_favorite": self.is_favorite,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }