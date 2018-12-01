import Vuex from 'vuex';

const createStore = () => {
    return new Vuex.Store({
        state: {
            authToken: null,
        },
        mutations: {},
        actions: {
            nuxtServerInit(vuexContext,context){
                // context.$axios.post('register',{ username: 'testet', password: '12341'})
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
