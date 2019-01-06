export default (context) => {
    context.store.dispatch("getCategories")
    context.store.dispatch("getCarts")
}
