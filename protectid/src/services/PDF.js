import Jspdf from 'jspdf';

export default{
    generatePdf(pdf, values, save = true) {
        const doc = new Jspdf();
        const NP = `${values.PrenomModal} ${values.NomModal}`
        console.log({pdf, doc, values})
        
        // PDF Header
        doc.setFontSize(14);
        doc.text(NP, 10, 15);
        doc.text(values.MailModal, 10, 20);
        // doc.text(values.PostalModal, 10, 25);
        // doc.text(values.VilleModal, 10, 30);
        doc.text(values.currentOrganisme, 200, 45, null, null, "right");
        doc.text(values.MailorgaModal, 200, 50, null, null, "right");
        // doc.text(values.PostalorgaModal, 200, 55, null, null, "right");
        // doc.text(values.VilleorgaModal, 200, 60, null, null, "right");
        doc.setFont('Times-Roman', 'bold');

        // PDF Content
        this.getContent(pdf, doc, values);

        // PDF Footer
        doc.text(NP, 10, 240)
        doc.addImage("/img/ProtectID_logo.242c85be.png", "PNG", 145, 280, 60, 15);
        doc.save(`${pdf}.pdf`)
        console.log(save);
        console.log({pdf, doc, values});
    },
    // Get the good content for the pdf
    getContent(pdf, doc, values) {
        console.warn(values);
        switch (pdf) {
            case "acces":
                doc.text('Objet: Droit d\'accès\n', 10, 70)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('Je vous prie de bien vouloir m\'indiquer si des données me concernant figurent dans vos\n', 10, 100)
                doc.text('fichiers informatisés ou manuels.\n', 10, 105)
                doc.text('Dans l\'affirmative, je souhaiterais obtenir une copie, en langage clair, de l\'ensemble de ces et\n', 10, 115)
                doc.text('données (y compris celles figurant dans les zones « blocs-notes » ou « commentaires »),\n', 10, 120)
                doc.text('en application de l\'article 15 du Règlement général sur la protection des données (RGPD).\n', 10, 125)
                doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard \n', 10, 135)
                doc.text('dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 140)
                doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète\n', 10, 150)
                doc.text('je me réserve la possibilité de saisir la Commission nationale de l\'informatique et des \n', 10, 155)
                doc.text('libertés (CNIL) d\'une réclamation.\n', 10, 160)
                doc.text('A toutes fins utiles, vous trouverez des informations sur le site internet de la CNIL :\n', 10, 170)
                doc.text('https://www.cnil.fr/fr/professionnels-comment-repondre-une-demande-de-droit-dacces.\n', 10, 175)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 185)
                break;

            case "compte":
                doc.text('Objet: Demande de clôture de compte et de suppression de données personnelles me\n', 10, 75)
                doc.text('concernant', 10, 80)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 105)
                doc.text(`Je suis titulaire du compte ${values.Identifiant} sur ${values.Reseau_Social}, qui diffuse des informations me \n`, 10, 120)
                doc.text(`concernant à la page: ${values.Url}\n`, 10, 125)
                doc.text('Je souhaite obtenir la clôture de mon compte et vous demande, en application de l’article 17.1\n', 10, 135)
                doc.text('du Règlement général sur la protection des données (RGPD),  de supprimer l’ensemble de \n', 10, 140)
                doc.text('mes données personnelles qui lui sont rattachées, à savoir :\n', 10, 145)
                this.setLines(doc, values.Delete_Infos, 150)
                doc.text('Je vous remercie de bien vouloir m\'informer des mesures prises à la suite de ma demande dans\n', 10, 180)
                doc.text('les meilleurs délais et au plus tard dans un délai d’un mois à compter de sa réception \n', 10, 185)
                doc.text('(article 12.3 du RGPD).\n', 10, 190)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.\n', 10, 200)
                break;

            case "financier":
                doc.text('Objet: Droit d\'accès\n', 10, 70)
                doc.text(`Ref: ${values.Identifiant}`,10, 75)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('Conformément à l’article en application de l’article 15 du Règlement général sur la protection \n', 10, 100)
                doc.text('des données (RGPD), je vous prie de bien vouloir m’indiquer si des informations me concernant\n', 10, 105)
                doc.text('figurent figurent dans vos fichiers informatisés ou manuels.', 10, 110)
                doc.text('Dans l’affirmative, je vous demande de me faire parvenir une copie, en langage clair, de \n', 10, 120)
                doc.text('l’ensemble,de ces données (y compris celles figurant dans les zones « blocs-notes » ou \n', 10, 125)
                doc.text('« commentaires »).', 10, 130)
                doc.text('Vous voudrez bien également me donner toute information disponible sur l’origine de ces \n', 10, 140)
                doc.text("données me concernant.", 10, 145)
                doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans \n', 10, 155)
                doc.text('un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 160)
                doc.text('Je vous prie d’agréer, Madame, Monsieur, l’expression de mes salutations distinguées.\n', 10, 170)
                break;

            case "incompletes":
                doc.text('Objet: Rectification de données me concernant\n', 10, 70);
                doc.setFont('Times-Roman', 'normal');
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('Les données suivantes me concernant qui figurent dans vos fichiers sont incomplètes : \n', 10, 100);
                this.setLines(doc, values.Rectifier, 105);
                doc.text('Par conséquent, en application de l’article 16 du Règlement général sur la protection des\n', 10, 135);
                doc.text('données (RGPD), je vous remercie de bien vouloir compléter votre fichier avec les données\n', 10, 140);
                doc.text('ci-dessous utiles à votre traitement : \n', 10, 145);
                this.setLines(doc, values.Rectifiees, 150);
                doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus\n', 10, 180);
                doc.text('tard dans un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 185);
                doc.text('Je vous remercie également de notifier cette demande de rectification aux organismes que vous\n', 10, 195);
                doc.text('auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 200);
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 215);
                break;

            case "inexactes":
                doc.text('Objet: Rectification de données me concernant\n', 10, 70)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('Les données suivantes me concernant qui figurent dans vos fichiers sont inexactes : \n', 10, 100)
                this.setLines(doc, values.Rectifier, 105);
                doc.text('Par conséquent, en application de l’article 16 du Règlement général sur la protection des\n', 10, 135)
                doc.text('données (RGPD), je vous remercie de bien vouloir compléter votre fichier avec les données\n', 10, 140)
                doc.text('ci-dessous utiles à votre traitement : \n', 10, 145)
                this.setLines(doc, values.Rectifiees, 150);
                doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard\n', 10, 180)
                doc.text(' dans un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 185)
                doc.text('Je vous remercie également de notifier cette demande de rectification aux organismes que vous\n', 10, 195)
                doc.text('auriez rendus destinataires de mes données (article 19 du RGPD).\n', 10, 200)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 215)
                break;
                
            case "prospection":
                doc.text('Objet: Opposition à l’utilisation commerciale de mes coordonnées\n', 10, 70)
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
                break;
                    
            case "pub":
                doc.text('Objet: Opposition à recevoir de la publicité\n', 10, 70)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('Conformément aux dispositions de l\'article 21.2 du RGPD, je vous remercie de bien vouloir\n', 10, 100)
                doc.text('supprimer mes coordonnées de vos fichiers d\'envoi de publicités.\n', 10, 105)
                doc.text('Je vous rappelle que vous disposez d\'un délai maximal d\'un mois suivant la réception de ce\n', 10, 115)
                doc.text('courrier pour répondre à ma demande, conformément à l\'article 12.3 du RGPD.\n', 10, 120)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 130)
                break;
                
            case "site":      
                doc.text('Objet: Rectification de données me concernant\n', 10, 70)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('Des informations me concernant sont actuellement diffusées sur votre site internet sur les pages\n', 10, 100)
                doc.text(' suivantes :', 10, 105)
                doc.text(values.Urls, 10, 110)
                doc.text('Aussi, en application des articles 21.1 et 17.1.c. du Règlement général sur la protection des \n', 10, 120)
                doc.text('données (RGPD), je vous remercie de supprimer les données personnelles suivantes me\n', 10, 125)
                doc.text('concernant :', 10, 130)
                doc.text(values.Info, 10, 135)
                doc.text('Je souhaite que ces informations soient supprimées car :\n', 10, 145)
                doc.text(values.Motif, 10, 150)
                doc.text('Je vous remercie également de faire le nécessaire pour que ces pages ne soient plus référencées\n', 10, 160)
                doc.text('par les moteurs de recherche (article 17.2 du RGPD).\n', 10, 165)
                doc.text('Vous voudrez bien me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans \n', 10, 175)
                doc.text('un délai d\'un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 180)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 200)
                break;

            case "supprime":      
                doc.text('Objet: Suppression de données personnelles \n', 10, 70)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('En application de l\'article 17.1 du Règlement général sur la protection des données, je \n', 10, 100)
                doc.text('vous prie d\'effacer de vos fichiers les données personnelles suivantes me concernant:\n', 10, 105)
                doc.text(values.Info, 10, 110)
                doc.text('Je demande que ces informations soient supprimées car :\n', 10, 120)
                doc.text(values.Motif, 10, 125)
                doc.text('Vous voudrez bien également notifier cette demande d\'effacement de mes données aux organis-\n', 10, 135)
                doc.text('mes auxquels vous les auriez communiquées (article 19 du RGPD).\n', 10, 140)
                doc.text('Enfin, je vous prie de m\'informer de ces éléments dans les meilleurs délais et au plus tard\n', 10, 150)
                doc.text('dans un délai d\'un mois à compter de la réception de ce courrier (article 12.3 du RGPD).\n', 10, 155)
                doc.text('A défaut de réponse de votre part dans les délais impartis ou en cas de réponse incomplète,\n', 10, 165)
                doc.text('je me réserve la possibilité de saisir la Commission nationale del\'informatique et des \n', 10, 170)
                doc.text('libertés (CNIL) d\'une réclamation.\n', 10, 175)
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 185)
                break;

            case "traitement":      
                doc.text('Objet: Droit d\'opposition \n', 10, 75)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 90)
                doc.text('En application de l\'article 21.1 du Règlement général sur la protection des données (RGPD),\n', 10, 100)
                doc.text('je m\'oppose au traitement de mes données à caractère personnel par votre organisme car :\n', 10, 105)
                doc.text(values.Info, 10, 110)
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
                break;

            case "video":    
                doc.text('Objet: Demande d\'accès à des images me concernant issues de votre dispositif de \n', 10, 75)
                doc.text('vidéosurveillance', 10, 80)
                doc.setFont('Times-Roman', 'normal')
                doc.text('Madame, Monsieur,\n', 10, 95)
                doc.text('Je vous prie de bien vouloir m’indiquer si des images me concernant figurent dans votre dispositif\n', 10, 105)
                doc.text(`de vidéosurveillance pour la date du  ${values.Date} de à ${values.Heure_fin}. \n`, 10, 110)
                doc.text('Dans l’affirmative, je vous demande de bien vouloir me donner l’accès à ces images, en appli-\n', 10, 120)
                doc.text('cation de l’article 15 du Règlement général sur la protection des données (RGPD).\n', 10, 125)
                doc.text('Je vous remercie de me faire parvenir votre réponse dans les meilleurs délais et au plus tard dans \n', 10, 135)
                doc.text('un délai d’un mois à compter de la réception de ma demande (article 12.3 du RGPD).\n', 10, 140)
                doc.text('A toutes fins utiles, vous trouverez des informations sur le site internet de la CNIL :\n', 10, 150)
                doc.textWithLink('https://www.cnil.fr/modele/courrier/acceder-des-images-video-vous-concernant\n', 10, 155, {
                    url: 'https://www.cnil.fr/modele/courrier/acceder-des-images-video-vous-concernant',
                })
                doc.text('Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 10, 170)
                break;
        }
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
}