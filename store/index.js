import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit(vuexContext,context){
                context.$axios.get("/test")
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => console.log(err))
            }
        },
        getters: {}
    })
}

export default createStore;