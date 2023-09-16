import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme:{
    themes:{
      light:{
        primary:'#F6E4E3',
        secondary:'#775653',
        bgRosaLight: '#FFF0EF',
        rosa: '#F0DEDE',
        bgRosa: '#FFF8F7',
        bgColorDark: '#C9ADAD',
        textoGris: '#F3F6F9',
        textoNegro: '#111111'
      }
    }
  }
});
