// Valida los datos ingresados en el formulario antes de enviarlos a la tabla

function validateForm() {
    let nombre = document.getElementById("input-nombre").value;
    let apellido = document.getElementById("input-apellido").value;
    let email = document.getElementById("input-email").value;

    if (nombre === "" || apellido === "" || email === "") {
        alert("Por favor, complete todos los campos");
        return false;
    }
    return true;
}

// Muestra los datos en la tabla

function showData() {
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = [];
     } else {
        usersList = JSON.parse(localStorage.getItem("usersList"));
     }

     var html= "";

     usersList.forEach((user, index) => {
        html += "<tr>";
        html += "<td>" + user.nombre + "</td>";
        html += "<td>" + user.apellido + "</td>";
        html += "<td>" + user.email + "</td>";  
        html += "<td><button class='btn btn-warning' onclick='editData(" + index + ")'>Editar</button></td>";
        html += "<td><button class='btn btn-danger' onclick='deleteData(" + index + ")'>Eliminar</button></td>";
        html += "</tr>";
     });    
     
     document.getElementById("travelers-list").innerHTML = html;
}

//Añade los datos ingresados en el formulario a la tabla

function addData() {
   if (validateForm() == true) {
    let nombre = document.getElementById("input-nombre").value;
    let apellido = document.getElementById("input-apellido").value;
    let email = document.getElementById("input-email").value;

    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = [];
    }else {
        usersList = JSON.parse(localStorage.getItem("usersList"));
    }

    usersList.push({nombre:nombre, apellido:apellido, email:email});

    localStorage.setItem("usersList", JSON.stringify(usersList));
    showData();
    document.getElementById("input-nombre").value = "";
    document.getElementById("input-apellido").value = "";
    document.getElementById("input-email").value = "";
    }
}

// Edita los datos ingresados en la tabla

    function editData(index) {
        document.getElementById('add-btn').style.display = 'none';
        document.getElementById('edit-btn').style.display = 'block';
    
        let usersList;
        if (localStorage.getItem("usersList") === null) {
            usersList = [];
        } else {
            usersList = JSON.parse(localStorage.getItem("usersList"));
        }
        document.getElementById('input-nombre').value = usersList[index].nombre;
        document.getElementById('input-apellido').value = usersList[index].apellido;
        document.getElementById('input-email').value = usersList[index].email;
    
        document.getElementById('edit-btn').onclick = function () {
        if (validateForm ()== true) {
            usersList[index].nombre = document.getElementById('input-nombre').value;
            usersList[index].apellido = document.getElementById('input-apellido').value;
            usersList[index].email = document.getElementById('input-email').value;

            localStorage.setItem("usersList", JSON.stringify(usersList));
            
            showData();
            
            document.getElementById('input-nombre').value = "";
            document.getElementById('input-apellido').value = "";
            document.getElementById('input-email').value = "";
    
            document.getElementById('add-btn').style.display = 'block';
            document.getElementById('edit-btn').style.display = 'none';
        }
    }

}

// Elimina los datos ingresados en la tabla

    function deleteData(index) {
        let usersList;
        if (localStorage.getItem("usersList") === null) {
            usersList = [];
        } else {
            usersList = JSON.parse(localStorage.getItem("usersList"))
        }
        usersList.splice(index, 1);
        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();
        }

    // Carga de los datos de la página
    
    document.onload = showData();