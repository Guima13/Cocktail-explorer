<template>
  <div>

    <h1>Cocktail Aleatório</h1>

    <button @click="loadAnother">Descobrir Outro</button>

    <div v-if="store.loading">A carregar...</div>

    <div v-else-if="store.error">
      {{ store.error }}
    </div>

    <div
      v-else-if="store.current"
      class="card"
      @click="goDetail(store.current.idDrink)"
    >
      <img :src="store.current.strDrinkThumb" alt="">
      <h2>{{ store.current.strDrink }}</h2>

      <button
        class="fav-btn"
        @click.stop="store.toggleFavorite(store.current.idDrink)"
      >
        {{ store.isFavorite(store.current.idDrink) ? "★" : "☆" }}
      </button>
    </div>

  </div>
</template>

<script>
import { useCocktailsStore } from "../stores/cocktails"
import { useRouter } from "vue-router"

export default {
  setup() {
    const store = useCocktailsStore()
    const router = useRouter()
    return { store, router }
  },

  mounted() {
    this.store.loadRandom()
  },

  methods: {
    loadAnother() {
      this.store.loadRandom()
    },

    goDetail(id) {
      this.router.push(`/cocktail/${id}`)
    }
  }
}
</script>

<style>
.card {
  margin-top: 20px;
  padding: 16px;
  border-radius: 8px;
  background: #f3f3f3;
  text-align: center;
  cursor: pointer;
  width: 260px;
  position: relative;
}

.card img {
  width: 100%;
  border-radius: 8px;
}

.fav-btn {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
