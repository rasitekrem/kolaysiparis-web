<template>
    <div class="container mr-0 mt-5 col-md-10">
        <div class="d-md-none table-transfer-container pb-2 table-transfer-container-closed">Seçim Toplamı: <b style="background-color: transparent; transition: background-color 300ms linear 0s;"><span>0.00 TL</span></b>
            <div class="mt-1" style="display: flex;"><button type="button" disabled="" class="mr-2 btn btn-primary disabled" style="flex-grow: 1; flex-basis: 0px;">Nakit</button><button type="button" disabled="" class="btn btn-primary disabled" style="flex-grow: 1; flex-basis: 0px;">Kredi Kartı</button>
                <button type="button" disabled="" class="ml-2 btn btn-primary disabled" style="flex-grow: 1; flex-basis: 0px;">Diğer</button>
            </div>
            <div class="mt-2"><button type="button" class="btn btn-secondary">Temizle</button></div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="d-flex flex-column mb-4">
                    <div>
                        <h2 class="">Masa 1</h2>
                    </div>
                    <div class="mb-0 card ">
                        <div class="pt-0 pr-0 pl-0 pb-0 card-body">
                            <p class="text-muted text-center ml-3 mr-3 mt-3">Bu masada adisyon yok</p>
                        </div>
                        <div class="card-footer">
                            <p class="lead mt-0 mb-1">Toplam<strong class="pull-right"><span class="font-weight-bold">0.00 TL</span></strong></p>
                            <p class="mb-1">Ödeme<strong class="pull-right"><span class="font-weight-bold">0.00 TL</span></strong></p>
                            <p class="mb-1">İndirim<strong class="pull-right"><span class="font-weight-bold">0.00 TL</span></strong></p>
                            <p class="lead mb-2">Kalan<strong class="pull-right" style="background-color: transparent; transition: background-color 300ms linear 0s;"><span class="font-weight-bold">0.00 TL</span></strong></p><button type="button" class="btn btn-warning"><i class="icon-printer"></i> Yazdır</button>
                            <button type="button" class="pull-right btn btn-success"><i class="icon-credit-card"></i> Ödeme Listesi</button>
                        </div>
                    </div>
                </div>
            </div>
            <Calc />
        </div>
    </div>
</template>

<script>
    import Calc from '@/components/Pay/Calc'
    export default {
        components: {
            Calc
        }
    }
</script>

<style scoped>
    .adition {
        position: relative;
        width: 100%;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;
    }
</style>