const fs = require('fs');

const filePath = 'src/lib/student-data.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  try {
    const students = JSON.parse(data);

    const updatedStudents = students.map(student => {
      let newName = student.name.trim();
      if (newName.toLowerCase() === 'swagatam') {
        newName = 'Swagatamji';
      } else {
        if (newName.toLowerCase().endsWith(' ji')) {
          newName = newName.slice(0, -3);
        } else if (newName.toLowerCase().endsWith('ji')) {
          newName = newName.slice(0, -2);
        }
      }
      return { ...student, name: newName };
    });

    fs.writeFile(filePath, JSON.stringify(updatedStudents, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing file: ${writeErr}`);
      } else {
        console.log('File updated successfully.');
      }
    });
  } catch (parseErr) {
    console.error(`Error parsing JSON: ${parseErr}`);
  }
});