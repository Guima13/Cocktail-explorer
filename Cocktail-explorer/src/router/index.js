import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CocktailDetailView from '../views/CocktailDetailView.vue'
import RandomCocktailView from '../views/RandomCocktailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/cocktail/:id', component: CocktailDetailView },
  { path: '/random', component: RandomCocktailView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
