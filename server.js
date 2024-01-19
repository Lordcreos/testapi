const express = require('express');
const app = express();
const port = 5000;
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
 // console.log('Headers recibidos:', req.headers, req.query);
  next(); // Continuar al siguiente middleware o ruta
});

app.get('/combo', (req, res) => {
  // Create a new Promise that resolves after 3 seconds (3000 milliseconds)
  new Promise(resolve => setTimeout(resolve, 3000))
    .then(() => {
      // After 3 seconds, send the response as a string
      res.json(
        {success: true, message: 'ok',
          data : 'valor traido del api '}
      ) // Cambiado para retornar un string
    });
});

app.get('/options', (req, res) => {
  // Create a new Promise that resolves after 2 seconds (2000 milliseconds)
  new Promise(resolve => setTimeout(resolve, 3000))
    .then(() => {
      // After 2 seconds, send the response
      res.json({
        data :  [
          { value: "1", label: "Opción 11" },
          { value: "2", label: "Opción 12" },
          // ... más opciones ...
        ]
      });
    });
});

app.get('/clientoptions', (req, res) => {
  // Create a new Promise that resolves after 2 seconds (2000 milliseconds)
  new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      // After 2 seconds, send the response
      res.json({success: true, message: 'ok',
        data :  [
          { value: "1", label: "Opción del cliente  11" },
          { value: "2", label: "Opción del cliente 12" },
          // ... más opciones ...
          
        ]
      });
    });
});
app.post('/clientoptionsprop', (req, res) => {
  const params = req.body;

  console.log('lo que manda el catalgoo', params.fieldValue);
  new Promise(resolve => setTimeout(resolve, 1000))
    .then(() => {
      let response;
      if (params.fieldValue === "1") {
        response = {
          data: [
            { value: "1", label: "Opción del cliente 11" },
            { value: "2", label: "Opción del cliente 12" },
            // ... más opciones ...
          ]
        };
      } else {
        response = {
          data: [
            { value: "1", label: "Opción del cliente 21" },
            { value: "2", label: "Opción del cliente 22" },
            // ... más opciones ...
          ]
        };
      }
      res.json(response);
    });
});


app.post('/next', (req, res) => {
  // Suponiendo que los datos enviados en la solicitud POST son un objeto JSON
  const params = req.body;

  // Hacer un console.log de los parámetros recibidos
  console.log(params);

  // Envía una respuesta al cliente
  res.json({ success: true ,
    message: "Esta es la función NEXT"
} );
});
app.post('/back', (req, res) => {
  // Suponiendo que los datos enviados en la solicitud POST son un objeto JSON
  const params = req.body;

  // Hacer un console.log de los parámetros recibidos
  console.log(params);

  // Envía una respuesta al cliente
  res.json({ success: true ,
    message: "Esta es la función BACk"
} );
});

app.get('/secondoptions/:param', (req, res) => {
  // Obtener el parámetro de la solicitud
  const param = req.params.param;

  // Definir las opciones basadas en el parámetro
  let options;
  if (param === "1") {
    options = [
      { value: "11", label: "Opción 11" },
      { value: "12", label: "Opción 12" },
      { value: "13", label: "Opción 13" }
    ];
  } else if (param === "2") {
    options = [
      { value: "21", label: "Opción 21" },
      { value: "22", label: "Opción 22" },
      { value: "23", label: "Opción 23" }
    ];
  } else {
    // Enviar una respuesta de error si el parámetro no es ni "1" ni "2"
    return res.status(400).json({ error: "Parámetro inválido" });
  }

  // Enviar las opciones como respuesta
  res.json({ data: options });
});



app.get('/dynamicpage', (req, res) => {
  // Create a new Promise that resolves after 2 seconds (2000 milliseconds)
  new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      // After 2 seconds, send the response
      res.json({success: true, message: 'ok',
        data :  [
          {
            uid: uuidv4(),
            type: "containers/BoxContainer",
            ssr: true,
            apiRoute: {
              route: "/combo",
              field: "text",
            },
            components: [
              {
                uid: uuidv4(),
                type: "containers/BoxContainer",
                // apiRoute: {
                //   apiName: "ServerApi",
                //   route: "/combo",
                // },
                ssr: true,
                components: [
                  {
                    uid: uuidv4(),
                    type: "information/Title",
                    ssr: true,
                    // apiRoute: {
                    //   route: "/combo",
                    //   field: "text",
                    // },
                    props: {
                      className: "text-primary",
                      variant: "h6",
                      text: "Titulo h1",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "information/Title",
                    ssr: true,
                    // apiRoute: {
                    //   route: "/combo",
                    //   field: 'text'
                    // },
                    props: {
                      className: "text-primary",
                      variant: "h1",
                      text: "Titulo h1",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "information/Title",
                    ssr: true,
                    apiRoute: {
                      route: "/combo",
                      field: "text",
                    },
                    props: {
                      className: "text-primary",
                      variant: "h1",
                      text: " Error",
                    },
                  },
                ],
                props: {
                  className: "flex flex-col items-start justify-between",
                },
              },
              {
                uid: uuidv4(),
                type: "containers/form/FormContainer",
                category: "form",
                props: {
                  className: "mi-clase-formulario",
                  submitOnEnter: false,
                  defaultValues: {nombre : 'nombre por defecto', text : 'asd@asd.com'},

                  validations : [
                    {
                      id: "text", 
                      validationType: "string",
                      validations: [
                        {
                          type: "email", 
                          params: ["Debe ser un correo electrónico válido"], 
                        },
                
                        {
                          type: "required",
                          params: ["Debes ingresar tu código dactilar."],
                        },
                      ],
                    },
                  ]
                },
                ssr: true,
                components: [
                  {
                    uid: uuidv4(),
                    type: "defaultInput/animatedInput",
                    props: {
                      name: "nombre",
                      label: "Escribe tu nombre",
                      // styles={{
                      //   container: "mi-clase-contenedor",
                      //   input: "mi-clase-input",
                      //   label: "mi-clase-label",
                      //   error: "mi-clase-error"
                      // }}
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/animatedInput",
                    props: {
                      name: "text",
                      type: "text",
                      label: "Escribe tu correo",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/radioButtonInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miOpcionRadio",
                      label: "Elige una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/radioButtonInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miOpcionRadio1",
                      label: "Elige una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/comboBoxInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miSelector",
                      label: "Selecciona una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                      dependsFromField: {
                        miOpcionRadio: {
                          function: "modifyCatalgoField",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                        miOpcionRadio1: {
                          function: "getCatalogData",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                      },
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/radioButtonInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miSelector1",
                      label: "Selecciona una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                      dependsFromField: {
                        miOpcionRadio: {
                          function: "modifyCatalgoField",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                        miOpcionRadio1: {
                          function: "getCatalogData",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                      },
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "button/buttons",
                    props: {
                      label: "REGISTRAR",
                      variant: "destructive",
                      size: "lg",
                      className: "text-white",
                      submitFunctionName: "goToNextPage",
                      type: "submit", // enviar datos al form
                      value: "goToNextPage",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "button/buttons",
                    props: {
                      label: "Atras",
                      variant: "destructive",
                      size: "lg",
                      className: "text-white",
                      submitFunctionName: "goToBackPage",
                      type: "submit", // enviar datos al form
                      value: "goToBackPage", 
                      name: "buttonName",
                    },
                  },
                  // ... otros componentes hijos ...
                ],
              },
            ],
            props: {
              className: "flex flex-col items-start justify-between",
            },
          },
        ]
      });
    });
});

app.post('/dynamicpage', (req, res) => {
  const param = req.body;
  console.log("identificador", param)
  // Create a new Promise that resolves after 2 seconds (2000 milliseconds)
  new Promise(resolve => setTimeout(resolve, 100))
    .then(() => {
      // After 2 seconds, send the response
      res.json({success: true, message: 'ok',
        data :  [
          {
            uid: uuidv4(),
            type: "containers/BoxContainer",
            ssr: true,
            apiRoute: {
              route: "/combo",
              field: "text",
            },
            components: [
              {
                uid: uuidv4(),
                type: "containers/BoxContainer",
                // apiRoute: {
                //   apiName: "ServerApi",
                //   route: "/combo",
                // },
                ssr: true,
                components: [
                  {
                    uid: uuidv4(),
                    type: "information/Title",
                    ssr: true,
                    // apiRoute: {
                    //   route: "/combo",
                    //   field: "text",
                    // },
                    props: {
                      className: "text-primary",
                      variant: "h6",
                      text: "Titulo h1",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "information/Title",
                    ssr: true,
                    // apiRoute: {
                    //   route: "/combo",
                    //   field: 'text'
                    // },
                    props: {
                      className: "text-primary",
                      variant: "h1",
                      text: "Titulo h1",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "information/Title",
                    ssr: true,
                    apiRoute: {
                      route: "/combo",
                      field: "text",
                    },
                    props: {
                      className: "text-primary",
                      variant: "h1",
                      text: " Error",
                    },
                  },
                ],
                props: {
                  className: "flex flex-col items-start justify-between",
                },
              },
              {
                uid: uuidv4(),
                type: "containers/form/FormContainer",
                category: "form",
                props: {
                  className: "mi-clase-formulario",
                  submitOnEnter: false,
                  defaultValues: {nombre : 'nombre por defecto', text : 'asd@asd.com'},

                  validations : [
                    {
                      id: "text", 
                      validationType: "string",
                      validations: [
                        {
                          type: "email", 
                          params: ["Debe ser un correo electrónico válido"], 
                        },
                
                        {
                          type: "required",
                          params: ["Debes ingresar tu código dactilar."],
                        },
                      ],
                    },
                  ]
                },
                ssr: true,
                components: [
                  {
                    uid: uuidv4(),
                    type: "defaultInput/animatedInput",
                    props: {
                      name: "nombre",
                      label: "Escribe tu nombre",
                      // styles={{
                      //   container: "mi-clase-contenedor",
                      //   input: "mi-clase-input",
                      //   label: "mi-clase-label",
                      //   error: "mi-clase-error"
                      // }}
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/animatedInput",
                    props: {
                      name: "text",
                      type: "text",
                      label: "Escribe tu correo",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/radioButtonInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miOpcionRadio",
                      label: "Elige una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/radioButtonInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miOpcionRadio1",
                      label: "Elige una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/comboBoxInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miSelector",
                      label: "Selecciona una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                      dependsFromField: {
                        miOpcionRadio: {
                          function: "modifyCatalgoField",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                        miOpcionRadio1: {
                          function: "getCatalogData",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                      },
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "defaultInput/radioButtonInput",
                    ssr: true,
                    apiRoute: {
                      route: "/options",
                      field: "options",
                    },
                    props: {
                      name: "miSelector1",
                      label: "Selecciona una opción",
                      options: [
                        { value: "valor1", label: "Opción 1" },
                        { value: "valor2", label: "Opción 2" },
                        // ... más opciones ...
                      ],
                      dependsFromField: {
                        miOpcionRadio: {
                          function: "modifyCatalgoField",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                        miOpcionRadio1: {
                          function: "getCatalogData",
                          params: ["param1", "param2"],
                          url: "/options",
                        },
                      },
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "button/buttons",
                    props: {
                      label: "REGISTRAR",
                      variant: "destructive",
                      size: "lg",
                      className: "text-white",
                      submitFunctionName: "goToNextPage",
                      type: "submit", // enviar datos al form
                      value: "goToNextPage",
                    },
                  },
                  {
                    uid: uuidv4(),
                    type: "button/buttons",
                    props: {
                      label: "Atras",
                      variant: "destructive",
                      size: "lg",
                      className: "text-white",
                      submitFunctionName: "goToBackPage",
                      type: "submit", // enviar datos al form
                      value: "goToBackPage", 
                      name: "buttonName",
                    },
                  },
                  // ... otros componentes hijos ...
                ],
              },
            ],
            props: {
              className: "flex flex-col items-start justify-between",
            },
          },
        ]
      });
    });
});
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
