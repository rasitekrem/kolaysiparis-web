import Vuex from 'vuex';
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit(vuexContext,context){
                axios.get("http://localhost:3000/api/")
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