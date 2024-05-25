const path = require("path");
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
app.listen(3001, () => {
  console.log("El servidor está inicializado en http://localhost:3001/");
});
// Middleware CONVIERTE EN OBJETOS JS ACCECIBLES POR req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //CONFIGURACION MOTOR DE PLANTILLA
app.engine(
  "handlebars",
  exphbs.engine({
    //defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/", // Define el directorio donde se encuentran los archivos de diseño (layouts)
    partialsDir: __dirname + "/views/partials/", //Define el directorio donde se encuentran los archivos parciales (partials)
    helpers: {
      MayusPrimera: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      mensajeBienvenida: function () {
        return 'Bienvenido al mercado WEB, seleccione sus productos';
    }
    },
  })
);

// //PARA UTILIZAR HDB COMO MOTOR DE PLANTILLAS
app.set("view engine", "handlebars");

//ESTATICOS
app.use(express.static("public"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/css_js", express.static("./node_modules/bootstrap/dist/js"));
app.use(
  "/fontawesome",
  express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free")
);
app.get("/", (req, res) => {
  const productos = [
    "banana",
    "cebollas",
    "lechuga",
    "papas",
    "pimenton",
    "tomate",
  ];
  //RENDERIZACION VISTA
  //LA VISTA ES index AHI ESTA RENDERIZADO Dashboard - ARREGLO es productos
  res.render("index", { layout: "main", productos });
});

//RECEPCION DATOS FRONT
app.post("/envio-productos", (req, res) => {
  const productosSeleccionados = req.body.productos;
  console.log("Productos recibidos:", productosSeleccionados);
  //res.json({ message: "Productos recibidos con éxito" });
  res.json(productosSeleccionados);
});
app.get("*", (req, res) => {
  res.render("notFound", { layout: "main" });
});
