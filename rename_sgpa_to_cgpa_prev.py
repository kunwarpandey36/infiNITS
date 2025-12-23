
import json

def modify_student_data(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    for student in data:
        if 'sgpa' in student:
            student['cgpa_prev'] = student.pop('sgpa')
            
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    modify_student_data('src/lib/student-data.json')
