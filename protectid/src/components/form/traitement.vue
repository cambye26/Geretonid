<script>
import Jspdf from 'jspdf'
import Vue from 'vue'
import DisableAutocomplete from 'vue-disable-autocomplete';
import axios from "axios";
import Forms from '@/services/Forms';
Vue.use(DisableAutocomplete);

export default {
  template: `
   <div class="modal fade" id="trait" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">S'opposer au traitement de données</h5>
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
                <input type="text" id="organisme5" v-model="organisme" @input="organismeChanged($event)" class="form-control" placeholder="Nom de l'organisme" list="dataListOrga5" autocomplete="on">
                <datalist id="dataListOrga5">
                  <option v-for="organisme in listOrganismes"
                          v-bind:key="organisme.id">
                    {{organisme.name_city}}
                  </option>
                </datalist>
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Adresse mail de l'organisme" id="Mailorga5" v-model="email">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Son code postal"  id="Postalorga5" v-model="addressZip">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Sa ville" id="Villeorga5" v-model="addressCity">
              </div>
            <form>
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Vos informations</h5>
          </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Raison de la demande</label>
                <input class="form-control" id="Info5" placeholder="Exemple: Je veux que le traitement cesse ">
              </div>
             <div class="form-group">
                <label for="recipient-name" class="col-form-label">Nom</label>
                <input type="text" class="form-control" placeholder="Votre nom" id="Nom5">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Prénom</label>
                <input type="text" class="form-control" placeholder="Votre Prénom" id="Prenom5">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Adresse mail</label>
                <input class="form-control" placeholder="Votre adresse mail"  id="Mail5">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Code postal</label>
                <input type="text" class="form-control" placeholder="Votre code postal"  id="Postal5">
              </div>
              <div class="form-group" style="display: none">
                <label for="recipient-name" class="col-form-label">Ville</label>
                <input type="text" class="form-control" placeholder="Votre ville" id="Ville5">
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
    generatePDF () {
      let currentOrganisme = document.getElementById('organisme5').value
      const values = { ...Forms.getValues('.form-control'), ...Forms.getValues('.form-select')};
      let NP = `${values.Nom10} ${values.Prenom10}`;
      const doc = new Jspdf()

      doc.setFontSize(14)
      doc.text(NP, 10, 15)
      doc.text(values.Mail5, 10, 20)
      doc.text(values.Postal5, 10, 25)
      doc.text(values.Ville5, 10, 30)
      doc.text(currentOrganisme, 200, 45, null, null, "right");
      doc.text(values.Mailorga5, 200, 50, null, null, "right");
      doc.text(values.Postalorga5, 200, 55, null, null, "right");
      doc.text(values.Villeorga5, 200, 60, null, null, "right");
      doc.setFont('Times-Roman', 'bold')
      doc.setFont('Times-Roman', 'normal')
      doc.text('Madame, Monsieur,\n', 10, 90)
      doc.text('En application de l\'article 21.1 du Règlement général sur la protection des données (RGPD),\n', 10, 100)
      doc.text('je m\'oppose au traitement de mes données à caractère personnel par votre organisme car :\n', 10, 105)
      doc.text(values.Info5, 10, 110)
      doc.text('Dès lors, vous voudrez bien :\n', 10, 120)
      doc.text('- supprimer mes données de vos fichiers et notifier ma demande aux organismes auxquels\n', 10, 125)
      doc.text('vous les auriez communiquées (articles 17.1.c. et 19 du RGPD) ;\n', 10, 130)
      doc.text('- si vous en avez l\'obligation légale, m\'indiquer la durée de conservation de\n', 10, 135)
      doc.text('mes données dans vos bases archives ;\n', 10, 140)
      doc.text('- m\'informer de ces éléments dans les meilleurs délais et au plus tard dans un délai d\'un mois\n', 10, 145)
      doc.text('à compter de la réception de ce courrier (article 12.3 du RGPD).\n', 10, 150)
      doc.text('À défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète,\n', 10, 160)
      doc.text('je saisirai la Commission nationale de l\'informatique et des libertés (CNIL) d\'une réclamation.\n', 10, 165)
      doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 175)
      doc.text(NP, 10, 185)
      doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);
      doc.save('Traitement.pdf')
    }
  }
}
</script>
