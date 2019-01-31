<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky ">
      <ul class="nav flex-column border-bottom">
        <nuxt-link class="nav-item border-bottom" active-class="active" to="/" tag="li"> 
          <a class="nav-link ">
            <fa class="mr-2" :icon="['fas', 'home']" /> Anasayfa
          </a>
        </nuxt-link>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Restoran</span>
        </h6>
        <nuxt-link tag="li" to="/orders" active-class="active" class="nav-item ml-2" v-if="authority.order">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'bell']" /> Siparişler
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/cashier" active-class="active" class="nav-item ml-2" v-if="authority.cash">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'calculator']" /> Kasa
          </a>
        </nuxt-link>

        <nuxt-link tag="li" to="/day-report" active-class="active" class="nav-item ml-2" v-if="authority.day">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'calendar-alt']" /> Gün
          </a>
        </nuxt-link>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted" v-if="authority.role === 'Admin'">
        <span>Yönetim</span>
      </h6>
      <ul class="nav flex-column mb-2" v-if="authority.role === 'Admin'">
        <nuxt-link tag="li" to="/reports" active-class="active" class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'chart-line']" /> Raporlar
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/editpersonal" active-class="active" class="nav-item ml-2">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'users']" /> Personel
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/editmenu" active-class="active" class="nav-item ml-2">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'book']" /> Menu
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/edittables" active-class="active" class="nav-item ml-2">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'table']" /> Masa
          </a>
        </nuxt-link>
        <nuxt-link tag="li" to="/settings" active-class="active" class="nav-item ml-2">
          <a class="nav-link">
            <fa class="mr-2" :icon="['fas', 'wrench']" /> Hesap Ayarları
          </a>
        </nuxt-link>
      </ul>
    </div>
  </nav> 
</template>
<script>
export default {
  props: {
    authority: Object
  }
}
</script>