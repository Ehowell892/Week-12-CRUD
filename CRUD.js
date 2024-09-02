async function gettodoList() {
    try {
        var response = await fetch("https://66d600a5f5859a7042681a0c.mockapi.io/To-Do");
        if (!response.ok) {
            throw new Error(response.status);
        }
        var json = await response.json();
        console.log(json);
        displaytododata(json);
    }
    catch (error) {
        console.log(error.message);
    }
}
async function deleteData(id) {
    try {
        var response = await fetch(`https://66d600a5f5859a7042681a0c.mockapi.io/To-Do/${id}`,
            { method: 'DELETE' }
        );
        if (!response.ok) {
            throw new Error(response.status);
        }
        gettodoList();
    }
    catch (error) {
        console.log(error.message);
    }
}
function displaytododata(data) {
    var dataBody = document.querySelector("#table1 tbody");
    dataBody.innerHTML = "";
    data.forEach(element => {
        var row = document.createElement("tr");
        row.innerHTML = `
        <td class='hiddenElement'>${element.id}</td>
        <td>${element.text}</td>
        <td><button class='deleteButton' onclick="deleteData(${element.id})">Delete</button></td>
        `;
        dataBody.appendChild(row);
    });
}
async function addData(text) {
    try {
        var response = await fetch(`https://66d600a5f5859a7042681a0c.mockapi.io/To-Do`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            }
        );
        if (!response.ok) {
            throw new Error(response.status);
        }
        gettodoList();
    }
    catch (error) {
        console.log(error.message);
    }
}
gettodoList();
document.getElementById('form1').addEventListener('submit', function (event) {
    event.preventDefault();
    var text = document.getElementById('text1').value;
    addData(text);
    document.getElementById('form1').reset();
});
