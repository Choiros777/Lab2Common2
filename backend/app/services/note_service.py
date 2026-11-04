from sqlalchemy import or_

from app.extensions import db
from app.models import Note


def list_notes(search=None, favorites_only=False):
    statement = db.select(Note)

    if search:
        pattern = f"%{search.strip()}%"

        statement = statement.where(
            or_(
                Note.title.ilike(pattern),
                Note.content.ilike(pattern),
            )
        )

    if favorites_only:
        statement = statement.where(
            Note.is_favorite.is_(True)
        )

    statement = statement.order_by(
        Note.updated_at.desc(),
        Note.id.desc(),
    )

    return db.session.execute(statement).scalars().all()


def get_note(note_id):
    return db.get_or_404(Note, note_id)


def create_note(title="", content=""):
    title = str(title).strip() or "Новая заметка"
    content = str(content)

    note = Note(
        title=title,
        content=content,
    )

    db.session.add(note)
    db.session.commit()

    return note


def update_note(note, data):
    if "title" in data:
        title = str(data["title"]).strip()

        if not title:
            raise ValueError("title cannot be empty")

        if len(title) > 255:
            raise ValueError(
                "title must contain no more than 255 characters"
            )

        note.title = title

    if "content" in data:
        note.content = str(data["content"])

    if "is_favorite" in data:
        if not isinstance(data["is_favorite"], bool):
            raise ValueError(
                "is_favorite must be boolean"
            )

        note.is_favorite = data["is_favorite"]

    db.session.commit()

    return note


def delete_note(note):
    db.session.delete(note)
    db.session.commit()