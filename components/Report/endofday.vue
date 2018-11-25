<template>
    <div>
        <hr>
        <div class="mb-3">
            <h4 class="mb-0 card-title">Gün sonu</h4>
            <div class="small text-muted">Toplam: 0 adisyon</div>
        </div>
        <div class="alert alert-info fade show" role="alert">
            <ul class="pl-4">
                <li>Gün sonu yapmadan önce kasa durumunu yukarıdan kontrol edebilirsin.Tüm adisyonların ayrıntılarını aşağıdaki listede bulabilirsin.</li>
                <li>Gün sonu yaptıktan sonra tekrar gün başı yapana kadar sipariş alamazsın.</li>
            </ul>
            <div class="pl-4"><button type="button" class="btn btn-success">Gün sonu</button></div>
        </div>
        <div class="alert alert-warning fade show" role="alert">
            <div class=" text-center pt-4 pb-4"><fa style="font-size: 3em;" class="mb-2" :icon="['fas', 'exclamation']" /><br> Açık adisyonlar bulunduğu için gün sonu yapamazsın.</div>
        </div>
    </div>
</template>