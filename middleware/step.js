export default (context) => {
    context.store.dispatch("checkRestaurantStep")
        .then(response => {
            if(context.store.getters.getRestaurantStatus){
                context.redirect("/options")
            } 
        })  
}