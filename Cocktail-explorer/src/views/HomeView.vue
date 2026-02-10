<template>
  <div>

    <h1>Cocktails</h1>

    <div class="toolbar">

      <select
        v-model="selectedCategory"
        @change="changeCategory"
        :disabled="store.searchQuery !== ''"
      >
        <option v-for="c in store.categories" :key="c" :value="c">
          {{ c }}
        </option>
      </select>

      <span v-if="store.searchQuery !== ''">(pesquisa ativa)</span>

      <input
        v-model="searchText"
        @keyup.enter="doSearch"
        placeholder="Pesquisar por nome..."
      >

      <button @click="doSearch">Pesquisar</button>

      <button v-if="store.searchQuery !== ''" @click="clearSearch">
        Limpar
      </button>

    </div>

    <div class="indicator">
      <span v-if="store.searchQuery === ''">
        Categoria: {{ selectedCategory }} ({{ store.list.length }} cocktails)
      </span>

      <span v-else>
        Resultados para "{{ store.searchQuery }}" ({{ store.list.length }} encontrados)
      </span>
    </div>

    <div v-if="store.loading">A carregar...</div>

    <div v-else-if="store.error">
      {{ store.error }}
    </div>

    <div v-else-if="store.list.length === 0">
      Nenhum cocktail encontrado.
    </div>

    <div v-else class="grid">
      <div
        v-for="c in store.list"
        :key="c.idDrink"
        class="card"
        @click="goDetail(c.idDrink)"
      >
        <img :src="c.strDrinkThumb" alt="" />
        <h3>{{ c.strDrink }}</h3>

        <button
          class="fav-btn"
          @click.stop="store.toggleFavorite(c.idDrink)"
        >
          {{ store.isFavorite(c.idDrink) ? "★" : "☆" }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { useCocktailsStore } from "../stores/cocktails"
import { useRouter } from "vue-router"

export default {
  data() {
    return {
      selectedCategory: "",
      searchText: ""
    }
  },

  setup() {
    const store = useCocktailsStore()
    const router = useRouter()
    return { store, router }
  },

  async mounted() {
    await this.store.loadCategories()
    this.selectedCategory = this.store.categories[0]
    this.store.loadByCategory(this.selectedCategory)
  },

  methods: {
    changeCategory() {
      this.store.loadByCategory(this.selectedCategory)
    },

    doSearch() {
      if (this.searchText.trim() === "") return
      this.store.search(this.searchText)
    },

    clearSearch() {
      this.searchText = ""
      this.store.searchQuery = ""
      this.store.loadByCategory(this.selectedCategory)
    },

    goDetail(id) {
      this.router.push(`/cocktail/${id}`)
    }
  }
}
</script>

<style>
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.card {
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  background: #f3f3f3;
  text-align: center;
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
