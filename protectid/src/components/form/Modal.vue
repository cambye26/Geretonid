<script>

import Vue from 'vue';
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
import Pdf from '@/services/PDF';

Vue.use(DisableAutocomplete);

export default {
    template: `
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="modal-title" class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-header">
                        <h5 class="modal-title">Informations sur la société</h5>
                    </div>
                    <div class="form-group" autocomplete="off">
                        <label for="organismeModal" class="col-form-label">Nom de l'organisme</label>
                        <input type="text" id="organismeModal" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrgaModal" autocomplete="on">
                        <datalist id="dataListOrgaModal">
                            <option v-for="organisme in listOrganismes"
                                    v-bind:key="organisme.id">
                                {{organisme.name_city}}
                            </option>
                        </datalist>
                    </div>
                    <div class="form-group">
                        <label for="MailorgaModal" class="col-form-label">Adresse mail</label>
                        <input class="form-control" placeholder="Adresse mail de l'organisme" id="MailorgaModal" v-model="email">
                    </div>
                    <form>
                        <div id="complementaires"></div>
                        <div class="modal-header">
                            <h5 class="modal-title">Vos informations</h5>
                        </div>
                        <div class="form-group">
                            <label for="NomModal" class="col-form-label">Nom</label>
                            <input type="text" class="form-control" placeholder="Votre nom" id="NomModal">
                        </div>
                        <div class="form-group">
                            <label for="PrenomModal" class="col-form-label">Prénom</label>
                            <input type="text" class="form-control" placeholder="Votre Prénom" id="PrenomModal">
                        </div>
                        <div class="form-group">
                            <label for="MailModal" class="col-form-label">Adresse mail</label>
                            <input class="form-control" placeholder="Votre adresse mail"  id="MailModal">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <p>Nous ne récupérons aucune donnée</p>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                    <button type="button" id="generate-pdf" data-pdf="" class="btn btn-primary" v-on:click="generatePDF">Générer le PDF</button>
                    <a href="mailto: bcc=bonplanmat@gmail.com" type="button" class="btn btn-primary">Envoyer par mail</a>
                </div>
            </div>
        </div>
    </div>
    `,
    name: 'App',
        data () {
            return {
            organisme: "",
            listOrganismes: [],
            email: "",
            addressZip: "",
            addressCity: ""
        }
    },
    methods: {

        //
        // gestion de la modification du <input id="Organisme">
        // - maj des infos sur l'organisme selectionné dans la liste
        // sinon
        // - maj de la datalist (via listOrganismes)
        //
        organismeChanged: function(ev) {
        
            // recupere le valeur contenu dans le input id="Organisme">
            const currentOrganisme = ev.target.value;

            console.log("organismeChanged start. currentOrganisme=" + currentOrganisme + " inputCheckedAtDom:" + ev);

            // clean other related inputs
            this.email = "";
            this.addressZip = "";
            this.addressCity = "";

            if (currentOrganisme.length > 0) {
                if (this.validOrganisme(currentOrganisme) === false) {

                    // organisme inconnu: propose une nouvelle list
                    this.updateListOrganismes(currentOrganisme);
                }
            }

            console.log("organismeChanged end");
        },

        //
        // verifie si l'organisme present est valide (connu)
        // - recuperation du id dans la liste pour obtenir les details (à revoir)
        //
        validOrganisme(currentOrganisme) {
            // TODO verifier si c'est un organisme connu (il faut une requete http get par le nom)
            // plutot que de faire un loop sur la liste dispo
            var val = currentOrganisme;
            console.log("search " + val + " in " + JSON.stringify(this.listOrganismes));
            for (var i = 0; i < this.listOrganismes.length; i++) {
                console.log("compare " + val + " with " + this.listOrganismes[i].name_city);
                if (val === this.listOrganismes[i].name_city) {
                this.updateOrganismeDetails(this.listOrganismes[i].id);
                return true;
                }
            }
            return false;
        },

        //
        // recupere la liste des orgnismes candidats via un request http
        //
        updateListOrganismes(match) {
            console.log("updateListOrganismes start");
            const baseURI = 'http://localhost:8080/api/company/search';
            const param = { name: match };
            const headers = {
                "Authorization":  "token 32ffef7a5e2682244a84fa2a68630da15bc6575b",
                "Content-Type": "application/json"
            };
            axios.post(baseURI, param, { headers })
            .then((result) => {
                console.log("updateListOrganismes result " + JSON.stringify(result.data));
                var data = result.data;
                console.log({tt: 'ici', data:result.data})
                for(var i=0; i< data.length; i++){
                    data[i].name_city = data[i].name + " (" + data[i].city + ")";
                }
                // maj listOrganismes (vue:data:listOrganismes) qui enclenche automatique la maj de la page
                this.listOrganismes = data;
            })
            console.log("updateListOrganismes end");
        },

        //
        // recupere le detail d'un orgnisme via un request http
        // 
        updateOrganismeDetails(id) {
            console.log("updateOrganismeDetails start");
            const baseURI = "http://localhost:8080/api/company/get/" + id;
            const headers = {
                headers : {
                "Authorization":  "token 32ffef7a5e2682244a84fa2a68630da15bc6575b",
                } 
            };
            axios.get(baseURI, headers)
            .then((result) => {
                console.log("updateOrganismeDetails result:" + JSON.stringify(result.data));
                this.email = result.data.email;
                this.addressZip = result.data.address.zip;
                this.addressCity = result.data.address.city;
            })
            console.log("updateOrganismeDetails end");
        },
        generatePDF($this) {
            let currentOrganisme = document.getElementById('organismeModal').value;
            const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select'), currentOrganisme};

            console.warn({el: $this.srcElement.dataset.pdf, values});
            Pdf.generatePdf($this.srcElement.dataset.pdf, values);
        },
    }

}
</script>