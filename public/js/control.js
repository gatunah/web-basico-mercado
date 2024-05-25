$(document).ready(() => {
  const productosSeleccionados = {};

  //.agregar-producto en partial producto
  $(".agregar-producto").on("click", function (event) {
    event.preventDefault();
    const producto = $(this).attr("id");
    //console.log(productosSeleccionados);

    if (productosSeleccionados[producto]) {
      productosSeleccionados[producto].cantidad++; //SUMA 1 SI YA ESTA
    } else {
      productosSeleccionados[producto] = {//CREA
        nombre: producto,
        cantidad: 1,
      };
    }
    console.log(productosSeleccionados);
    ActualizarCarrito();
  });
  function ActualizarCarrito() {
    //#carrito en partial Carrito
    const carrito = $("#table-body");
    carrito.empty();

    for (const producto in productosSeleccionados) {
      const productos = productosSeleccionados[producto];
      const productoConMayus =
        productos.nombre.charAt(0).toUpperCase() + productos.nombre.slice(1);
      carrito.append(
        `<tr><td>${productoConMayus}</td><td>${productos.cantidad}</td></tr>`
      );
    }
    console.log(productosSeleccionados);
  }
  //#btnConfirmar en partial carrito
  $("#btnConfirmar").on("click", function (event) {
    event.preventDefault();
    if(Object.keys(productosSeleccionados).length === 0){
    alert("No tienes nada en el carrito");
    }else{
    // ENVIAR OBJ AL SERVIDOR
    $.ajax({
      type: "POST",
      url: "/envio-productos",
      data: JSON.stringify({ productos: productosSeleccionados }),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (res) {
        console.log("Productos enviados con éxito:", res);
      },
      error: function (error) {
        console.error("Error al enviar productos:", error);
      },
    });
    funcionamientoModal();
  }});
  $(".pagar").on("click", function (event) {
    alert("Hola :) Aquí no hay nada");
  });
  function funcionamientoModal() {
    $(".modal-body").empty();

    // ITERACION obj
    for (const producto in productosSeleccionados) {
      const productos = productosSeleccionados[producto];
      const img = $(
        `<img src="img/${productos.nombre}.png" class="img-fluid m-2" style="max-height: 120px">`
      );
      const span = $(`<span><b>Cantidad: </b>${productos.cantidad}</span>`);
      $(".modal-body").append(img).append(span);
    }
    $("#exampleModal").modal("show");
  }
});
