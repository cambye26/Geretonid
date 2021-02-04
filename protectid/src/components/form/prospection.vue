<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
Vue.use(DisableAutocomplete);

export default {
  template: `
   <div class="modal fade" id="prospec" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">S’opposer à la prospection commerciale</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
                    <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Informations sur la société</h5>
          </div>
              <div class="form-group" autocomplete="off">
                <label for="message-text" class="col-form-label">Nom de l'organisme</label>
                <input type="text" id="organisme1" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrga1" autocomplete="on">
                <datalist id="dataListOrga1">
                  <option v-for="organisme in listOrganismes"
                          v-bind:key="organisme.id">
                    {{organisme.name_city}}
                  </option>
                </datalist>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme"  id="Mailorga1" v-model="email">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga1" v-model="addressZip">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga1" v-model="addressCity">
              </div>
            <form>
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Identifiant client ou numéro de compte</label>
                <input class="form-control" id="Identifiant" placeholder="Exemple: ">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom1">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom1">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail1">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal1">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville1" >
              </div>
            </form>
            </div>
          <div class="modal-footer">
          <p>Nous ne récupérons aucune donnée</p>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-primary" v-on:click="generatePDF">Generer le PDF</button>
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
      const baseURI = 'https://api.geretonid.com/api/company/search';
      const param = { name: match };
      const headers = {
        "Authorization":  "token 32ffef7a5e2682244a84fa2a68630da15bc6575b",
        "Content-Type": "application/json"
      };
      axios.post(baseURI, param, { headers })
      .then((result) => {
        console.log("updateListOrganismes result " + JSON.stringify(result.data));
        var data = result.data;
        for(var i=0; i<data.length; i++){
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
      const baseURI = "https://api.geretonid.com/api/company/get/" + id;
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
    generatePDF () {
      let currentOrganisme = document.getElementById('organisme1').value
      const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select')};
      let NP = `${values.Nom1} ${values.Prenom1}`;
      const doc = new Jspdf()
      
      doc.setFontSize(14)
      doc.text(NP, 10, 15)
      doc.text(values.Mail1, 10, 20)
      doc.text(values.Postal1, 10, 25)
      doc.text(values.Ville1, 10, 30)
      doc.text(currentOrganisme, 200, 45, null, null, "right");
      doc.text(values.Mailorga1, 200, 50, null, null, "right");
      doc.text(values.Postalorga1, 200, 55, null, null, "right");
      doc.text(values.Villeorga1, 200, 60, null, null, "right");
      doc.setFont('Times-Roman', 'bold')
      doc.setFont('Times-Roman', 'normal')
      doc.text('ref:',10, 80)
      doc.text(values.Identifiant, 18, 80)
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('Je vous demande de noter que je m\'oppose à ce que mes coordonnées, figurant dans vos fichiers, \n', 10, 100)
      doc.text('soient utilisées à des fins de prospection, en application de l\'article 21.2 du Règlement général \n', 10, 105)
      doc.text('sur la protection des données (RGPD).\n', 10, 115)
      doc.text('Ainsi, je vous remercie de supprimer mes coordonnées de vos fichiers d\'envoi de prospection\n', 10, 120)
      doc.text('(article 17.1 du RGPD) et de notifier cette demande de suppression aux partenaires que vous \n', 10, 125)
      doc.text('auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 130)
      doc.text('Je vous remercie de m\'informer des mesures prises à la suite de ma demande dans les meilleurs \n', 10, 140)
      doc.text('délais et au plus tard dans un délai d\'un mois à compter de sa réception (article 12.3 du RGPD).\n', 10, 145)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 155)
      doc.text(NP, 10, 165)
      doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);
      doc.save('Prospection.pdf')
    }
  }
}
</script>
