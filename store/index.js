import Vuex from 'vuex';
import Cookie from 'js-cookie';

const createStore = () => {
    return new Vuex.Store({
        state: {
            authKey: null,
            orders: [],
            categories: [],
            carts: [],
            tables: [],
            step: null
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
            },
            setStep(state,step) {
                state.step = step;
            },
            setCategories(state,categories) {
                state.categories = categories
            },
            setCart(state,carts) {
                state.carts = carts;
            },
            setOrders(state,orders) {
                state.orders = orders
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
                vuexContext.dispatch("checkRestaurantStep")
            },
            login(vuexContext,authData) {
                  return this.$axios.post('/authenticate', 
                    { username: authData.user.email, password: authData.user.password })
                      .then(response => {
                          if (response.data.status) {
                            Cookie.set("authKey", response.data.token);
                            let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                            Cookie.set("expiresIn",expiresIn);
                            localStorage.setItem("authKey",response.data.token);
                            localStorage.setItem("expiresIn",expiresIn);
                            vuexContext.commit("setAuthKey",response.data.token)
                            vuexContext.commit("setStep",response.data.step)
                          }
                        return response;
                      })
            },
            register(vuexContext,authData) {
                return this.$axios.post('/register', 
                    { 
                        username: authData.user.email, 
                        password: authData.user.password,
                        repassword: authData.user.repassword
                    })
                      .then(response => {
                          
                          if (response.data.status) {
                            Cookie.set("authKey", response.data.token);
                            let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                            Cookie.set("expiresIn",expiresIn);
                            localStorage.setItem("authKey",response.data.token);
                            localStorage.setItem("expiresIn",expiresIn);
                            vuexContext.commit("setAuthKey",response.data.token)
                          }
                        return response
                      }) 
            },
            logout(vuexContext){
                return vuexContext.commit("clearAuthKey")
            },
            checkUser(vuexContext,data) {
                return this.$axios.post('/checkuser',{ data: { email: data.email } })
                    .then(response => {
                        return response
                    })
            },
            saveStepOne(vuexContext,post) {
                return this.$axios.post('/admin/saverestaurant',{ data: { post, token: vuexContext.state.authKey } })
                    .then(response => {
                        if (response.status) {
                            vuexContext.state.step = 2;
                        }
                        return response
                    })
            },
            checkRestaurantStep(vuexContext){
                return this.$axios.post("/admin/checkstatus",{ data: { token: vuexContext.state.authKey }})
                    .then(response => {
                        vuexContext.commit("setStep",response.data.step)                       
                    })
            },
            saveStepTwo(vuexContext,post){
                return this.$axios.put("/admin/updaterestaurant",{ data: { tables : post, token: vuexContext.state.authKey }})
                    .then(response => {
                        if (response.status) {
                            vuexContext.state.step = 3;
                        }
                        return response;
                    })
            },
            saveStepThree(vuexContext,post){
                return this.$axios.put("/admin/updaterestaurant",{ data: { categories : post, token: vuexContext.state.authKey }})
                    .then(response => {
                        if (response.status) {
                            vuexContext.state.step = 4;
                        }
                        return response;
                    })
            },
            getTables(vuexContext) {
                return this.$axios.post("/admin/gettables",{ data: { token: vuexContext.state.authKey }})
                    .then(response => {
                        vuexContext.state.tables = response.data.tables
                        return response
                    })
            },
            addToCart(vuexContext,data){
                return this.$axios.post("/admin/addcart", { data : { product: data.product,table: data.table, token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.dispatch("getCarts")
                        console.log(vuexContext.state.carts)
                    })
            },
            changeCount(vuexContext,data){
                return this.$axios.post("/admin/changecount", { data : { product: data.product,table: data.table, token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.dispatch("getCarts")
                        console.log(vuexContext.state.carts)
                    })
            },
            removeProduct(vuexContext,data){
                return this.$axios.post("/admin/removeproduct", { data : { product: data.product,table: data.table, token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.dispatch("getCarts")
                        console.log(vuexContext.state.carts)
                    })
            },
            getCarts(vuexContext) {
                return this.$axios.post("/admin/getcarts", { data : { token: vuexContext.state.authKey } })
                    .then(response => {
                        if (response.data.status) {
                            vuexContext.commit("setCart",response.data.carts)
                        }
                    })
            },
            getCategories(vuexContext) {
                return this.$axios.post('/admin/getcategories',{data : { token : vuexContext.state.authKey}})
                    .then(response => {
                        vuexContext.commit('setCategories',response.data.categories)
                        return response
                    })
            },
            takingOrder(vuexContext,data) {
                return this.$axios.post('/admin/takingorder',{data : { ...data, token : vuexContext.state.authKey}})
                    .then(response => {
                        vuexContext.dispatch('checkOrders')
                        return response
                    })
            },
            checkOrders(vuexContext) {
                return this.$axios.post('/admin/checkorders',{data : { token : vuexContext.state.authKey}})
                    .then(response => {
                        vuexContext.commit('setOrders',response.data.orders)
                        return response
                    })
            },
            changeOrderStatus(vuexContext,data) {
                console.log(data)
                return this.$axios.post('/admin/changeorderstatus',{data : { ...data, token : vuexContext.state.authKey}})
                    .then(response => {
                        //vuexContext.dispatch('checkOrders')
                        vuexContext.commit('setOrders',response.data.orders)
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
            },
            getRestaurantStatus(state){
                return state.step <= 3;
            },
            getStep(state) {
                return state.step
            },
            getTables(state) {
                return state.tables
            },
            getCategories(state){
                return state.categories
            },
            getCart(state){
                return state.carts.carts
            },
            getOrders(state) {
                return state.orders.orders
            }
        }
    })
}

export default createStore;
