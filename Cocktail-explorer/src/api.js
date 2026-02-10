const BASE = "https://www.thecocktaildb.com/api/json/v1/1/"

export async function getRandomCocktail() {
  const r = await fetch(BASE + "random.php")
  const data = await r.json()
  return data.drinks[0]
}

export async function getCocktailById(id) {
  const r = await fetch(BASE + "lookup.php?i=" + id)
  const data = await r.json()
  return data.drinks[0]
}

export async function searchCocktails(query) {
  const r = await fetch(BASE + "search.php?s=" + query)
  const data = await r.json()
  return data.drinks || []
}

export async function getCategories() {
  const r = await fetch(BASE + "list.php?c=list")
  const data = await r.json()
  return data.drinks.map(c => c.strCategory)
}

export async function getCocktailsByCategory(category) {
  const r = await fetch(BASE + "filter.php?c=" + category)
  const data = await r.json()
  return data.drinks || []
}
