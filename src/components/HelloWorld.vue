<template>
  <v-container>
    <v-row>
      <v-container>
        <v-col cols="12" class="text-center">
          <h2>Bienvenida {{usuario | mayuscula}} a tu libro de recetas</h2>
        </v-col>
        <v-row>
          <v-row>
            <v-col cols="12" class=" div-h3 p-2 mt-5 d-flex">
              <div class="ps-2 pt-1">
                <img src="./../../public/img/icons/star_icon60.png" alt="icono estrella">
              </div>
              <h3 color="textoGris">Recetas recomendadas</h3>
            </v-col>
            <v-card
              class="mx-auto my-12"
              max-width="374"
              v-for = "(receta, i) in libroDeCocina" :key="i"
            >
    
            <v-img
              height="250"
              :src="receta.imagen_ruta"
            ></v-img>
    
            <v-card-title>{{receta.nombre | mayusculaPrimeraLetra}}</v-card-title>
    
            <v-card-text>
              <div class="mb-3 text-subtitle-1">
                Receta {{ receta.categoria }}
              </div>   
              <v-row
                align="center"
                class="mx-0"
              >
                <v-btn 
                  @click="darMeGusta(i)"
                  :class="{'megusta' : receta.meGusta}"
                  icon
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
    
                <div class="grey--text ms-4">
                  {{receta.cantMeGusta}}
                </div>
              </v-row>
            </v-card-text>
    
            <v-divider class="mx-4"></v-divider>
    
          <v-card-title>Esta receta lleva</v-card-title>
    
          <v-card-text>
            <v-chip-group              
              column
            >
              <v-chip
                v-for = "(ingrediente, index) in receta.ingredientes" :key="index"
              >
                {{ingrediente.nombre}}
              </v-chip>
    
            </v-chip-group>
          </v-card-text>
    
          <v-card-actions>
    
            <v-btn
                color="secondary"
                dark
                @click.stop="seleccionarReceta(receta)"
              >
                ver más
              </v-btn>
    
            <v-spacer></v-spacer>
            <v-btn 
              @click="quedarmelo(i)"
              :class="{'meloquedo' : receta.guardado}"
              icon
            >
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-card-actions>
            </v-card>
          </v-row>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-row>
            <v-col cols="12" class=" div-h3 p-2 mt-5 d-flex">
              <div class="ps-2 pt-1">
                <img src="./../../public/img/icons/star_icon60.png" alt="icono estrella">
              </div>
              <h3 color="textoGris">Mis Recetas <span v-if="miLibroDeRecetas.length == 0">(Aún no tenes recetas cargadas)</span></h3>
            </v-col>
            <v-card
              class="mx-6 my-12"
              max-width="374"
              v-for = "(receta, i) in miLibroDeRecetas" :key="i"
            >
    
            <v-img
              height="250"
              :src="receta.imagen_ruta"
            ></v-img>
    
            <v-card-title>{{receta.nombre | mayusculaPrimeraLetra}}</v-card-title>
    
            <v-card-text>
              <div class="mb-3 text-subtitle-1">
                Receta {{ receta.categoria }}
              </div>   
              <v-row
                align="center"
                class="mx-0"
              >
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
    
                <div class="grey--text ms-4">
                  {{receta.cantMeGusta}}
                </div>
              </v-row>
            </v-card-text>
    
            <v-divider class="mx-4"></v-divider>
    
          <v-card-title>Encontralo como</v-card-title>
    
          <v-card-text>
            <v-chip-group              
              column
            >
              <v-chip
                v-for = "(ingrediente, index) in receta.ingredientes" :key="index"
              >
                {{ingrediente.nombre}}
              </v-chip>
    
            </v-chip-group>
          </v-card-text>
    
          <v-card-actions>
    
            <v-btn
                color="secondary"
                dark
                @click.stop="seleccionarReceta(receta)"
              >
                ver más
              </v-btn>
    
            <v-spacer></v-spacer>
            <v-btn icon @click="eliminarRecetaPropia(i)">
              <v-icon
                title="Borrar receta"                
              >mdi-delete</v-icon>
            </v-btn>
            <v-btn icon @click="editarReceta(i)">
              <v-icon>mdi-pen</v-icon>
            </v-btn>
          </v-card-actions>
            </v-card> 
          </v-row>
        </v-row>
      </v-container>

      <v-dialog
        v-model="dialog"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5">
            {{ recetaSeleccionada.nombre }}
          </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-card-text>
            <ul>
              <li v-for="(i, index ) in ingredientesSleccionados" :key="index" >
                {{ i.nombre }} - {{ i.cantidad }} - {{ i.unidad }}
              </li>
            </ul>
          </v-card-text>
          <v-card-text>
            {{ recetaSeleccionada.preparacion }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
            color="secondary"
            text
            @click="reiniciarIngredientes()"
          >
            Cerrar
          </v-btn>


          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
  import Swal from 'sweetalert2'
  export default {
    name: 'HelloWorld',

    data(){
      return{
      dialog: false,
      miLibroDeRecetas: [],
      ingredientesSleccionados:[],
      recetaSeleccionada: {},
 libroDeCocina: [
      //        {
      //     nombre:"panqueques",
      //     categoria:"dulce",
      //     cantMeGusta: 145,
      //     ingredientes:[
      //       {nombre:"huevo", cantidad: "3", unidad:"Unidades"},
      //       {nombre:"azúcar Hileret Light", cantidad: "1", unidad:"cucharada"},
      //       {nombre:"lehe", cantidad: "1", unidad:"taza"},
      //       {nombre:"harina 0000", cantidad: "1", unidad:"taza"},
      //       {nombre:"sal", cantidad: "1", unidad:"pizca"}
      //     ],
      //     preparacion: `mezclar los huevos con el azúcar Hileret Light, incorporar la leche y la pizca de sal.
      //     Por último, agregar de a poco la harina para que no se formen grumos.
      //     Poner a calentar en una sartén o panquequera una cucharada de manteca, esparcir por toda la sartén para que el panqueque no se pegue.
      //     Luego agregar la mezcla con un cucharón (la cantidad depende del espesor que te guste) y cocinar hasta que veas que se despegan los bordes y se dora, dar vuelta y terminar la cocción.
      //     Algunas opciones de relleno pueden ser clásico con dulce de leche sin azúcar, mermelada de duraznos light con peras frescas, frutos rojos y todas las que te animes a probar.`,
      //     imagen_ruta: "/img/panqueque.jpg",
      //     alt: "imagen de de panqueques",
      //     meGusta: false,
      //     guardado:false
      //   },

      //   {
      //     nombre:"salsa de hongos de pino",
      //     categoria:"salada",
      //     cantMeGusta: 40,
      //     ingredientes: [
      //       {"nombre": "cebolla", "cantidad": "1", "unidad": "unidad"},
      //       {"nombre": "manteca", "cantidad": "25", "unidad": "gr"},
      //       {"nombre": "aceite", "cantidad": "2", "unidad": "cucharada"},
      //       {"nombre": "harina", "cantidad": "1", "unidad": "cucharada"},
      //       {"nombre": "agua caliente", "cantidad": "1", "unidad": "taza"},
      //       {"nombre": "hongos de pino", "cantidad": "30", "unidad": "gr"},
      //       {"nombre": "perejil", "cantidad": "1", "unidad": "cucharada"},
      //       {"nombre": "jugo de limon", "cantidad": "1", "unidad": "cucharada"},
      //       {"nombre": "sal", "cantidad": "15", "unidad": "gr"},
      //       {"nombre": "pimienta", "cantidad": "1", "unidad": "cucharadita"},
      //       {"nombre": "mostaza", "cantidad": "1", "unidad": "cucharada"}
      //     ],
      //     preparacion: `poner a remojar en la taza de agua los hongos y picar finamente el prejil.
      //     Colocar en una sartén la manteca y el aceite. Cuando estén calientes, dorar la cebolla y agregar la harina; añadir revolver un rato y cuando esté todo cocido, añadir el jugo de limón, los hongos con el agua en que han estado en remojo, el perejil, y dejar cocinar 5 ó 10 minutos; si quedara  muy espesa,, agregar un poco más de caldo o agua.
      //     Nota: Esta salsa es muy rica para acompañar carnes o arroz blanco.
      //     `,
      //     imagen_ruta: "/img/salsa_hongos.jpg",
      //     alt: "imagen ilustrativa de salsa de hongos de pino",
      //     meGusta: false,
      //     guardado: false
      //   }
    ],
      usuario: "mabel",
    }
    },
    methods:{
      actualizarLibroDeRecetas:function (recetario){
        //aca voy a preguntar si hay algo en el local storage y lo actualizo
        this.miLibroDeRecetas = recetario
      },
      seleccionarReceta: function (unaReceta){
        unaReceta.ingredientes.forEach(ing => {
          this.ingredientesSleccionados.push(ing)
        })
        this.recetaSeleccionada = unaReceta;
        this.dialog = true;
        
      },
      reiniciarIngredientes: function (){
        this.ingredientesSleccionados = []
        this.dialog = false
      },
      darMeGusta: function(indice){
        !this.libroDeCocina[indice].meGusta ? this.libroDeCocina[indice].cantMeGusta = this.libroDeCocina[indice].cantMeGusta + 1 : this.libroDeCocina[indice].cantMeGusta = this.libroDeCocina[indice].cantMeGusta - 1
        this.libroDeCocina[indice].meGusta = !this.libroDeCocina[indice].meGusta

        localStorage.setItem('libroDeRecetas', JSON.stringify(this.libroDeCocina));

        
        
      },
      guardarReceta: function(receta){
        let libro = [];
        let jsonMisRecetasGuardadas = localStorage.getItem('misRecetasGuardadas');
        if (jsonMisRecetasGuardadas != undefined){
          libro = JSON.parse(jsonMisRecetasGuardadas)
        }
        libro.push(receta)
        localStorage.setItem('misRecetasGuardadas', JSON.stringify(libro))
      },
      quitarRecetaGuardada: function (receta){
        let libro = JSON.parse(localStorage.getItem('misRecetasGuardadas'))

        if (libro.length == 1){
          libro = []
        }else{
          libro = libro.filter((l) => {return l.nombre != receta.nombre})
        }

        localStorage.setItem('misRecetasGuardadas', JSON.stringify(libro))

      },
      quedarmelo: function(indice){        
        //cambio el estado de guardado
        this.libroDeCocina[indice].guardado = !this.libroDeCocina[indice].guardado
        //actualizo local storage
        localStorage.setItem('libroDeRecetas', JSON.stringify(this.libroDeCocina));
        
        this.libroDeCocina[indice].guardado ? this.guardarReceta(this.libroDeCocina[indice]) : this.quitarRecetaGuardada(this.libroDeCocina[indice])
      },
      eliminarRecetaPropia(indice){
        Swal.fire({
          title: '¿Estas seguro?',
          text: "Queres eliminar esta receta",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#F6E4E3',
          cancelButtonColor: '#775653',
          confirmButtonText: 'Sí, quiero',
          cancelButtonText: 'Mejor no'
        }).then((result) => {
          if (result.isConfirmed) {
            this.confirmarEliminar(indice)
            Swal.fire(
              'Borrado!',
              'La receta fue eliminada.',
              'success'
            )
          }
        })
      },
      confirmarEliminar(indice){
        if (indice == 0){
          this.miLibroDeRecetas.splice(indice, 1)
        }else if (indice == this.miLibroDeRecetas.length){
          this.miLibroDeRecetas.pop();
        }
        this.miLibroDeRecetas.splice(indice, indice)
        localStorage.setItem('miLibroDeRecetas', JSON.stringify(this.miLibroDeRecetas))
      },
      editarReceta(indice){
        
        this.$router.push({ name: "formReceta", params: { id: indice } });
      }
    },
    mounted: function(){ 
      //verificamos si tenemos recetas propias
      let jsonMilibroDeRecetas = localStorage.getItem('miLibroDeRecetas');

      if (jsonMilibroDeRecetas != null || jsonMilibroDeRecetas != undefined){
        let libroDeRecetas = JSON.parse(jsonMilibroDeRecetas)
        this.actualizarLibroDeRecetas(libroDeRecetas)
      }
      //verificamos si hay recetas cargadas en el libro de recetas
      if (localStorage.getItem('libroDeRecetas') != undefined){
        this.libroDeCocina = JSON.parse(localStorage.getItem('libroDeRecetas'))
      }else{
        //si no las hay se las pedimos a la api
        fetch("https://adagio-boatswains.000webhostapp.com/api/recetas.php")
        .then(response => response.json())
        .then(response => { 
          this.libroDeCocina = response
          console.log(response)
        }).catch(err => console.log(err))
      }
    },
    filters:{
      mayuscula:function (value){
        if (!value) return "";
        return value.toUpperCase();
      },
      mayusculaPrimeraLetra: function (texto){
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1)
      }
    }
  }
</script>
<style>
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: #F3F6F9;
    padding: 1rem 0 1rem 1rem;
  }
  .div-h3 {
    background-color: #775653;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  .megusta{
    background-color:pink
  }
  .meloquedo{
    background-color: goldenrod;
  }
</style>