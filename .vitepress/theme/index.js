// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import HeaderButton from './components/HeaderButton.vue'
import HeaderButtonEN from './components/HeaderButtonEN.vue'
import swanbook from './swanbook.vue'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
      app.component('HeaderButton', HeaderButton)
      app.component('HeaderButtonEN', HeaderButtonEN)
      app.component('swanbook', swanbook)
    }
}