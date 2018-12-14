import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            authKey: null,
            orders: [],
            tables: []
        },
        mutations: {
            setAuthKey(state,authKey) {
                state.authKey = authKey
            },
            clearAuthKey(state) {
                Cookie.remove("authKey");
                Cookie.remove("expiresIn");
                if (process.client) {
                 localStorage.removeItem("authKey")
                 localStorage.removeItem("expiresIn")
                }
                state.authKey = null;
            }
        },
        actions: {
            nuxtServerInit(vuexContext,context){
               
            },
            initAuth(vuexContext, req) {
                let token;
                let expiresIn;
                if(req) {
                    // server side
                    if (!req.headers.cookie) {
                        return 
                    }
                    //cookie üzerinden token elde etmek
                     token = req.headers.cookie.split(";").find(c => c.trim().startsWith("authKey="));
                    if (token) {
                        token = token.split("=")[1];
                    }
                    expiresIn = req.headers.cookie.split(";").find(e => e.trim().startsWith("expiresIn="));
                    if (expiresIn) {
                        expiresIn = expiresIn.split("=")[1];
                    }
                } else {
                    // client üzerinde çalışıyoruz
                    token = localStorage.getItem("authKey");
                    expiresIn = localStorage.getItem("expiresIn");
                    
                }
                if(new Date().getTime() > +expiresIn || !token){
                    vuexContext.commit("clearAuthKey")
                }
                vuexContext.commit("setAuthKey",token)
            },
            authUser(vuexContext,authData) {
                let authLink = "/register";
                if (authData.isUser) {
                  authLink = "/authenticate"
                  return this.$axios.post(authLink, 
                    { email: authData.user.email, password: authData.user.password })
                      .then(response => {
                        Cookie.set("authKey", response.data.idToken);
                        vuexContext.commit("setAuthKey",response.data.idToken)
                      })
                } 
                return this.$axios.post(authLink, 
                    { 
                        email: authData.user.email, 
                        password: authData.user.password,
                        restaurantName: authData.user.restaurantName 
                    })
                      .then(response => {
                        Cookie.set("authKey", response.data.idToken);
                        vuexContext.commit("setAuthKey",response.data.idToken)
                      })  
            },
            logout(vuexContext){
                return vuexContext.commit("clearAuthKey")
            },
            checkUser(vuexContext,data) {
                console.log(data.email);
                
                return this.$axios.post('/checkuser',{ data: { email: data.email } })
                    .then(response => {
                        return response
                    })
            }
        },
        getters: {
            isAuthenticated(state) {
                return state.authKey != null 
            },
            getToken(store) {
                return store.authKey
            }
        }
    })
}

export default createStore;
