<template>
  <div id='app'>
    <!-- Formulaire -->
    <header class='masthead'>
      <div class='container'>
        <div class='intro-text'>
          <img style=' width: 25%; margin-top: 20px' src='../../img/ProtectID_logo.png' alt>
          <!--<div class='intro-lead-in'>Bienvenue</div>-->
            <h1 class="h4 mb-3">Etape 1 : Choisissez le droit que vous voulez utiliser</h1>
            <h2 class="h4 mb-3">Etape 2 : Indiquez le nom de l'entreprise et vos informations</h2>
            <h3 class="h4 mb-3">Etape 3 : Générer le PDF et envoyez-le à l'adresse indiquée</h3>

          <div class="droit-container">
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="acces"
              data-pdf="acces"
              @click="addFields"
            >Droit d'accès</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="supprime"
              data-pdf="supprime"
              @click="addFields"
            >Supprimer ses données personnelles</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="pub"
              data-pdf="pub"
              @click="addFields"
            >Ne plus recevoir de publicités</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="traitement"
              data-pdf="traitement"
              @click="addFields"
            >S'opposer au traitement de données</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="prospection"
              data-pdf="prospection"
              @click="addFields"
            >Stopper la prospection commerciale</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="site"
              data-pdf="site"
              @click="addFields"
            >Supprimer des informations vous concernant d'un site internet</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="video"
              data-pdf="video"
              @click="addFields"
            >Accéder à des images vidéo vous concernant</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' 
              data-toggle='modal'
              data-target='#modal'
              data-form="compte"
              data-pdf="compte"
              @click="addFields"
            >Clôturer un compte en ligne</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger' style='background-color: #184abb; display: -webkit-inline-box'
              data-toggle='modal'
              data-target='#modal'
              data-form="rectifier"
              data-pdf="incompletes"
              @click="addFields"
            >Rectifier des données incomplètes</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger'
              data-toggle='modal'
              data-target='#modal'
              data-form="rectifier"
              data-pdf="inexactes"
              @click="addFields"
            >Rectifier des données inexactes</a>
            <a
              class='btn btn-primary btn-form text-uppercase js-scroll-trigger'
              data-toggle='modal'
              data-target='#medical'
            >Accéder à son dossier médical</a>
            <a
              class='btn btn-form text-uppercase js-scroll-trigger'
              data-toggle='modal'
              data-target='#modal'
              data-form="financier"
              data-pdf="financier"
              @click="addFields"
            >Connaître les informations détenues par un établissement financier</a>
          </div>
          
        </div>
      </div>
       <router-link
            class='btn btn-primary btn-xl text-uppercase js-scroll-trigger' 
            to='/droit'
            style='margin: auto; background-color: #184abb'
          >Quel droit choisir ?</router-link>
    </header>

    <!-- Services -->
    <section class="text"  id='services'>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-12 text-center'>
            <h4>
              <br>L'entreprise a 1 mois pour valider votre demande et peut vous demander un justificatif afin de vérifier votre identité.
              <br>
              <br>GERETONID vous permet de contrôler vos données personnelles en vous aidant à exercer vos droits.
              <br>
              <br>
            </h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <!-- <section class='page-section' id='contact'>
      <div class='container'>
        <div class='row'>
          <div class='col-lg-12 text-center'>
            <h2 class='section-heading text-uppercase'>Contactez Nous!</h2>
            <h3 class='section-subheading text-muted'>...................................</h3>
          </div>
        </div>
        <div class='row'>
          <div class='col-lg-12'>
            <form id='contactForm' name='sentMessage' novalidate='novalidate'>
              <div class='row'>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <input
                      class='form-control'
                      id='name'
                      type='text'
                      placeholder='Nom *'
                      required='required'
                      data-validation-required-message='Please enter your name.'
                    >
                    <p class='help-block text-danger'></p>
                  </div>
                  <div class='form-group'>
                    <input
                      class='form-control'
                      id='email'
                      type='email'
                      placeholder='Email *'
                      required='required'
                      data-validation-required-message='Please enter your email address.'
                    >
                    <p class='help-block text-danger'></p>
                  </div>
                  <div class='form-group'>
                    <input
                      class='form-control'
                      id='phone'
                      type='tel'
                      placeholder='Numéro de téléphone *'
                      required='required'
                      data-validation-required-message='Please enter your phone number.'
                    >
                    <p class='help-block text-danger'></p>
                  </div>
                </div>
                <div class='col-md-6'>
                  <div class='form-group'>
                    <textarea
                      class='form-control'
                      id='message'
                      placeholder='Ton message *'
                      required='required'
                      data-validation-required-message='Please enter a message.'
                    ></textarea>
                    <p class='help-block text-danger'></p>
                  </div>
                </div>
                <div class='clearfix'></div>
                <div class='col-lg-12 text-center'>
                  <div id='success'></div>
                  <button
                    id='sendMessageButton' style='background-color: #184abb'
                    class='btn btn-primary btn-xl text-uppercase'
                    type='submit'
                  >Envoyez</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section> -->
    <!--- POP-UP -->
    <!-- <Acces></Acces>
    <Supprimer></Supprimer>
    <Pub></Pub>
    <Traitement></Traitement>
    <Prospection></Prospection>
    <Site></Site>
    <Video></Video>
    <Compte></Compte>
    <Incompletes></Incompletes>
    <Inexactes></Inexactes>  
    <Financier></Financier> -->
    <Medical></Medical>
    <Modal></Modal>
  </div>
</template>

<script>
// import Supprimer from './form/supprime.vue';
// import Acces from './form/acces.vue';
// import Pub from './form/pub.vue';
// import Traitement from './form/traitement.vue';
// import Prospection from './form/prospection.vue';
// import Site from './form/site.vue';
// import Video from './form/video.vue';
// import Compte from './form/compte.vue';
// import Incompletes from './form/incompletes.vue';
// import Inexactes from './form/inexactes.vue';
// import Financier from './form/financier.vue';
import Modal from './form/Modal.vue';
import Medical from './form/medical.vue';
import Forms from '@/services/Forms';
import Vue from 'vue';
import DisableAutocomplete from 'vue-disable-autocomplete';
Vue.use(DisableAutocomplete);

export default {
  components: {
    // Supprimer,
    // Acces,
    // Pub,
    // Traitement,
    // Prospection,
    // Site,
    // Video,
    // Compte,
    // Incompletes,
    // Inexactes,
    // Financier,
    Medical,
    Modal,
  }, 
  methods: {
    addFields($this) {
      Forms.changeModalTitle($this.srcElement);
      Forms.addModalFields($this.srcElement);
      Forms.changePdfButton($this.srcElement);
    }
  }
}

</script>