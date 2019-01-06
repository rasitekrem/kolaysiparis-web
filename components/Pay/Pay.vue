<template>
    <div class="mt-4 container-fluid">
        <div class="d-md-none table-transfer-container pb-2 table-transfer-container-closed">Seçim Toplamı: <b style="background-color: transparent; transition: background-color 300ms linear 0s;"><span>0.00 TL</span></b>
            <div class="mt-1" style="display: flex;"><button type="button" class="mr-2 btn btn-primary disabled" style="flex-grow: 1; flex-basis: 0px;" disabled="">Nakit</button><button type="button" class="btn btn-primary disabled" style="flex-grow: 1; flex-basis: 0px;" disabled="">Kredi Kartı</button>
                <button
                    type="button" class="ml-2 btn btn-primary disabled" style="flex-grow: 1; flex-basis: 0px;" disabled="">Diğer</button>
            </div>
            <div class="mt-2"><button type="button" class="btn btn-secondary">Temizle</button></div>
        </div>
        <div class="row">
            <div class="col-60 col-md-30">
                <div class="fill-min-height d-flex flex-column mb-4">
                    <div>
                        <div class="pull-right">Toplu&nbsp;<label class="switch switch-3d switch-success form-control-label"><input type="checkbox" class="switch-input form-check-input" checked=""><span class="switch-label"></span><span class="switch-handle"></span></label></div>
                        <h2
                            class="">Masa 1</h2>
                    </div>
                    <div class="mb-0 card" style="flex-grow: 1;">
                        <div class="pt-0 pr-0 pl-0 pb-0 card-body">
                            <p class="text-muted text-center ml-3 mr-3 mt-3">Bu masada adisyon yok</p>
                        </div>
                        <div class="card-footer">
                            <p class="lead mt-0 mb-1">Toplam<strong class="pull-right"><span class="font-weight-bold">0.00 TL</span></strong></p>
                            <p class="mb-1">Ödeme<strong class="pull-right"><span class="font-weight-bold">0.00 TL</span></strong></p>
                            <p class="mb-1">İndirim<strong class="pull-right"><span class="font-weight-bold">0.00 TL</span></strong></p>
                            <p class="lead mb-2">Kalan<strong class="pull-right" style="background-color: transparent; transition: background-color 300ms linear 0s;"><span class="font-weight-bold">0.00 TL</span></strong></p><button type="button" class="btn btn-warning"><i class="icon-printer"></i> Yazdır</button>
                            <button
                                type="button" class="pull-right btn btn-success"><i class="icon-credit-card"></i> Ödeme Listesi</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-sm-down-none pr-0 col-60 col-md-30">
                <div class="fill-height" style="margin-top: 0px; display: flex; flex-direction: column;">
                    <div style="flex-grow: 1; display: flex; flex-direction: column;">
                        <div class="row" style="flex-grow: 1; flex-basis: 0px;">
                            <div class="text-right col-60">
                                <h1 class="display-3" style="background-color: transparent; transition: background-color 300ms linear 0s;"><span>0.00 TL</span></h1>
                            </div>
                        </div>
                        <div class="row" style="flex-grow: 3; flex-basis: 0px;">
                            <div class="col-35" style="display: flex; flex-direction: column;">
                                <div class="row" style="flex-grow: 1;">
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">7</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">8</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">9</button></div>
                                </div>
                                <div class="row" style="flex-grow: 1;">
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">4</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">5</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">6</button></div>
                                </div>
                                <div class="row" style="flex-grow: 1;">
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">1</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">2</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">3</button></div>
                                </div>
                                <div class="row" style="flex-grow: 1;">
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">0</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">C</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px; margin-bottom: 5px;"></div>
                                </div>
                                <div class="row" style="flex-grow: 1;">
                                    <div style="flex-grow: 1; flex-basis: 0px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">Tümü</button></div>
                                    <div style="flex-grow: 1; flex-basis: 0px; margin-left: 5px;"><button type="button" class="btn-primary-active btn btn-default btn-lg" style="width: 100%; height: 100%;">İndirim</button></div>
                                </div>
                            </div>
                            <div class="pl-2 col-25" style="display: flex;">
                                <div class="row" style="flex-grow: 1;">
                                    <div class="col-60" style="flex-grow: 1; margin-bottom: 10px;"><button type="button" class="btn btn-primary btn-lg disabled" style="width: 100%; height: 100%;" disabled="">Nakit</button></div>
                                    <div class="col-60" style="flex-grow: 1; margin-bottom: 10px;"><button type="button" class="btn btn-primary btn-lg disabled" style="width: 100%; height: 100%;" disabled="">Kredi Kartı</button></div>
                                    <div class="col-60" style="flex-grow: 1; margin-bottom: 10px;"><button type="button" class="btn btn-primary btn-lg disabled" style="width: 100%; height: 100%;" disabled="">Diğer</button></div>
                                    <div class="col-60" style="flex-grow: 1;"><button type="button" class="btn btn-danger btn-lg disabled" style="width: 100%; height: 100%;" disabled="">Adisyonu<br>Kapat</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    
</style>