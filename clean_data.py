
import json

with open('src/lib/student-data.json', 'r') as f:
    student_data = json.load(f)

cleaned_data = []
scholar_ids = {}

for student in student_data:
    scholar_id = student.get('scholarId')
    name = student.get('name')
    sgpa = student.get('sgpa')
    cgpa = student.get('cgpa')

    # Fix strange characters in names
    if name:
        name = name.replace('Μ', 'M').replace('Κ', 'K').replace('Α', 'A').replace('Β', 'B')
        student['name'] = name

    # Convert "NA" to 0.0 for sgpa and cgpa
    if sgpa == "NA":
        student['sgpa'] = 0.0
    if cgpa == "NA":
        student['cgpa'] = 0.0

    # Handle duplicates
    if scholar_id not in scholar_ids:
        scholar_ids[scholar_id] = student
    else:
        # If a duplicate is found, merge the data, prioritizing the most complete record
        existing_student = scholar_ids[scholar_id]
        if existing_student.get('name') == "NA" and name != "NA":
            existing_student['name'] = name
        if existing_student.get('sgpa') == 0.0 and sgpa != 0.0:
            existing_student['sgpa'] = sgpa
        if existing_student.get('cgpa') == 0.0 and cgpa != 0.0:
            existing_student['cgpa'] = cgpa

# Filter out students with name "NA" if a student with the same scholarId and a valid name exists
final_cleaned_data = []
processed_ids = set()
for scholar_id, student in scholar_ids.items():
    if student['name'] != 'NA':
        final_cleaned_data.append(student)
        processed_ids.add(scholar_id)

for scholar_id, student in scholar_ids.items():
    if scholar_id not in processed_ids:
        final_cleaned_data.append(student)

with open('src/lib/student-data.json', 'w') as f:
    json.dump(final_cleaned_data, f, indent=2)
