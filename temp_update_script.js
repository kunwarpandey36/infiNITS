
const fs = require('fs');

function updateStudentData(filename = "src/lib/student-data.json") {
    fs.readFile(filename, 'utf8', (err, fileContent) => {
        if (err) {
            console.error(err);
            return;
        }

        let data = JSON.parse(fileContent);

        const studentsToUpdate = [
            { "name": "R V Padma Priya", "old_id": "2414034", "new_id": "2412181", "sgpa": 9.85, "cgpa": 9.53 },
            { "name": "Achyut Srivastava", "old_id": "2413057", "new_id": "2412182", "sgpa": 9.23, "cgpa": 9.32 },
            { "name": "Dishank Choudhury", "old_id": "2413069", "new_id": "2412183", "sgpa": 9.54, "cgpa": 9.41 },
            { "name": "Mrinmoy Mazumdar", "old_id": "2415006", "new_id": "2412184", "sgpa": 8.69, "cgpa": 9.12 },
            { "name": "Mohit Seth", "old_id": "2415096", "new_id": "2412185", "sgpa": 9.00, "cgpa": 9.19 },
            { "name": "Bhumi Agarwal", "old_id": "2416071", "new_id": "2412186", "sgpa": 9.38, "cgpa": 9.31 },
            { "name": "Harshit Agarwal", "old_id": "2413119", "new_id": "2412187", "sgpa": 9.54, "cgpa": 9.35 },
            { "name": "Sheetal Kumari", "old_id": "2413149", "new_id": "2412188", "sgpa": 9.62, "cgpa": 9.35 },
            { "name": "Amulya Gunturu", "old_id": "2413146", "new_id": "2412189", "sgpa": 9.54, "cgpa": 9.30 },
            { "name": "Krishna Kumari", "old_id": "2416123", "new_id": "2412190", "sgpa": 9.15, "cgpa": 9.16 },
            { "name": "Abhinav Kumar Singh", "old_id": "2416145", "new_id": "2412191", "sgpa": 9.31, "cgpa": 9.21 },
            { "name": "Prasenjeet Tiwari", "old_id": "2413118", "new_id": "2412192", "sgpa": 9.00, "cgpa": 9.10 },
            { "name": "Pratikshya Barik", "old_id": "2413148", "new_id": "2412193", "sgpa": 9.46, "cgpa": 9.25 },
            { "name": "Olivia Nath", "old_id": "2414052", "new_id": "2412194", "sgpa": 9.77, "cgpa": 9.35 },
            { "name": "Kausthuv Narayan Medhi", "old_id": "2416074", "new_id": "2412195", "sgpa": 9.15, "cgpa": 9.12 },
            { "name": "Vaddipalli Siddhartha Reddy", "old_id": "2416105", "new_id": "2412196", "sgpa": 8.38, "cgpa": 8.88 },
            { "name": "Siddhesh Taraate", "old_id": "2415042", "new_id": "2414165", "sgpa": 9.45, "cgpa": 9.20 },
            { "name": "Antariksa Chetia", "old_id": "2416009", "new_id": "2414166", "sgpa": 8.45, "cgpa": 8.86 },
            { "name": "Bhaskarjyoti Baruah", "old_id": "2416116", "new_id": "2414167", "sgpa": 8.93, "cgpa": 9.01 },
            { "name": "Dwaipayan Das", "old_id": "2415009", "new_id": "2414168", "sgpa": 8.83, "cgpa": 8.96 },
            { "name": "Biraj Saha", "old_id": "2416046", "new_id": "2414169", "sgpa": 9.79, "cgpa": 9.27 },
            { "name": "Sandeep Verma", "old_id": "2416157", "new_id": "2414170", "sgpa": 9.69, "cgpa": 9.24 },
            { "name": "Darpaneni Tippu", "old_id": "2416143", "new_id": "2414171", "sgpa": 8.59, "cgpa": 8.85 },
            { "name": "Nakibul Islam", "old_id": "2413002", "new_id": "2414172", "sgpa": 8.79, "cgpa": 8.9 },
            { "name": "Harsh Raj", "old_id": "2413054", "new_id": "2414173", "sgpa": 8.79, "cgpa": 8.9 },
            { "name": "Gaurav Kumar", "old_id": "2411094", "new_id": "2414174", "sgpa": 8.48, "cgpa": 8.79 },
            { "name": "Ayush Joshi Thayyil", "old_id": "2413139", "new_id": "2414175", "sgpa": 8.79, "cgpa": 8.86 },
            { "name": "Soham Pandey", "old_id": "2416138", "new_id": "2414176", "sgpa": 9.38, "cgpa": 9.04 },
            { "name": "Suryadevara Seshank Manikanta", "old_id": "2413109", "new_id": "2414177", "sgpa": 8.59, "cgpa": 8.74 },
            { "name": "Shruti Kirti", "old_id": "2416041", "new_id": "2414178", "sgpa": 8.24, "cgpa": 8.62 },
            { "name": "Rishav Kumar", "old_id": "2413125", "new_id": "2414179", "sgpa": 9.07, "cgpa": 8.87 },
            { "name": "Satish Kumar Ydav", "old_id": "2415081", "new_id": "2414180", "sgpa": 8.34, "cgpa": 8.6 },
            { "name": "Aman Aditya", "old_id": "2416106", "new_id": "2413166", "sgpa": 8.00, "cgpa": 8.39 },
            { "name": "Ravi Rakshit", "old_id": "2411148", "new_id": "2413167", "sgpa": 7.79, "cgpa": 8.18 },
            { "name": "Nikil", "old_id": "2411145", "new_id": "2413168", "sgpa": 9.03, "cgpa": 8.58 },
            { "name": "Wamika Thakur", "old_id": "2411088", "new_id": "2413169", "sgpa": 8.52, "cgpa": 8.36 },
            { "name": "Yash Gupta", "old_id": "2411093", "new_id": "2413170", "sgpa": 7.79, "cgpa": 8.06 },
            { "name": "Gaurav Kumar", "old_id": "2411122", "new_id": "2413171", "sgpa": 7.83, "cgpa": 8.01 },
            { "name": "Ayushi Gupta", "old_id": "2411090", "new_id": "2413172", "sgpa": 8.10, "cgpa": 8.08 },
            { "name": "Prajukta Kashyap", "old_id": "2411143", "new_id": "2413173", "sgpa": 8.48, "cgpa": 8.18 },
            { "name": "Kaustav Agarwal", "old_id": "2413076", "new_id": "2415101", "sgpa": 8.79, "cgpa": 8.75 },
            { "name": "Aryan Tripathi", "old_id": "2416144", "new_id": "2415102", "sgpa": 7.93, "cgpa": 8.41 },
            { "name": "Darpan Jyoti Goswami", "old_id": "2416008", "new_id": "2415103", "sgpa": 9.14, "cgpa": 8.78 },
            { "name": "Bhargav Raj", "old_id": "2411124", "new_id": "2415104", "sgpa": 9.29, "cgpa": 8.86 },
            { "name": "Bothipi Harshadeep", "old_id": "2416047", "new_id": "2415105", "sgpa": 9.64, "cgpa": 8.93 },
            { "name": "Arunima Singh", "old_id": "2411147", "new_id": "2415106", "sgpa": 8.71, "cgpa": 8.6 },
            { "name": "Ashish Upadhyay", "old_id": "2413129", "new_id": "2415107", "sgpa": 9.29, "cgpa": 8.77 },
            { "name": "Anubhav Anand", "old_id": "2411123", "new_id": "2415108", "sgpa": 9.21, "cgpa": 8.67 },
            { "name": "Dhritinabh Sarmah", "old_id": "2411098", "new_id": "2415109", "sgpa": 8.67, "cgpa": 8.64 },
            { "name": "Param Nagar", "old_id": "2411085", "new_id": "2415110", "sgpa": 9.43, "cgpa": 8.72 }
        ];

        const branchMap = {
            "11": "Civil Engineering",
            "12": "Computer Science and Engineering",
            "13": "Mechanical Engineering",
            "14": "Electronics and Communication Engineering",
            "15": "Electrical Engineering",
            "16": "Electronics and Instrumentation Engineering"
        };

        // Remove old student entries
        studentsToUpdate.forEach(studentUpdate => {
            const oldId = studentUpdate.old_id;
            for (const branch in data.branches) {
                data.branches[branch].students = data.branches[branch].students.filter(s => s.scholarId !== oldId);
            }
        });

        // Add new student entries
        studentsToUpdate.forEach(studentUpdate => {
            const newId = studentUpdate.new_id;
            const branchCode = newId.substring(2, 4);
            const branchName = branchMap[branchCode];

            if (branchName) {
                const newStudent = {
                    "scholarId": newId,
                    "name": studentUpdate.name,
                    "cgpa": studentUpdate.cgpa,
                    "sgpa_curr": studentUpdate.sgpa,
                    "sgpa_prev": 0
                };
                data.branches[branchName].students.push(newStudent);
            }
        });

        fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
}

updateStudentData();
