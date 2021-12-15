let items = {
  "1": [3, "Arroz Chino - Especial de la Casa"],
  "2": [300, "Arroz Chino - Muzarella Grande"],
  "3": [250, "Arroz Chino - Muzarella y Jamon Chica"],
  "4": [350, "Arroz Chino - Muzarella y Jamon Grande"],
  "5": [375, "Arroz Chino - Americana Chica"],
  "6": [450, "Arroz Chino - Americana Grande"],
  "7": [350, "Arroz Chino - Verdura Chica"],
  "8": [415, "Arroz Chino - Verdura Grande"]
};


let index = (function () {
  return {
    init: function () {
      console.log(items);
      this.cacheDom();
      this.bindEvents();
      this.setVariables();
      this.setPrecios();
      this.btnSumarRestar();
    },

    cacheDom: function () {
      this.btnMas = document.querySelectorAll(".selector__mas");
      this.inputs = document.querySelectorAll(".item__input");
      this.btnMenos = document.querySelectorAll(".selector__menos");
      this.montoTotalElement = document.getElementById("monto-total-index");
      this.btnSubmit = document.getElementById("btn__submit");
      this.datosPersonales = document.querySelectorAll(".datos-personales__input");
    },
    bindEvents: function () {
      this.btnSubmit.addEventListener("click", this.submitEvent.bind(this));
    },
    setVariables: function () {
      this.items = items;
      this.montoTotal = 0;
    },
    submitEvent: function () {
      this.submitFilter();
      test.sayTest();

    },
    submitFilter: function () {
      for (let i = 0; i < this.inputs.length; i++) {
        if (!(this.inputs[i].value)) {
          this.inputs[i].disabled = true;
        }
      }
      for (let i = 0; i < this.datosPersonales.length; i++) {
        if (!(this.datosPersonales[i].value)) {
          this.datosPersonales[i].disabled = true;
        }
      }
    },
    setPrecios: function () {
      this.precios = [];
      for (let propiedad in this.items) {
        this.precios.push(this.items[propiedad][0]);
      }
    },
    montoTotalSumar: function () {
      this.montoTotal += this.precios[this.index];
      this.montoTotalElement.innerHTML = this.montoTotal;
    },
    montoTotalRestar: function () {
      this.montoTotal -= this.precios[this.index];
      this.montoTotalElement.innerHTML = this.montoTotal;
    },
    btnSumar: function () {
      if (this.cont[this.index] < 99) {
        this.cont[this.index] += 1;
        this.inputs[this.index].value = this.cont[this.index];
        this.montoTotalSumar();
      }
    },
    btnRestar: function () {
      if (this.cont[this.index] > 0) {
        this.cont[this.index] -= 1;
        this.inputs[this.index].value = this.cont[this.index];
        this.montoTotalRestar();
      }
    },
    btnSumarRestar: function () {
      let cont = [];
      //generar array cont
      for (let i = 0; i < this.inputs.length; i++) {
        cont[i] = 0;
      };
      //agregar event listener a todos  los botones
      for (let index = 0; index < this.inputs.length; index++) {
        //sumar
        this.btnMas[index].addEventListener("click", () => {
          this.index = index;
          this.cont = cont;
          this.btnSumar();
        });
        //restar
        this.btnMenos[index].addEventListener("click", () => {
          this.index = index;
          this.cont = cont;
          this.btnRestar();
        });
      }
    },
  };
})();



let ticket = (function () {
  return {
    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.setVariables();
      this.setArticulosSeleccionados();
      this.setPerosnalData();
    },
    cacheDom: function () {
      this.articulos = document.getElementById("articulos-seleccionados");
      this.montoTotal = document.getElementById("monto-total");
      this.btnEnviarPedido = document.getElementById("btn-enviar-pedido");
    },
    bindEvents: function () {
      this.btnEnviarPedido.addEventListener("click", this.enviarPedido.bind(this));
    },
    setVariables: function () {
      this.items = items;
      this.montoTotalContainer = 0;
      this.formInputs = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    },
    setMontoTotal: function (item, itemsCantidad) {
      this.montoTotalContainer += this.items[item][0] * itemsCantidad;
      this.montoTotal.innerHTML = this.montoTotalContainer;
    },
    setArticulosSeleccionados: function () {
      for (let item in this.items) {
        if (this.getParameterByName(item)) {
          let itemsCantidad = this.getParameterByName(item),
            articuloSum = document.createElement("p");
          this.articulos.appendChild(articuloSum);
          articuloSum.innerHTML = this.items[item][1] + " - " + "X " + itemsCantidad;
          this.setMontoTotal(item, itemsCantidad);
        }
      }
    },
    getParameterByName: function (name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    setPerosnalData: function () {
      this.formInputs.forEach((element) => {
        document.getElementById("txt-" + element).innerHTML = this.getParameterByName(element);
      });
    },
    enviarPedido: function () {
      let
        numeroWhatsapp = "584263839180",
        link = "https://wa.me/" + numeroWhatsapp + "?text=",
        urlPedido = window.location.href,
        encode = encodeURIComponent(urlPedido),
        textoAEnviar = link + encode;
      window.open(textoAEnviar, "Whatsapp");
    }
  };
})();