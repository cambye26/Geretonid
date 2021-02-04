export default {
    getValues (selector) {
        let inputs = document.querySelectorAll(selector);
        let values = {};
        inputs.forEach(input => {
            values[input.id] = input.value;
        });
        return values;
    },
    setLines(doc, text, line) {
        const start = 0;
        // Nombre de caractères par lignes
        const delimiter = 90;
        // Calcul le nombre  de lignes
        const loops = Math.ceil( parseInt(text.length) / delimiter );

        for (let i = 0; i < loops; i++) {
            let textLine = text.substr(start, delimiter);
            doc.text(`${textLine}\n`, 10, line);
            text = text.replace(textLine, '');
            line = line + 5;
        }
        return;
    },
    // Ajouter les bons champs dans la partie informations complémentaires
    addModalFields({dataset}) {
        let fields = "";
        const title = `
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Informations complémentaires</h5>
            </div>
        `;
        console.warn({modal: dataset.form});
        // dataset.form: attribut data-form
        switch (dataset.form) {

            case "compte":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Identifiant" class="col-form-label">Identifiant du compte concerté</label>
                        <input type="text" name="identifiant" id="Identifiant" class="form-control" placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="Reseau_Social" class="col-form-label">Nom du réseau social</label>
                        <input type="text" name="social_network" class="form-control" id="Reseau_Social" placeholder="Ex : Facebook, Twitter, Linkedin,">
                    </div>
                    <div class="form-group">
                        <label for="Url" class="col-form-label">Url précise sur laquelle sont publiées les informations vous concernant</label>
                        <input type="text" name="heure_fin" class="form-control" id="Url" placeholder="http://www.">
                    </div>
                    <div class="form-group">
                        <label for="Delete_Infos" class="col-form-label">Précisez les informations à supprimer</label>
                        <textarea name="delete_infos" class="form-control" id="Delete_Infos" rows="4"></textarea>
                    </div>
                `;
                break;

            case "financier":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Identifiant" class="col-form-label">Identifiant client ou numéro de compte</label>
                        <input type="text" name="compte" id="Identifiant" class="form-control" placeholder="Votre n° de compte">
                    </div>
                `;
                break;

            case "prospection":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Identifiant" class="col-form-label">Identifiant client ou numéro de compte</label>
                        <input class="form-control" id="Identifiant" placeholder="Exemple: ">
                    </div>
                `;
                break;

            case "rectifier":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Rectifier" class="col-form-label">Informations à rectifier</label>
                        <textarea name="infos_rectif" class="form-control" id="Rectifier" rows="4"></textarea>
                    </div>                        
                    <div class="form-group">
                        <label for="Rectifiees" class="col-form-label">Informations rectifiées</label>
                        <textarea name="rectif_infos" class="form-control" id="Rectifiees" rows="4"></textarea>
                    </div>
                `;
                break;

            case "site":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Urls" class="col-form-label">Urls précises sur lesquelles sont publiées les informations vous concernant</label>
                        <input class="form-control" id="Urls" placeholder="Exemple: ">
                    </div>
                    <div class="form-group">
                        <label for="Info" class="col-form-label">Précisez les informations à supprimer</label>
                        <input class="form-control" id="Info" placeholder="Exemple: ">
                    </div>
                    <div class="form-group">
                        <label for="Motif" class="col-form-label">Précisez les raisons pour lesquelles vous souhaitez faire effacer ces données</label>
                        <input class="form-control" id="Motif" placeholder="Exemple: ">
                    </div>
                `;
                break;

            case "supprime":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Info" class="col-form-label">Informations à supprimer</label>
                        <input class="form-control" id="Info" placeholder="Exemple: Toutes mes données personnelles ">
                    </div>
                    <div class="form-group">
                        <label for="Motif" class="col-form-label">Motif de la suppression</label>
                        <input class="form-control" id="Motif" placeholder="Exemple: Je ne veux plus que vous stockez mes informations personnelles ">
                    </div>
                `;
                break;

            case "traitement":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Info" class="col-form-label">Raison de la demande</label>
                        <input class="form-control" id="Info" placeholder="Exemple: Je veux que le traitement cesse ">
                    </div>
                `;
                break;

            case "video":
                fields = `
                    ${title}
                    <div class="form-group">
                        <label for="Date" class="col-form-label">Date des images que vous souhaitez consulter</label>
                        <input type="date" name="date" id="Date" class="form-control">
                    </div>
                    <div class="row">
                        <div class="form-group col">
                            <label for="Heure_debut" class="col-form-label">Heure de début</label>
                            <input type="time" name="heure_debut" class="form-control" id="Heure_debut">
                        </div>
                        <div class="form-group col">
                            <label for="Heure_fin" class="col-form-label">Heure de fin</label>
                            <input type="time" name="heure_fin" class="form-control" id="Heure_fin">
                        </div>
                    </div>
                `;
                break;
        }

        return document.querySelector('#complementaires').innerHTML = fields;
    },
    changeModalTitle({innerText}) {        
        return document.querySelector('#modal-title').innerText = innerText;
    },
    changePdfButton({dataset}) {
        return document.getElementById('generate-pdf').setAttribute('data-pdf', dataset.pdf);
    },
};