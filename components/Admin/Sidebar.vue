<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column border-bottom">
        <li class="nav-item border-bottom">
          <a class="nav-link active" href="#">
            <fa class="mr-2" :icon="['fas', 'home']" /> Anasayfa
          </a>
        </li>
        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>Restoran</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <fa class="mr-2" :icon="['fas', 'wallet']" />
          </a>
        </h6>
        <nuxt-link tag="li" to="/auth" active-class="active" class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'bell']" /> Siparişler
          </a>
        </nuxt-link>
  
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'calculator']" /> Kasa
          </a>
        </li>
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'wallet']" /> Gün
          </a>
        </li>
      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Yönetim</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <fa class="mr-2" :icon="['fas', 'wallet']" />
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'chart-line']" /> Raporlar
          </a>
        </li>
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'wallet']" /> Personel
          </a>
        </li>
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'wallet']" /> Menu
          </a>
        </li>
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'wallet']" /> Masa
          </a>
        </li>
        <li class="nav-item ml-2">
          <a class="nav-link" href="#">
            <fa class="mr-2" :icon="['fas', 'wrench']" /> Hesap Ayarları
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>