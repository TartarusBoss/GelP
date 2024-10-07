async function registerAppliance(event) {
    event.preventDefault();

    const code = document.getElementById('code').value;
    const name = document.getElementById('name').value;
    const state = document.getElementById('state').value;

    try {
        const response = await fetch('/api/appliances/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code, name, state })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('successMessage').innerText = 'Electrodoméstico registrado con éxito.';
            document.getElementById('registerForm').reset();
            listAppliances();  // Actualiza la lista después de registrar
        } else {
            const errorData = await response.json();
            document.getElementById('errorMessage').innerText = errorData.detail || 'Error al registrar el electrodoméstico.';
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Error en la conexión: ' + error;
    }
}

async function searchAppliances() {
    const query = document.getElementById('searchInput').value;

    try {
        const response = await fetch(`/api/appliances/?search=${query}`);

        if (response.ok) {
            const results = await response.json();
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = '';

            results.forEach(appliance => {
                resultsContainer.innerHTML += `<p>${appliance.name} (${appliance.code}) - ${appliance.state}</p>`;
            });
        } else {
            document.getElementById('errorMessage').innerText = 'Error al buscar electrodomésticos.';
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Error en la conexión: ' + error;
    }
}

async function listAppliances() {
    try {
        const response = await fetch('/api/appliances/');

        if (response.ok) {
            const appliances = await response.json();
            const tableBody = document.querySelector('#applianceTable tbody');
            tableBody.innerHTML = '';

            appliances.forEach(appliance => {
                tableBody.innerHTML += `
                    <tr>
                        <td>${appliance.code}</td>
                        <td>${appliance.name}</td>
                        <td>${appliance.state}</td>
                        <td><button onclick="deleteAppliance(${appliance.id})">Eliminar</button></td>
                    </tr>
                `;
            });
        } else {
            document.getElementById('errorMessage').innerText = 'Error al listar electrodomésticos.';
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Error en la conexión: ' + error;
    }
}

async function deleteAppliance(id) {
    try {
        const response = await fetch(`/api/appliances/${id}/`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById('successMessage').innerText = 'Electrodoméstico eliminado con éxito.';
            listAppliances();  // Actualiza la lista después de eliminar
        } else {
            document.getElementById('errorMessage').innerText = 'Error al eliminar el electrodoméstico.';
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'Error en la conexión: ' + error;
    }
}

// Llama a listAppliances en la carga inicial de la página (opcional)
document.addEventListener('DOMContentLoaded', listAppliances);
