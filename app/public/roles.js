
        // Obtener lista de usuarios
        async function cargarUsuarios() {
            const res = await fetch("/api/usuarios");
            const usuarios = await res.json();

            const tabla = document.getElementById("usuarios-lista");
            tabla.innerHTML = usuarios.map(usuario => `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.user}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.role}</td>
                    <td>
                        <button onclick="actualizarRol(${usuario.id}, 'vista')">Hacer colaborador</button>
                        <button onclick="actualizarRol(${usuario.id}, 'user')">Hacer Usuario</button>
                    </td>
                </tr>
            `).join("");
        }

async function actualizarRol(id, role) {
    const res = await fetch(`/api/usuarios/${id}/role`, {
        method: "PUT",
            headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role })
            });

            if (res.ok) {
                alert("Rol actualizado");
                cargarUsuarios();
            } else {
                alert("Error al actualizar rol");
            }
        }

        // Cargar usuarios al cargar la página
        cargarUsuarios();
    