<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between">
            <h4 class="mb-0 card-title">Personel</h4><button type="button" class="pull-right btn btn-primary"><span>Parolaları göster</span></button>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th>Mail</th>
                        <th class="text-right">Parola</th>
                        <th class="text-right">Aktif</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="vertical-align: middle;"><button type="button" class="px-0 py-0 btn btn-link">rasit@mail.com</button></td>
                        <td class="text-right" style="vertical-align: middle;"><span>****</span></td>
                        <td class="text-right" style="vertical-align: middle;"><label class="switch switch-icon switch-pill switch-success switch-lg  form-control-label"><input type="checkbox" class="switch-input form-check-input" checked=""><span class="switch-label" data-on="" data-off=""></span><span class="switch-handle"></span></label></td>
                    </tr>
                    <tr>
                        <td class="py-0 px-0" colspan="3" style="border-top-width: 0px;">
                            <div style="overflow: hidden; max-height: none;">
                                <div>
                                    <div class="pt-2 pb-3 px-3 bg-light">
                                        <div>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <div class="form-group"><label class=" form-control-label"><b>Mail</b></label><input placeholder="Mail" type="mail" class="form-control" value="rasit@mail.com"></div>
                                                </div>
                                                <div class="col-sm-6">
                                                    <div class="form-group"><label class=" form-control-label"><b>Parola</b></label><input placeholder="Parola" type="text" class="form-control" value="1234"></div>
                                                </div>
                                            </div>
                                            <div class="mb-4 text-right"><button type="button" class="mr-2 btn btn-success">Kaydet</button><button type="button" class="btn btn-danger">Sil</button></div><label class=" form-control-label"><b>Yetkiler</b></label>
                                            <div>
                                                <div>
                                                    <button type="button" class="mr-3 btn btn-outline-danger"><fa :icon="['fas', 'lock']" class="font-weight-bold" style="font-size: 1.2em;"></fa> Kasa</button>
                                                </div>
                                                <div class="pt-3">
                                                    <button type="button" class="mr-3 mb-2 btn btn-outline-primary"><fa :icon="['fas', 'lock-open']" class="font-weight-bold mx-2" style="font-size: 1.2em;"></fa> Sipariş durumu değiştirme</button>
                                                    <button type="button" class="mr-3 mb-2 btn btn-outline-primary"><fa :icon="['fas', 'lock-open']" class="font-weight-bold mx-2" style="font-size: 1.2em;"></fa>Gün başı/sonu</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table><button type="button" class="btn btn-primary"><fa :icon="['fas', 'user-plus']" class="mx-2"></fa>Yeni Personel</button></div>
    </div>
</template>

<style scoped>
    
</style>
