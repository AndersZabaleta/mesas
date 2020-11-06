recibirMesas();
function recibirMesas() {
  fetch("/api/mesas")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let mesas = "";
      for (let i = 0; i < datos.length; i++) {
        mesas += `
            <div>
                <p>Color: ${datos[i].color}</p>
                <p>Tamaño: ${datos[i].tamanyo}</p>
                <p>Patas: ${datos[i].patas}</p>
                <p>Material: ${datos[i].material}</p>
            </div>
        
        `;
      }
      document.getElementById("div1").innerHTML = mesas;
    });
}

function anyadir() {
  const color = document.getElementById("color").value;
  const tamanyo = document.getElementById("tamanyo").value;
  const material = document.getElementById("material").value;
  const patas = document.getElementById("patas").value;

  const mesa = {
    color,
    tamanyo,
    material,
    patas,
  };

  fetch("/api/anyadir", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mesa),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      recibirMesas();
    });
}

function cambiar() {
  const color = document.getElementById("cambiarColor").value;
  fetch(`/api/modificar/${color}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      recibirMesas();
    });
}

function borrar() {
  const patas = document.getElementById("numeroPatas").value;

  fetch(`/api/borrar/${patas}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tamanyo: "3x4", color: "Verde" }),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (patatas) {
      console.log(patatas);
      recibirMesas();
    });
}
