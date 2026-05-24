const results = [
    { rank: 1, name: "Ameen", category: "HS", school: "GHSS Kozhikode", grade: "A+", points: 5 },
    { rank: 2, name: "Fathima", category: "HSS", school: "St Mary's School", grade: "A+", points: 5 },
    { rank: 3, name: "Rahul", category: "UP", school: "Modern School", grade: "A", points: 3 },
    { rank: 4, name: "Shamil", category: "HS", school: "Govt School", grade: "A", points: 3 },
    { rank: 5, name: "Anu", category: "UP", school: "Central School", grade: "B+", points: 1 }
];

const tableBody = document.querySelector("#resultTable tbody");
const searchInput = document.getElementById("searchInput");

function displayData(data) {
    tableBody.innerHTML = "";

    data.forEach(student => {
        let row = `
            <tr>
                <td>${student.rank}</td>
                <td>${student.name}</td>
                <td>${student.category}</td>
                <td>${student.school}</td>
                <td>${student.grade}</td>
                <td>${student.points}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = results.filter(student =>
        student.name.toLowerCase().includes(value)
    );
    displayData(filtered);
});

displayData(results);
