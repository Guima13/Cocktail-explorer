import { defineStore } from "pinia"
import {
  getRandomCocktail,
  getCocktailById,
  searchCocktails,
  getCategories,
  getCocktailsByCategory
} from "../api"

export const useCocktailsStore = defineStore("cocktails", {
  state: () => ({
    list: [],
    current: null,
    categories: [],
    loading: false,
    error: null,
    searchQuery: "",
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]")
  }),

  getters: {
    ingredients(state) {
      if (!state.current) return []

      const result = []

      for (let i = 1; i <= 15; i++) {
        const ing = state.current[`strIngredient${i}`]
        const measure = state.current[`strMeasure${i}`]

        if (ing && ing.trim() !== "") {
          result.push({
            ingredient: ing,
            measure: measure || ""
          })
        }
      }

      return result
    },

    isFavorite: (state) => (id) => {
      return state.favorites.includes(id)
    }
  },

  actions: {
    saveFavorites() {
      localStorage.setItem("favorites", JSON.stringify(this.favorites))
    },

    toggleFavorite(id) {
      if (this.favorites.includes(id)) {
        this.favorites = this.favorites.filter(f => f !== id)
      } else {
        this.favorites.push(id)
      }
      this.saveFavorites()
    },

    async loadCategories() {
      this.loading = true
      this.error = null

      try {
        this.categories = await getCategories()
      } catch (e) {
        this.error = "Erro ao carregar categorias"
      }

      this.loading = false
    },

    async loadByCategory(category) {
      this.loading = true
      this.error = null
      this.searchQuery = ""

      try {
        this.list = await getCocktailsByCategory(category)
      } catch (e) {
        this.error = "Erro ao carregar cocktails"
      }

      this.loading = false
    },

    async loadOne(id) {
      this.loading = true
      this.error = null

      try {
        this.current = await getCocktailById(id)
      } catch (e) {
        this.error = "Erro ao carregar detalhes"
      }

      this.loading = false
    },

    async loadRandom() {
      this.loading = true
      this.error = null

      try {
        this.current = await getRandomCocktail()
      } catch (e) {
        this.error = "Erro ao carregar cocktail aleatório"
      }

      this.loading = false
    },

    async search(query) {
      this.loading = true
      this.error = null
      this.searchQuery = query

      try {
        this.list = await searchCocktails(query)
      } catch (e) {
        this.error = "Erro na pesquisa"
      }

      this.loading = false
    }
  }
})
