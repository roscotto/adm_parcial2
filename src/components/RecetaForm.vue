<template>
  <v-container>
    <v-row class="text-center mt-3">
    <v-row >
      <v-card
        class="mx-auto"
        id="card-form"
      >


        <v-card-title class="div-h3">
          <h3>Ingresar Receta</h3>
        </v-card-title>
        <v-divider></v-divider>

        <form class="px-4 pb-4">
          <v-row class="py-4">
            <v-col cols="6">
              <v-text-field
                cols="6"
                v-model="nombreReceta"
                :error-messages="nombreRecetaError"
                label="Nombre de la receta"
                required
                @input="$v.nombreReceta.$touch()"
                @blur="$v.nombreReceta.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                cols="6"
                v-model="selectCategoria"
                :items="categorias"
                :error-messages="selectErrorsCategoria"
                label="Categoria"
                required
                @change="$v.selectCategoria.$touch()"
                @blur="$v.selectCategoria.$touch()"
              ></v-select>
            </v-col>
          </v-row>          
          <v-row class="py-4">
            <v-col cols="12" class="div-h3">
              <h3>Ingredientes</h3>
            </v-col>
            <v-col cols="12" class="ingrediente-col">
              <v-alert
                v-model="alert"
                dismissible
                color="red"
                border="left"
                elevation="2"
                colored-border
                type="error"
                prominent
                icon="mdi-cloud-alert"
              >
                Se debe agregar al menos <strong>3</strong> ingredientes
              </v-alert>
              <ul>
                <li cols="12" v-for="(ing, index) in ingredientes" :key="index">
                  <v-col >{{ ing.nombre }}</v-col>
                  <v-col >{{ ing.cantidad }}</v-col>
                  <v-col >{{ ing.unidades }}</v-col>
                  <v-col >
                    <v-btn 
                      icon
                      @click="borrarIngrediente(index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>

                </li>
              </ul>
            </v-col>
            <v-col cols="4">
              <v-text-field
                cols="6"
                v-model="nombreIngrediente"


                label="Nombre del ingrediente"
                required
    
              ></v-text-field>
              <div class="v-text-field__details" v-if="faltaNombreIngrediente">
                  <div class="v-messages theme--light error--text" role="alert">
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">No te olvides del nombre del ingrediente.</div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <v-text-field
                cols="6"
                v-model="cantidadIngrediente"


                label="Cantidad"
                required

              ></v-text-field>
              <div class="v-text-field__details" v-if="faltaCantidadIngrediente">
                  <div class="v-messages theme--light error--text" role="alert">
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">Te falta la cantidad de ingredientes.</div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4">
              <v-select
                cols="6"
                v-model="selectUnidades"
                :items="unidades"

                label="Unidad"
                required

  
              ></v-select>
              <div class="v-text-field__details" v-if="faltaUnidadIngrediente">
                  <div class="v-messages theme--light error--text" role="alert">
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">Tenes que indicar la unidad de medida.</div>
                  </div>
                </div>
              </div>
            </v-col>

            <v-row class="btn-agregarIngrediente">
              <v-btn
                class="mr-4"            
                color="secondary"
                @click="agregarIngrediente"
              >
                agregar ingrediente
              </v-btn>
            </v-row>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="preparacion"
                :error-messages="preparacionError"                
                name="paracion"
                label="Preparación"
                hint="Escrbí la preparación"
                required
                @change="$v.preparacion.$touch()"
                @blur="$v.preparacion.$touch()"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h2>Subir archivo</h2>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="img"
                show-size
                truncate-length="15"
                @change="subirImagen($event)"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            @click="submit"
            color="secondary"
          >
            Guardar
          </v-btn>
          <v-btn @click="clear" color="secondary">
            Borrar
          </v-btn>
        </form>
      </v-card>
    </v-row>
    </v-row>
  </v-container>
  
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import Swal from 'sweetalert2'

  export default {
    mixins: [validationMixin],
    validations: {
      nombreReceta: { required },
      selectCategoria: { required },
      preparacion: { required },
      
    },
    props: {
      editarReceta:{
        type : Object,
        default: null
      }
    },
    
    name: 'RecetaForm',
    data(){
      return{
        alert: false,
        imagen_receta: null,
        img: null,
        faltaNombreIngrediente: false,
        faltaCantidadIngrediente: false,
        faltaUnidadIngrediente: false,
        submitStatus: null,
        selectCategoria: null,
        selectUnidades: null,
        nombreReceta: "",
        ingredientes: [ ],
        nombreIngrediente: "",
        cantidadIngrediente: "",
        mostrar:true,
        mostrarBoton: false,
        preparacion: "",
        categorias: [
          'Salados',
          'Dulces',
          'Fit',
          'Free Gluten',
        ],

        unidades:[
          "a gusto",
          "kg",
          "Un",
          "gr",
          "lt",
          "ml"
        ],
      }
    }, 
    watch: {
      editarReceta(){
        if(this.editarReceta){
          this.nombreReceta = this.editarReceta.nombre
          this.selectCategoria = this.editarReceta.categoria
          this.preparacion = this.editarReceta.preparacion
          this.ingredientes = this.editarReceta.ingredientes 
        }
      }
    },
    computed: {
      nombreRecetaError() {
        const errors = []
          if (!this.$v.nombreReceta.$dirty) return errors
          !this.$v.nombreReceta.required && errors.push('Se debe ingresar un nombre para la receta.')
          return errors
      },
      selectErrorsCategoria () {
        const errors = []
        if (!this.$v.selectCategoria.$dirty) return errors
        !this.$v.selectCategoria.required && errors.push('La categoría es requerida')
        return errors
      },
      preparacionError() {
        const errors = []
          if (!this.$v.preparacion.$dirty) return errors
          !this.$v.preparacion.required && errors.push('La preparación es importante, no te olvides de agregarla.')
          return errors
      },

    },
    methods:{
      submit () {
        this.$v.$touch()
        if (this.ingredientes.length < 3) this.alert = true
        if (!this.$v.$invalid && !this.alert) this.guardarReceta()
        
      },
      clear () {
        this.$v.$reset()
        this.selectUnidades = ''
        this.nombreReceta = ''
        this.nombreIngrediente = ''
        this.cantidadIngrediente = ''
        this.selectCategoria = null
        this.preparacion = ''
        this.ingredientes = [],
        this.img = null
      },
      agregarIngrediente(){
        this.faltaNombreIngrediente   = !this?.nombreIngrediente   
        this.faltaCantidadIngrediente = !this?.cantidadIngrediente 
        this.faltaUnidadIngrediente   = !this?.selectUnidades      

        if (this.nombreIngrediente && this.cantidadIngrediente && this.selectUnidades){
          let ingrediente = {}
          ingrediente.nombre = this.nombreIngrediente
          ingrediente.cantidad = this.cantidadIngrediente
          ingrediente.unidades = this.selectUnidades
          this.ingredientes.push(ingrediente)

          this.nombreIngrediente   = ""
          this.cantidadIngrediente = ""
          this.selectUnidades      = ""
        }
      },
      borrarIngrediente(indice){
        if (indice == 0){
          this.ingredientes.splice(indice, 1)
        }else if (indice == this.ingredientes.length){
          this.ingredientes.pop();
        }
        this.ingredientes.splice(indice, indice)
      },
      guardarReceta(){
        let receta = {
          nombre: "",
          categoria: "",
          ingredientes: [],
          preparacion: "",
          cantMeGusta: 0,
          imagen_ruta: null,
          alt: "",
        }

        receta.nombre = this.nombreReceta
        receta.categoria = this.selectCategoria
        receta.ingredientes = this.ingredientes
        receta.preparacion = this.preparacion
        receta.alt = "imagen representativa de la receta " + receta.nombre
        if (this.imagen_receta){
          receta.imagen_ruta = this.imagen_receta
        }else{
          receta.imagen_ruta = "/img/receta-predeterminada.jpg"
        }
        this.actualizarLocalStorage(receta)
        Swal.fire(
            'Muy bien!',
            'Tu receta ya fue guardada!',
            'success'
        )
        this.$router.push({ path: "/" })
      },
      actualizarLocalStorage(unaReceta){
        let libroDeRecetas = [];
        let jsonlibroDeRecetas = localStorage.getItem('miLibroDeRecetas');
        if (jsonlibroDeRecetas != undefined){
          libroDeRecetas = JSON.parse(jsonlibroDeRecetas);
        }

        if (this.editarReceta != null){
          libroDeRecetas[this.$route.params.id] = unaReceta
        }else{
          libroDeRecetas.push(unaReceta);
        }
        localStorage.setItem('miLibroDeRecetas', JSON.stringify(libroDeRecetas));

        this.clear()
        this.ingredientes = []
      },
      subirImagen:function (file){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload = (event) => {
          this.imagen_receta = event.target.result
          
        };
      },
    }
  }
</script>
<style scoped>
  #card-form{
    max-width: 80vw;
  }
  .btn-agregarIngrediente{
    padding: 25px;
  }
  
  ul{
    list-style-type:none;
  }
  ul li {
    display: flex;
  }
  
</style>