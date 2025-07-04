import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary:   '#0A2C47', // blue 950
          secondary: '#F0F0F0', // silver 100
          info:      '#E3E3E3', // silver 200
          success:   '#F7F7F7', // silver 50
//  الوان المستخدمه في الجدول 
error:  '#D23616', // red

          accent:    '',
          warning:   '#29D5EF', // لبني غامق vip bg
          neutral:   '#333333', // text-black
          lightGray: '#007DC3', // لبني  active bg
          blocked:'#818181',//اللون بتاع ال  inactibve
          rowOdd:'#29B020',// update and new data 
          
        },
      },
    },
  },
})
