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
            histories: [],
            restaurantInfo: {},
            personals: [],
            authority: {},
            step: null
        },
        mutations: {
            setAuthKey(state, authKey) {
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
            setStep(state, step) {
                state.step = step;
            },
            setCategories(state, categories) {
                state.categories = categories
            },
            setCart(state, carts) {
                state.carts = carts;
            },
            setOrders(state, orders) {
                state.orders = orders
            },
            setHistory(state, histories) {
                state.histories = histories
            },
            setRestaurantInfo(state, restaurantInfo) {
                state.restaurantInfo = restaurantInfo
            },
            setPersonal(state,personal) {
                state.personals.push(personal)
            },
            setAuthority(state,authority) {
                state.authority = authority
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {

            },
            initAuth(vuexContext, req) {
                let token;
                let expiresIn;
                if (req) {
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
                if (new Date().getTime() > +expiresIn || !token) {
                    vuexContext.commit("clearAuthKey")
                }
                vuexContext.commit("setAuthKey", token)
                vuexContext.dispatch("checkRestaurantStep")
            },
            login(vuexContext, authData) {
                return this.$axios.post('/authenticate',
                    { username: authData.user.email, password: authData.user.password })
                    .then(response => {
                        if (response.data.status) {
                            Cookie.set("authKey", response.data.token);
                            let expiresIn = new Date().getTime() + +response.data.expiresIn * 60000
                            Cookie.set("expiresIn", expiresIn);
                            localStorage.setItem("authKey", response.data.token);
                            localStorage.setItem("expiresIn", expiresIn);
                            vuexContext.commit("setAuthKey", response.data.token)
                            vuexContext.commit("setStep", response.data.step)
                        }
                        return response;
                    })
            },
            register(vuexContext, authData) {
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
                            Cookie.set("expiresIn", expiresIn);
                            localStorage.setItem("authKey", response.data.token);
                            localStorage.setItem("expiresIn", expiresIn);
                            vuexContext.commit("setAuthKey", response.data.token)
                        }
                        return response
                    })
            },
            logout(vuexContext) {
                return vuexContext.commit("clearAuthKey")
            },
            checkUser(vuexContext, data) {
                return this.$axios.post('/checkuser', { data: { email: data.email } })
                    .then(response => {
                        return response
                    })
            },
            saveStepOne(vuexContext, post) {
                return this.$axios.post('/admin/saverestaurant', { data: { post, token: vuexContext.state.authKey } })
                    .then(response => {
                        if (response.status) {
                            vuexContext.state.step = 2;
                        }
                        return response
                    })
            },
            checkRestaurantStep(vuexContext) {
                return this.$axios.post("/admin/checkstatus", { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit("setStep", response.data.step)
                    })
            },
            saveStepTwo(vuexContext, post) {
                return this.$axios.put("/admin/updaterestaurant", { data: { tables: post, token: vuexContext.state.authKey } })
                    .then(response => {
                        if (response.status) {
                            vuexContext.state.step = 3;
                        }
                        return response;
                    })
            },
            saveStepThree(vuexContext, post) {
                return this.$axios.put("/admin/updaterestaurant", { data: { categories: post, token: vuexContext.state.authKey } })
                    .then(response => {
                        if (response.status) {
                            vuexContext.state.step = 4;
                        }
                        return response;
                    })
            },
            getTables(vuexContext) {
                return this.$axios.post("/admin/gettables", { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.state.tables = response.data.tables
                        return response
                    })
            },
            addToCart(vuexContext, data) {
                console.log(data)
                return this.$axios.post("/admin/addcart", { data: { product: data.product, table: data.table, token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.dispatch("getCarts")
                        console.log(vuexContext.state.carts)
                    })
            },
            changeCount(vuexContext, data) {
                return this.$axios.post("/admin/changecount", { data: { product: data.product, table: data.table, token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.dispatch("getCarts")
                        console.log(vuexContext.state.carts)
                    })
            },
            saveCartNote(vuexContext, data) {
                return this.$axios.post("/admin/addcartnote", { data: { ...data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.dispatch("getCarts")
                    })
            },
            removeProduct(vuexContext, data) {
                return this.$axios.post("/admin/removeproduct", { data: { product: data.product, table: data.table, token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.dispatch("getCarts")
                        console.log(vuexContext.state.carts)
                    })
            },
            getCarts(vuexContext) {
                return this.$axios.post("/admin/getcarts", { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        if (response.data.status) {
                            vuexContext.commit("setCart", response.data.carts)
                        }
                    })
            },
            getCategories(vuexContext) {
                return this.$axios.post('/admin/getcategories', { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setCategories', response.data.categories)
                        return response
                    })
            },
            takingOrder(vuexContext, data) {
                return this.$axios.post('/admin/takingorder', { data: { ...data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setOrders', response.data.orders)
                        return response
                    })
            },
            checkOrders(vuexContext) {
                return this.$axios.post('/admin/checkorders', { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setOrders', response.data.orders)
                        return response
                    })
            },
            changeOrderStatus(vuexContext, data) {
                return this.$axios.post('/admin/changeorderstatus', { data: { ...data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setOrders', response.data.orders)
                        return response
                    })
            },
            paid(vuexContext, data) {
                return this.$axios.post('/admin/history', { data: { ...data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setHistory', response.data.histories)
                        return response
                    })
            },
            checkHistory(vuexContext) {
                return this.$axios.post('/admin/checkhistory', { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setHistory', response.data.histories)
                        return response
                    })
            },
            closeAddition(vuexContext, data) {
                return this.$axios.post('/admin/closeaddition', { data: { ...data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setOrders', response.data.orders)
                        vuexContext.commit('setCart', response.data.carts)
                        return response
                    })
            },
            savePassword(vuexContext, data) {
                return this.$axios.post('/admin/savepassword', { data: { ...data, token: vuexContext.state.authKey } })
                    .then(response => {
                        return response
                    })
            },
            restaurantInfo(vuexContext) {
                return this.$axios.post('/admin/restaurantinfo', { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        console.log(response)
                        vuexContext.commit('setRestaurantInfo', response.data.restaurantInfo)
                    })
            },
            saveRestaurant(vuexContext, data) {
                return this.$axios.post('/admin/restaurantupdate', { data: { restaurantData: { ...data }, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setRestaurantInfo', response.data.restaurantInfo)
                    })
            },
            updateTables(vuexContext, data) {
                return this.$axios.post('/admin/updatetables', { data: { tables: data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.state.tables = response.data.tables
                    })
            },
            updateCategories(vuexContext, data) {
                return this.$axios.post('/admin/updatecategories', { data: { categories: data, token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setCategories', response.data.categories)
                        return response.data.status
                    })
            },
            dayStart(vuexContext) {
                return this.$axios.post('/admin/daystart', { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setHistory', response.data.histories)
                    })
            },
            endOfDay(vuexContext) {
                return this.$axios.post('/admin/endofday', { data: { token: vuexContext.state.authKey } })
                    .then(response => {
                        vuexContext.commit('setHistory', response.data.histories)
                    })
            },
            addPersonal(vuexContext,data) {
                return this.$axios.post('/admin/addpersonal', { 
                    data: { 
                        username: data.email,
                        password: data.password,
                        authority: data.authority, 
                        token: vuexContext.state.authKey 
                    }})
                    .then(response => {
                        vuexContext.commit('setPersonal', response.data.personal)
                    })
            },
            checkPersonal(vuexContext) {
                return this.$axios.post('/admin/getpersonal', { data: { token: vuexContext.state.authKey }})
                    .then(response => {
                        vuexContext.state.personals = response.data.personals
                    })
            },
            updatePersonal(vuexContext,data) {
                return this.$axios.post('/admin/updatepersonal', { data: { personal: data, token: vuexContext.state.authKey }})
                    .then(response => {
                        vuexContext.dispatch('checkPersonal')
                    })
            },
            removePersonal(vuexContext,id) {
                return this.$axios.post('/admin/removepersonal', { data: { id, token: vuexContext.state.authKey }})
                    .then(response => {
                        vuexContext.dispatch('checkPersonal')
                    })
            },
            checkAuthority(vuexContext) {
                return this.$axios.post('/admin/getauthority', { data: { token: vuexContext.state.authKey }})
                    .then(response => {
                        console.log(response.data)
                        vuexContext.commit('setAuthority',response.data.authority)
                    })
            },
            qrCodesDownload(vuexContext) {
                const FileDownload = require('js-file-download');
                return this.$axios.post('/admin/qrcodesdownload',{ data: { token: vuexContext.state.authKey, tables: vuexContext.state.tables }, responseType: 'blob',
                headers: {
                  'Accept': 'application/zip'
                } })
                    .then(response => {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'qrcodes.zip');
                        document.body.appendChild(link);
                        link.click();
                    })
            },
            test(vuexContext) {
                const FileDownload = require('js-file-download');
                return this.$axios.post('/admin/test',{ data: { token: vuexContext.state.authKey, tables: vuexContext.state.tables }, responseType: 'blob',
                headers: {
                  'Accept': 'image/png'
                } })
                    .then(response => {
                        let blob = new Blob([response.data], { type: 'image/png' })
                        //FileDownload(blob,'qrcode1.zip')
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = 'test.png'
                        console.log(link)
                        console.log(response)
                        link.click()
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
            getRestaurantStatus(state) {
                return state.step <= 3;
            },
            getStep(state) {
                return state.step
            },
            getTables(state) {
                return state.tables
            },
            getCategories(state) {
                return state.categories
            },
            getCart(state) {
                return state.carts.carts
            },
            getOrders(state) {
                return state.orders.orders
            },
            getHistory(state) {
                if (state.histories.datas) {
                    return state.histories.datas
                } else {
                    return []
                }
                
            },
            dayDetail(state,getters) {
                let additionsPrice = 0
                let waitOrderCount = 0
                let notWaitCount = 0
                if (state.orders.orders) {
                    state.orders.orders.forEach((order) => {
                        if (order.status !== "Sipariş Teslim Edildi") {
                            waitOrderCount++
                        } else {
                            notWaitCount++
                        }
                        additionsPrice += order.totalPrice
                    })
                }
                let historyPrice = 0
                let cashPrice = 0
                let creditPrice = 0
                let otherPrice = 0
                let openTime = ''
                let totalAdition = 0
                if (state.histories.datas) {
                    let toDay = getters.getToday
                    let toDayHistory = state.histories.datas.filter(item => item.historyDate === toDay)
                    if(toDayHistory[0]) {
                        if (toDayHistory[0].histories) {
                            toDayHistory[0].histories.forEach((history) => {
                                if (history.payMethod === "Nakit") {
                                    cashPrice += history.totalPrice
                                } else if (history.payMethod === "Kredi") {
                                    creditPrice += history.totalPrice
                                } else {
                                    otherPrice += history.totalPrice
                                }
                                historyPrice += history.totalPrice
                            })
                            totalAdition = toDayHistory[0].histories.length
                        }
                        totalAdition += waitOrderCount + notWaitCount
                        openTime = toDay + ' ' + toDayHistory[0].openTime
                    }
                }
                return {
                    openTime,
                    adition: {
                        additionsPrice,
                        waitOrderCount,
                        notWaitCount,
                        totalAdition
                    },
                    history: {
                        historyPrice,
                        cashPrice,
                        creditPrice,
                        otherPrice
                    }
                }

            },
            getChart(state) {
                let totalTable = 0
                state.tables.forEach(table => {
                    totalTable += +table.count
                })
                let waitOrderCount = 0
                let openCount = 0
                if (state.orders.orders) {
                    state.orders.orders.forEach((order) => {
                        if (order.status !== "Sipariş Teslim Edildi") {
                            waitOrderCount++
                        }
                        openCount++
                    })
                }
                console.log(totalTable)
                return {
                    openCount,
                    waitOrderCount,
                    emptyCount: totalTable - openCount
                }
            },
            getRestaurantInfo(state) {
                return state.restaurantInfo
            },
            getToday() {
                const date = new Date()
                const year = date.getFullYear()
                const day = date.getDate()
                let month = date.getMonth() + 1
                if (+month < 10) {
                    month = '0' + month
                }
                const toDay = day + '/' + month + '/' + year
                return toDay
            },
            getPersonal(state) {
                return state.personals
            },
            getAuthority(state) {
                return state.authority
            }
        }
    })
}

export default createStore;
