
const fs = require('fs');

fs.readFile('src/lib/student-data.json', 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading the file:", err);
        return;
    }

    let student_data;
    try {
        student_data = JSON.parse(data);
    } catch (e) {
        console.error("Error parsing JSON:", e);
        return;
    }

    let scholar_ids = {};

    for (const student of student_data) {
        let scholar_id = student.scholarId;
        let name = student.name;
        let sgpa = student.sgpa;
        let cgpa = student.cgpa;

        if (name) {
            name = name.replace(/Μ/g, 'M').replace(/Κ/g, 'K').replace(/Α/g, 'A').replace(/Β/g, 'B');
            student.name = name;
        }

        if (sgpa === "NA" || sgpa === null) {
            student.sgpa = 0.0;
        }
        if (cgpa === "NA" || cgpa === null) {
            student.cgpa = 0.0;
        }
        
        if(typeof student.sgpa === 'string') {
            student.sgpa = parseFloat(student.sgpa) || 0.0;
        }
        if(typeof student.cgpa === 'string') {
            student.cgpa = parseFloat(student.cgpa) || 0.0;
        }


        if (!scholar_ids[scholar_id]) {
            scholar_ids[scholar_id] = student;
        } else {
            let existing_student = scholar_ids[scholar_id];
            if ((existing_student.name === "NA" || existing_student.name === null) && (name !== "NA" && name !== null)) {
                existing_student.name = name;
            }
            if ((existing_student.sgpa === 0.0 || existing_student.sgpa === null) && (sgpa !== 0.0 && sgpa !== null)) {
                existing_student.sgpa = student.sgpa;
            }
            if ((existing_student.cgpa === 0.0 || existing_student.cgpa === null) && (cgpa !== 0.0 && cgpa !== null)) {
                existing_student.cgpa = student.cgpa;
            }
        }
    }

    let final_cleaned_data = Object.values(scholar_ids);

    final_cleaned_data = final_cleaned_data.filter(student => student.name !== 'NA' && student.name !== null);

    final_cleaned_data.sort((a, b) => {
        const idA = a.scholarId.toUpperCase();
        const idB = b.scholarId.toUpperCase();
        if (idA < idB) {
            return -1;
        }
        if (idA > idB) {
            return 1;
        }
        return 0;
    });


    fs.writeFile('src/lib/student-data.json', JSON.stringify(final_cleaned_data, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("File cleaned successfully!");
        }
    });
});
