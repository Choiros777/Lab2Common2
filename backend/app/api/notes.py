from flask import Blueprint, jsonify, request

from app.services.note_service import (
    create_note,
    delete_note,
    get_note,
    list_notes,
    update_note,
)

notes_api = Blueprint(
    "notes_api",
    __name__,
)


@notes_api.get("/notes")
def get_notes():
    search = request.args.get("search", "").strip()

    favorites_only = (
        request.args.get("favorites", "").lower()
        in {"1", "true", "yes"}
    )

    notes = list_notes(
        search=search,
        favorites_only=favorites_only,
    )

    return jsonify([
        note.to_dict()
        for note in notes
    ])


@notes_api.get("/notes/<int:note_id>")
def get_note_by_id(note_id):
    note = get_note(note_id)

    return jsonify(note.to_dict())


@notes_api.post("/notes")
def create_note_endpoint():
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "JSON body must be an object",
        }), 400

    note = create_note(
        title=data.get("title", ""),
        content=data.get("content", ""),
    )

    return jsonify(note.to_dict()), 201


@notes_api.patch("/notes/<int:note_id>")
def update_note_endpoint(note_id):
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "JSON body must be an object",
        }), 400

    note = get_note(note_id)

    try:
        note = update_note(note, data)
    except ValueError as error:
        return jsonify({
            "error": str(error),
        }), 400

    return jsonify(note.to_dict())


@notes_api.delete("/notes/<int:note_id>")
def delete_note_endpoint(note_id):
    note = get_note(note_id)

    delete_note(note)

    return "", 204