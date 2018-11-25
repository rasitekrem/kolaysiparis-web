import Vuex from 'vuex';
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            authToken: null,

        },
        mutations: {},
        actions: {
            nuxtServerInit(vuexContext,context){
                // axios.get("/")
                //     .then(response => {
                //         console.log(response)
                //     })
                //     .catch(err => console.log(err))
            }
        },
        getters: {
            getToken(store) {
                return store.authToken
            }
        }
    })
}

export default createStore;