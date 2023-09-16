<template>
  <div>
  <receta-form
    :editarReceta="editarReceta"
  ></receta-form>

</div>
</template>

<script>
  import RecetaForm from '../components/RecetaForm.vue'

  export default {
    name: 'CargarRecetaView',

    components: {
      RecetaForm,
    },
    props:{
      
    },
    data(){
      return{
        editarReceta: null,
      }
    },
    mounted: function(){
      //si me llega por parametro un id para editar lo busco en mi libro de recetas y lo envio como una prop
      if (this.$route.params.id != undefined){
        let misRecetas = JSON.parse(localStorage.getItem('miLibroDeRecetas'))
        this.editarReceta = misRecetas[this.$route.params.id]

      }

    }
  }
</script>