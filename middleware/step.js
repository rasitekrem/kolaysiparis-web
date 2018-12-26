export default (context) => {
    if(context.store.getters.getRestaurantStatus){
        context.redirect("/options")
    }
}