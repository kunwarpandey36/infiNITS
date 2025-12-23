'''
import json

with open('src/lib/student-data.json', 'r') as f:
    student_data = json.load(f)

for student in student_data:
    scholar_id = student.get("scholarId")
    if scholar_id and scholar_id.isnumeric() and len(scholar_id) > 2:
        try:
            year_prefix = int(scholar_id[:2])
            if 22 <= year_prefix < 99:
                new_year_prefix = year_prefix + 1
                new_scholar_id = str(new_year_prefix) + scholar_id[2:]
                student["scholarId"] = new_scholar_id
        except ValueError:
            pass

with open('src/lib/student-data.json', 'w') as f:
    json.dump(student_data, f, indent=2)

print("Scholar IDs updated successfully.")
'''