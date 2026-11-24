import articleData from '@/assets/article_data.json'

const featured = articleData.featured ?? []
const articles = articleData.articles ?? []
const newArticles = articleData.new_articles ?? []
const adverts = articleData.advert ?? []

const allArticles = [...articles, ...newArticles, ...featured, ...adverts]
const articlesById = new Map(allArticles.map((article) => [article.id, article]))

export function useArticles() {
  function getArticleById(id) {
    return articlesById.get(id) ?? null
  }

  return {
    featured,
    articles,
    newArticles,
    adverts,
    allArticles,
    getArticleById,
  }
}
