window.addEventListener("load", function() {

    // Déclaration initiale de toutes les variables

    // Récupérer les éléments du DOM

     // Déclaration d'objets
     let reservation = {    nom: "",
                            courriel: "",
                            telephone: "",
                            destination: "",
                            aller_retour: false,
                            date_depart: "",
                            date_retour: "", 
                            prix_billet_objet: "",
                            nombre_de_billet: 0,
                            sous_total_billet:"",
                            sous_total_rabais: ""
                        };
    // rabais sur les billets
    const rabais_billet = {
                            rabais_regulier: 0,
                            rabais_etudiant: 0.15,
                            rabais_senior: 0.20,
                            rabais_elite: 0.25
                        };

    const prix_billet = {
                            "Choisissez-une destination" : {
                                aller: "",
                                aller_retour: ""
                            },
                            Quebec : {
                                        aller: 60,
                                        aller_retour: 100
                                        },
                            Sherbrooke: {
                                        aller: 40,
                                        aller_retour: 70
                                        },
                            Rouyn_Noranda: {
                                        aller: 120,
                                        aller_retour: 200
                                        }
                        }; 


    // Récupérer les formulaires
    const form = document.querySelectorAll(".form-style");
    const form1 = document.querySelector("#form1");  
    const form2 = document.querySelector("#form2");  
    const form3 = document.querySelector("#form3");  
    const form4 = document.querySelector("#form4"); 

    // Récupérer la navigation
    const nav1 = document.querySelector(".nav1");
    const nav2 = document.querySelector(".nav2");
    const nav3 = document.querySelector(".nav3");
    const nav4 = document.querySelector(".nav4");

    // Récupérer chaque champ du formulaire 1

    const champNom = form1.querySelector("input[name='nom']");
    const champCourriel = form1.querySelector("input[name='courriel']");
    const champTelephone = form1.querySelector("input[name='telephone']");
    const boutonSuivant1 = form1.querySelector("input[name='btnSuivant1']");

    // Stock valeur dans une variable form 1

    let nom;
    let courriel;
    let telephone;

    // Récupérer chaque champ du formulaire 2 

    const dateDepart = form2.querySelector("input[name='date-start']");
    const allerRetour = form2.querySelector("input[name='aller-retour']"); // répétition allerRetour et checkbox
    const checkbox = document.querySelector("input[name='aller-retour']"); // répétition allerRetour et checkbox
    const dateRetour = form2.querySelector("input[name='date-end']");
    const destination = form2.querySelector("select[name='destination']");
    const boutonSuivant2 = form2.querySelector("input[name='btnSuivant2']");
    const boutonPrecedent2 = form2.querySelector("input[name='btnPrecedent2']");
    const selectionAllerRetour= document.querySelector(".aller-retour");

    // Stock valeur dans une variable form 2
    let prixDuBillet;
    let destinationChoisie;
    let aujourdhui;
    let jj;
    let mm;
    let aaaa;
    let dateMin;
    let depart;
    let retour;
    let jjRetour;
    let mmRetour;
    let aaaaRetour;
    let dateRetourChoisi;
    let difference;
    let prix = document.querySelectorAll(".prix");

    // Récupérer chaque champ du formulaire 3

    let typeRabais = form3.querySelector("input[type='radio']");
    const boutonSuivant3 = form3.querySelector("input[name='btnSuivant3']");
    const boutonPrecedent3 = form3.querySelector("input[name='btnPrecedent3']");
    let typeDeBilletGabarit = document.querySelector(".typeDeBillet");
    let selectionBillet = document.querySelector("input[name='nbBillet']");
    let listeBilletsRabais = document.querySelector(".liste-billets-rabais");
    let nbBillet = 0;
    let nouveauNbBillet;
    let radios;
    let optionChoisi;
    let rabais = document.querySelector(".rabais"); 

    // Récupérer chaque champ du formulaire 4

    let info_perso = document.querySelector(".info-perso");
    let billet = document.querySelector(".billet");
    let sous_total = document.querySelector(".sous-total");
    let tps = document.querySelector(".tps");
    let tvq = document.querySelector(".tvq");
    let total = document.querySelector(".total");
    const boutonPrecedent4 = document.querySelector("input[name='btnPrecedent4']");
    const boutonSuivant4 = document.querySelector("input[name='btnSuitant4']");
    let nomDuBilletGabarit = document.querySelector(".nom-du-billet").cloneNode(true);
    let listeBilletFormulaire = document.querySelector(".liste-billet-formulaire");

    // Regex declaration et initialisation stockée dans des variables
    // Ref nom : https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
    // Ref tel modifié : https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    // Ref tel https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    const regexName = new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u);
    const regexTel = new RegExp(/^\(?\d+\)?[-.\s]?\d+[-.\s]?\d+$/);
    const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    ///////////// AFFICHAGE INITIAL /////////////////////
    // Faire disparaître les formulaires autres que le premier pour l'affichage initial

    for(let i=1; i<form.length; i++){
        form[i].classList.add("invisible");
    }



    ///////////// CODE ORGANISÉ PAR FORMULAIRE ////////////////////////

    // Validation des données : Récupérer la valeur de chaque champs de formulaire, valider le forme et la stocker dans l'objet

    /////////////////// VALIDATION FORM 1 //////////////////////

    champNom.addEventListener("change",function(){
        reservation.nom = champNom.value;
        if(!regexName.test(this.value)){
            champNom.setCustomValidity("Ce format est invalide. Veuillez saisir votre nom.")
            champNom.classList.add("invalide");
        }
        else{
            champNom.setCustomValidity("");
            champNom.classList.remove("invalide");
        }
        champNom.reportValidity();
    });

    champTelephone.addEventListener("change",function(){
        reservation.telephone = champTelephone.value;
        if(!regexTel.test(this.value)){
            champTelephone.setCustomValidity("Ce numéro est invalide. Veuillez saisir un téléphone valide à 10 chiffres.")
            champTelephone.classList.add("invalide");
        }
        else{
            champTelephone.setCustomValidity("");
            champTelephone.classList.remove("invalide");
        }
        champTelephone.reportValidity();

    });


    champCourriel.addEventListener("change",function(){
        reservation.courriel = champCourriel.value;
        if(!regexEmail.test(this.value)){
            champCourriel.setCustomValidity("Ce courriel est invalide. Veuillez saisir un format de courriel valide.")
            champCourriel.classList.add("invalide");
            champCourriel.value =""; 
        }
        else{
            champCourriel.setCustomValidity("");
            champCourriel.classList.remove("invalide");
        }
        champCourriel.reportValidity();
    });

       // Ajouter un écouteur d'événement sur chaque bouton - bouton 1
       boutonSuivant1.addEventListener("click", function(){
        const form= document.querySelectorAll(".form-style");
        if(champNom.checkValidity()===false){
            event.preventDefault();
            champNom.reportValidity();
        }
        else if(champCourriel.checkValidity()===false){
            event.preventDefault();
            champCourriel.reportValidity();
        }
        else if(champTelephone.checkValidity()===false){
            event.preventDefault();
            champTelephone.reportValidity();
        }
        else{
            for(i=0; i<form.length; i++){
                form[0].classList.add("invisible")
                form[1].classList.remove("invisible");
                nav1.classList.remove("active");
                nav2.classList.add("active");
            }
        }
    });

    /////////////////// VALIDATION FORM 2 //////////////////////

    // Faire disparaître l'option date de retour
    selectionAllerRetour.classList.add("invisible");

    // Définir la date actuelle et la définir comme étant l'attribut min format aaaa-mm-jj
    aujourdhui = new Date();
    jj = aujourdhui.getDate();
    //Janvier est le mois 0 alors il faut ajouter +1 
    mm = aujourdhui.getMonth()+1; 
    aaaa = aujourdhui.getFullYear();
    // ajouter un 0 si seulement 1 chiffre
    if(jj<10){
        jj='0'+jj.toString();
    } 
    if(mm<10){
        mm='0'+mm.toString();
    } 
    dateMin = aaaa +'-'+mm+'-'+ jj;
    // Fixer cdn minimale avant le déclencheur d'événement (date aujourd'huie)
    dateDepart.setAttribute("min", dateMin);

    dateDepart.addEventListener("change",function(){
        // En ajoutant un espace ce n'est pas une date ISO et sélectionne bonne date***
        depart = new Date(dateDepart.value +" "); 
        let departComparaison= new Date(dateDepart);
        jjDepart = depart.getDate();
        //Janvier est 0 alors il faut ajouter +1 
        mmDepart = depart.getMonth()+1; 
        aaaaDepart = depart.getFullYear();
        if(jjDepart<10){
            jjDepart='0'+jjDepart.toString();
        } 
        if(mmDepart<10){
            mmDepart='0'+mmDepart.toString();
        } 
        // Format de date se lit automatiquement par moter de recherche (attribut "min")
        // Placer la date choisi dans l'objet
        dateDepartChoisi = aaaaDepart + '-'+mmDepart+'-'+ jjDepart;
        reservation.date_depart = dateDepartChoisi;
        // Fixer cdn minimale avant déclencheur d'événement (date délectionnée)
        // J'ai laissé ce validateur pour mettre des messages personnalisé 
        // également si certains browser ne permettent pas de setter l'attribut 
        // mais il n'est plus utile sur Chrmoe en fixant l'attribut "min"
        dateRetour.setAttribute("min", dateDepartChoisi);
        // Comparer date avec aaaa - mm - jj 
        if(departComparaison.getTime() < aujourdhui.getTime()) {
            dateDepart.setCustomValidity("Cette date est déjà passée.  Veuillez choisir une autre date.");
            dateDepart.reportValidity();
            dateDepart.classList.add("invalide");
        }
        else{
            dateDepart.setCustomValidity("");
            dateDepart.classList.remove("invalide");
        }
        dateDepart.reportValidity();
        
    });
        // Faire le même processus pour la date de retour sélectionnée
        dateRetour.addEventListener("change",function(){
            retour = new Date(dateRetour.value +" ");
            jjRetour = retour.getDate();
            mmRetour = retour.getMonth()+1; //Janvier est 0 alors il faut ajouter +1 
            aaaaRetour = retour.getFullYear();
            if(jjRetour<10){
                jjRetour='0'+jjRetour.toString();
            } 
            if(mmRetour<10){
                mmRetour='0'+mmRetour.toString();
            } 
            // Même format que date départ
            dateRetourChoisi = aaaaRetour +'-'+mmRetour+'-'+ jjRetour;
            reservation.date_retour = dateRetourChoisi;

            if(retour.getTime() < depart.getTime()){
                dateRetour.setCustomValidity("Veuillez choisir date ultérieure à votre départ.  Vous pouvez revenir le même jour que votre départ.")
                dateDepart.reportValidity();
                dateRetour.classList.add("invalide");
            }
            else{
                dateRetour.setCustomValidity("");
                dateRetour.classList.remove("invalide");
                /* Pas utile pour le tp mais j'ai calculé le nombre de jours */
                difference= Math.abs(retour-depart);
                nbJour = difference/(1000 * 3600 * 24);
            }
            dateRetour.reportValidity();
        });

    // Afficher ou masquer la section du choix de retour si la checkbox === true
    // Déterminer le prix
    allerRetour.addEventListener("change", function(){
        selectionAllerRetour.classList.toggle("invisible");
        destinationChoisie = allerRetour.checked;
        // Placer dans l'objet réservation pour utiliser ultérieurement
        reservation.aller_retour = allerRetour.checked;
        if(destinationChoisie===true){
            // Ajouter l'attribut checked qui permet l'entrée de condition
            allerRetour.setAttribute("checked", "true");
            // Mettre prix de l'objet prix dans l'objet reservation
            // Mettre la valeur (balise html value) correspondant à l'objet liste de prix dans la variable prix
            // Placer valeur de la variable prixDuBillet dans l'objet réservation
            prixDuBillet = prix_billet[destination.value]["aller_retour"];
            reservation.prix_billet_objet = prixDuBillet;
        }
        else{
            // Mettre la valeur (balise html value) correspondant à l'objet liste de prix dans la variable prix
            // Placer valeur de la variable prixDuBillet dans l'objet réservation
            allerRetour.removeAttribute("checked");
            prixDuBillet = prix_billet[destination.value]["aller"];
            reservation.prix_billet_objet = prixDuBillet;
        }

    });

    // Écouteur d'événement sur la destination
    // Valider
    // Déterminer le prix
    destination.addEventListener("change", function(){
        destinationChoisie = allerRetour.checked;

        allerRetour.addEventListener("change", function(){
            destinationChoisie ===false;
        });

        if(destinationChoisie===true){
            allerRetour.setAttribute("checked", "true");
            reservation.prix_billet_objet = prix_billet[destination.value]["aller_retour"];
        }
        if(destinationChoisie===false){
            allerRetour.removeAttribute("checked");
            reservation.prix_billet_objet = prix_billet[destination.value]["aller"];
        }
        reservation.destination = destination.value;

        // Ajouter pour la validation
        reservation.destination = destination.value;

        // Placer prix dans la facture finale en fonction de l'écouteur d'événement
        // Boucler dans les balises de classe .prix et y insérer la valeur de propriété l'ojet
        for(let key in prix){
            document.querySelector(".prix").innerHTML = reservation.prix_billet_objet;
        }

        // Utiliser une fonction et l'appeler ici :-)
        ValidationDestination();
    });

    // Fonction de validation destination
    function ValidationDestination(){
        destination.classList.remove("invalide");
        destination.setCustomValidity("");
        
        if(reservation.destination==="Choisissez-une destination"){
            destination.classList.add("invalide");
            destination.setCustomValidity("Veuillez choisir votre destination.");
            destination.reportValidity();
        }
    };

    // Écouteurs d'événement sur bouton pour Validation
    boutonSuivant2.addEventListener("click", function(){
        const form= document.querySelectorAll(".form-style");
        // Mettre le prix tout de suite dans le clône
        // document.querySelector(".prix").innerHTML = reservation["prix_billet_objet"];
        if(dateDepart.checkValidity()===false){
            event.preventDefault();
            dateDepart.classList.add("invalide");
            dateDepart.setCustomValidity("Veuillez choisir une date de départ");
            dateDepart.reportValidity();
        }
        else if(reservation.destination === "Choisissez-une destination" || reservation.destination ===""){
            destination.setCustomValidity("Veuillez choisir votre destination.");
            destination.classList.add("invalide");
            event.preventDefault();
            destination.reportValidity();
        }
        else if(allerRetour.checked === true && reservation.date_retour===""){
            dateRetour.classList.add("invalide");
            dateRetour.setCustomValidity("Veuillez choisir une date de retour");
            event.preventDefault();
            dateRetour.reportValidity();
        }
        // Si toutes cdn remplies cacher panneau et afficher suivant
        else{
            for(i=0; i<form.length; i++){
                form[1].classList.add("invisible")
                form[2].classList.remove("invisible");
                nav2.classList.remove("active");
                nav3.classList.add("active");
            }
        }
    });

    // Cacher panneau et afficher précédent
    boutonPrecedent2.addEventListener("click", function(){
        const form= document.querySelectorAll(".form-style");
        for(i=0; i<form.length; i++){
            form[0].classList.remove("invisible");
            form[1].classList.add("invisible");
            nav1.classList.add("active");
            nav2.classList.remove("active");
        }
    });

    /////////////// FORM 4 /////////////////

    // Écouteur d'événement sur le nombre de billet
    selectionBillet.addEventListener("change", function(){
        nouveauNbBillet = this.value; // = selecteurBillet.value
        if(nouveauNbBillet >= nbBillet){
            // On ajoute un nouveau clone à chaque nouveau tour de boucle
            // Enlever classe invisible
            // Attacher dans la balise correspoandate
            const cloneGabaritSelecteurBillet = typeDeBilletGabarit.cloneNode(true);
            cloneGabaritSelecteurBillet.classList.remove("invisible");
            listeBilletsRabais.append(cloneGabaritSelecteurBillet);

            // Récupérer input radio
            radios = cloneGabaritSelecteurBillet.querySelectorAll("input[type='radio']");
            radios[0].checked = true;
            for (const radio of radios) {
                // Mettre un nom différent par clonage pour qu'ils soient isolés
                radio.setAttribute("name", `${nouveauNbBillet}`); 
                // Initialiser la valeur de la propriété `${nouveauNbBillet}` à 0 pour aucun rabais
                reservation[radio.name]="0";
                radio.addEventListener("change",function(){
                    // Mettre la valeur sélectionnée du radio button dans variable optionChoisi
                    optionChoisi = this.parentNode.querySelector("input[type='radio']:checked").value;
                    // Placer dans l'objet à la propriété name (qu'on a définit avec set attribute)
                    let nombre = parseInt(optionChoisi);
                    let prix_billet_nombre = 0;
                    prix_billet_nombre = parseInt(reservation.prix_billet_objet);
                    let prix_billet_rabais = (nombre*prix_billet_nombre/100)
                    reservation[radio.name]= prix_billet_rabais;
                    console.log(optionChoisi);
                    console.log(reservation);
                });
            }
            // Donner une nouveau nom pour billet facture finale
            document.querySelector(".billet-1").innerText = ("Billet "+ `${nouveauNbBillet}`);
        }
        else if(nouveauNbBillet < nbBillet){
            // On supprime le dernier élément de la liste
            if(listeBilletsRabais.lastElementChild !== null){
                listeBilletsRabais.lastElementChild.remove();
                // Détruire la dernière propriété de l'objet
                delete reservation[`${nbBillet}`]; 
            }
        }

        // Clone le formulaire de facture finale ici
        // Important de séparer pour pas mélanger les conditions
        if(nouveauNbBillet >= nbBillet){
            nomDuBilletGabarit = document.querySelector(".nom-du-billet").cloneNode(true);
            listeBilletFormulaire.append(nomDuBilletGabarit);
            // Enlever classe invisible
            nomDuBilletGabarit.classList.remove("invisible");
        }
        else if(nouveauNbBillet < nbBillet){
            // Retirer dernier élément de la liste
            if(listeBilletFormulaire.lastElementChild !== null){
                listeBilletFormulaire.lastElementChild.remove();
            }
        }
        // Validation : Si 0 billet n'est sélectionné impossible de passer page suivante
        selectionBillet = document.querySelector("input[name='nbBillet']").value;

        // nbBillet devien égal au nouveau nombre de billet 
        nbBillet = nouveauNbBillet;

        // Placer la valeur dans l'objet reservation...peut être utile
        reservation.nombre_de_billet=nouveauNbBillet;
      
    });

    // Cacher le gabarit qui a servit à clôner
    // Au singulier pour attraper seulement le premier *
    const billet1=document.querySelector(".nom-du-billet"); 
    billet1.classList.add("invisible");

    // Cacher form3 et afficher form2
    boutonPrecedent3.addEventListener("click", function(){
        const form= document.querySelectorAll(".form-style");
        for(i=0; i<form.length; i++){
            form[1].classList.remove("invisible");
            form[2].classList.add("invisible");
            nav2.classList.add("active");
            nav3.classList.remove("active");
        }
    });


    //////////////////// FORM 4 //////////////////////

    boutonSuivant3.addEventListener("click", function(){
        // Validation
        if(selectionBillet.value==="0"){
            event.preventDefault();
            selectionBillet.setCustomValidity("Veuillez sélectionner au moins un billet.");
            selectionBillet.reportValidity();
            selectionBillet.addEventListener("change", function(){
                selectionBillet.value = 1;
                selectionBillet.setCustomValidity("");
            })
        }
        // Cacher Form3 et afficher Form4
        else{
            const form= document.querySelectorAll(".form-style");
            for(i=0; i<form.length; i++){
                form[2].classList.add("invisible");
                form[3].classList.remove("invisible");
                nav3.classList.remove("active");
                nav4.classList.add("active");
            }


            // Mettre les valeurs dans le relevé du FORM 4 
            // Important de l'ajouter dans l'événement dans la condition ELSE 
            // On n'accède pas aux infos de l'objet à l'extérieur d'une fonction
            document.querySelector(".nom").innerHTML = reservation.nom;
            document.querySelector(".telephone").innerHTML = reservation.telephone;
            document.querySelector(".courriel").innerHTML = reservation.courriel;
            document.querySelector(".ville").innerHTML = reservation.destination;
            document.querySelector(".date-depart").innerHTML = ("Date de départ : " + reservation.date_depart);
            document.querySelector(".date-retour").innerHTML = ("Date de retour : " + reservation.date_retour);

            // Il y en a plusieurs donc : querySelectorAll
            prix = document.querySelectorAll(".prix");
            console.log(prix,  reservation.prix_billet_objet, "voir les prix")

            // Il y en a plusieurs donc : querySelectorAll 
            // Boucle imbriquées pour essayer de récupérer la valeur du rabais
            // Important de savoir le type de variable avec typeof();
            rabais = document.querySelectorAll(".rabais");
            let sous_total_ap_rabais=0;
            let sous_total = 0;
            for(let key in rabais){
                rabais[key].innerHTML = " " + parseInt(reservation[key]).toFixed(2);
                for(let cle in prix){
                    prix[cle].innerHTML = reservation.prix_billet_objet + ".00 - ";
                }
            }

            // Initialiser les valeurs de nouvelles variables contenant des nombres
            let prix_billet_nombre = 0;
            let nombre = 0;
            let le_sous_total=0;
            let le_nombre_de_billet=0;
            let prix_billet_rabais=0;
            sous_total = 0;
            sous_total_ap_rabais = 0;
            let totalSomme = 0;
            // Trouver comment récupérer le nom des proriétés de billets reservation['1'],...dynamiquement
            // Boucle avec nombre de billets.
            for(let i = 0; i< nbBillet;i++){
                // nombre à la position de l'objet 0+1 puisque propriété des rabais débute à 1
                // convertir en nombre
                nombre = parseInt(reservation[i+1]);
                //debugger;
                // incrémenter un sous-total du nombre correspondant au rabais du tour de boucle
                le_sous_total += nombre;
                console.log(parseInt(reservation[i]), "le sous total")
                console.log(typeof(nombre), "nombre");
                console.log(typeof(parseInt(reservation[i])));

                // Convertir les prix en nombre pour effectuer opération mathématique
                prix_billet_nombre = parseInt(reservation.prix_billet_objet);
                prix_billet_rabais = (nombre*prix_billet_nombre/100)
                //console.log(le_sous_total, "test");
                le_nombre_de_billet = parseInt(nbBillet);
                sous_total = prix_billet_nombre * le_nombre_de_billet;
                sous_total_ap_rabais = (sous_total - le_sous_total);
                console.log(reservation);
                console.log(sous_total_ap_rabais);

            }

            // Placer les valeurs dans le texte
            document.querySelector(".sous-total").innerHTML = sous_total_ap_rabais.toFixed(2);
            tps = (sous_total_ap_rabais * 0.05000);
            document.querySelector(".tps").innerHTML = tps.toFixed(2);
            tvq = (sous_total_ap_rabais * 0.09975);
            document.querySelector(".tvq").innerHTML = tvq.toFixed(2);
            totalSomme = (sous_total_ap_rabais + tps + tvq);
            document.querySelector(".total").innerHTML = totalSomme.toFixed(2);

            // Cacher obtion retour si checkbox non coché
            if(reservation.aller_retour===false){
                dateRetourFormulaire = document.querySelector(".date-retour");
                dateRetourFormulaire.classList.add("invisible");
            }
            else{
                dateRetourFormulaire = document.querySelector(".date-retour");
                dateRetourFormulaire.classList.remove("invisible");
            }
        }
    });

    // Cacher Form4 et aficher Form3
    boutonPrecedent4.addEventListener("click", function(){
        const form= document.querySelectorAll(".form-style");
        for(i=0; i<form.length; i++){
            form[3].classList.add("invisible");
            form[2].classList.remove("invisible");
            nav3.classList.add("active");
            nav4.classList.remove("active");
        }
    });

    // L'objet n'existe pas à l'extérieur du code :
    // console.log(reservation.nom, reservation.prix_billet_objet)

});