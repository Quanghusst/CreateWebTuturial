// public/app.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/students')
        .then(response => response.json())
        .then(data => {
            const studentTableBody = document.getElementById('studentTableBody');
            data.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.age}</td>
                    <td>
                        <button class="deleteBtn" data-id="${student.id}">Delete</button>
                    </td>
                `;
                studentTableBody.appendChild(row);
            });

            document.querySelectorAll('.deleteBtn').forEach(button => {
                button.addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    fetch(`/api/students/${id}`, { method: 'DELETE' })
                        .then(() => location.reload());
                });
            });
        });

    document.getElementById('addStudentBtn').addEventListener('click', function () {
        const name = prompt('Enter student name:');
        const age = prompt('Enter student age:');
        if (name && age) {
            fetch('/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, age })
            }).then(() => location.reload());
        }
    });
});
