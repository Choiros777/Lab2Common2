import { useState } from "react";

type StudentPhoto = {
  src: string;
  lastName: string;
  firstName: string;
  group: string;
};

const photos: StudentPhoto[] = [
  {
    src: "/assets/photos/Liza.jpg",
    lastName: "Жукова",
    firstName: "Елизавета",
    group: "К3261",
  },
  {
    src: "/assets/photos/Dasha.jpg",
    lastName: "Яковлева",
    firstName: "Дарья",
    group: "К3261",
  },
  {
    src: "/assets/photos/Katya.jpg",
    lastName: "Романова",
    firstName: "Екатерина",
    group: "К3261",
  },
  {
    src: "/assets/photos/Vika.jpg",
    lastName: "Анисимова",
    firstName: "Виктория",
    group: "К3262",
  },
];

export function PhotoStack() {
  const [activeStudent, setActiveStudent] =
    useState<StudentPhoto | null>(null);

  return (
    <>
      <div className="photo-stack" aria-label="Студенты">
        {photos.map((student, index) => (
          <button
            key={student.src}
            type="button"
            className="photo-stack-button"
            style={{
              zIndex: photos.length - index,
            }}
            onMouseEnter={() => setActiveStudent(student)}
            onMouseLeave={() => setActiveStudent(null)}
            onFocus={() => setActiveStudent(student)}
            onBlur={() => setActiveStudent(null)}
            aria-label={`${student.lastName} ${student.firstName}, группа ${student.group}`}
          >
            <img
              className="photo-stack-item"
              src={student.src}
              alt=""
            />
          </button>
        ))}
      </div>

      {activeStudent && (
        <div className="photo-preview">
          <img
            src={activeStudent.src}
            alt={`${activeStudent.lastName} ${activeStudent.firstName}`}
          />

          <div className="photo-preview-info">
            <div className="photo-preview-name">
              {activeStudent.lastName}{" "}
              {activeStudent.firstName}
            </div>

            <div className="photo-preview-group">
              Группа: {activeStudent.group}
            </div>
          </div>
        </div>
      )}
    </>
  );
}