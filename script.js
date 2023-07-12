function addData(event) {
    event.preventDefault();
    let nombre = document.getElementById("input-nombre").value;
    let apellido = document.getElementById("input-apellido").value;
    let email = document.getElementById("input-email").value;

    if (nombre === "" || apellido === "" || email === "") {
        //alert("Por favor ingrese todos los datos");
        return;
    }
    
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = [];
     } else {
        usersList = JSON.parse(localStorage.getItem("usersList"));
     }
        usersList.push({nombre, apellido, email});
        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();
}

function showData() {
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = [];
     } else {
        usersList = JSON.parse(localStorage.getItem("usersList"));
     }
     let tableBody = document.getElementById("travelers-list");
     tableBody.innerHTML = "";
     for (let i = 0; i < usersList.length; i++) {
         let nombre = usersList[i].nombre;
         let apellido = usersList[i].apellido;
         let email = usersList[i].email;
         tableBody.innerHTML += `
         <tr>
            <td>${nombre}</td>
            <td>${apellido}</td>
            <td>${email}</td>
            <td><button class="btn btn-warning" onclick="editData(${i})">Editar</button></td>
            <td><button class="btn btn-danger" onclick="deleteData(${i})">Eliminar</button></td>
         </tr>
         `;
     }
    }

    function editData(index) {
        document.getElementById('add-btn').style.display = 'none';
        document.getElementById('edit-btn').style.display = 'block';
    
        let usersList;
        if (localStorage.getItem("usersList") === null) {
            usersList = []
        } else {
            usersList = JSON.parse(localStorage.getItem("usersList"))
        }
        document.querySelector('#input-nombre').value = usersList[index].nombre;
        document.querySelector('#input-apellido').value = usersList[index].apellido;
        document.querySelector('#input-email').value = usersList[index].email;
    
        document.getElementById('edit-btn').onclick = function () {
            usersList[index].nombre = document.querySelector('#input-nombre').value
            usersList[index].apellido = document.querySelector('#input-apellido').value
            usersList[index].email = document.querySelector('#input-email').value
    
            localStorage.setItem("usersList", JSON.stringify(usersList));
            showData();
            document.querySelector('#input-nombre').value = ""
            document.querySelector('#input-apellido').value = ""
            document.querySelector('#input-email').value = ""
    
            document.getElementById('add-btn').style.display = 'block';
            document.getElementById('edit-btn').style.display = 'none';
        }

    }
document.onload = showData();