'use strict';


/***** ON DÉCLARE LA VARIABLE QUI SERVIRA À LANCER LE JEU *****/
var demarrage;

/*************** IFE POUR LA CONSTRUCTION AREA - ZONE DE JEU ***********/

(function construction_area () {

    var tableauDeLignes = document.getElementById('area');
    var tableauDeCases = [];

    for (var y = 0; y < 25; y++) {

        tableauDeLignes[y] = tableauDeCases;

        tableauDeCases = document.createElement('div');


        tableauDeCases.setAttribute('class', 'div');
        
        tableauDeCases.setAttribute('id', 'div ' + y);

        
        tableauDeLignes.append(tableauDeCases);



        for (var x = 0; x < 25; x++) {

            var uneCase = tableauDeCases[x];

            uneCase = document.createElement('span');

            
            uneCase.setAttribute('class', 'span');
            
            uneCase.setAttribute('id', 'span ' + x);

            
            tableauDeCases.appendChild(uneCase);
        }
    }
})();

/**************************** GESTION DE BOUTON 'JOUER'************************/

const vitesse = 100;
var button = document.getElementById('button');
button.addEventListener('click', function () {

    repas();
    clearInterval(demarrage);
    demarrage = setInterval(snake_en_mouvement, vitesse);

});


/******************************** SNAKE DE BASE *******************************/
// Déclaration des variables pour la tête et le corps du serpent: elles vont déterminer:
// sa position, sa direction et sa vitesse de DÉPART.


var direction = 'droite';
var position_tete = [1, 3];
var position_corps = [[1, 3], [1, 2], [1, 1]];


var snake = function () {
    /************* CODE EN LIEN AVEC LA FONCTION snake_en_mouvement() *********/
    /**** On enlève le style "à l'ancien snake" pour le donner au nouveau *****/

    var spans = document.getElementsByClassName('span');

    for (var i = 0; i < spans.length; i++){
       
        var span = spans[i].classList.remove('styleDuCorps', 'styleDeLaTete');

    }
    /********************** FIN DE GESTION DU STYLE DE L'ANCIEN SNAKE ***********************/

    /****************************POSITION DE DÉPART DU SNAKE **************************************/
    for (var i = 0; i < position_corps.length; i++){
        
        var case_corpsDuSnake = document.getElementById('div ' + position_corps[i][0]).children[position_corps[i][1]];
// console.log(case_corpsDuSnake );

        case_corpsDuSnake.classList.add('styleDuCorps');
    }
   
// console.log(position_corps);


    var case_teteDuSnake = document.getElementById('div ' + position_tete[0]).children[position_tete[1]];
    
    case_teteDuSnake.classList.add('styleDeLaTete');
}


/****************************** FONCTION QUI FAIT BOUGER LE SNAKE ************************************/

var score = 0;
var LesTrucsQueJaime = 0;
var snake_en_mouvement = function () {

    /*************** GESTION DES TOUCHES DIRECTIONNELLES ***************/    
    window.onkeydown = function(event){

        var code = event.keyCode;

        switch (code) {
            case 37: direction = 'gauche';
                break;
            case 38: direction = 'haut';
                break;
            case 39: direction = 'droite';
                break;
            case 40: direction = 'bas';
                break;
        };
    }; /**************************** FIN ******************************/

    /********************* GESTION DE L'AVANCÉE DU SNAKE **********************/
    var nouvelle_position_teteDuSnake = [];
    var tailleDuSnake = position_corps.length;


    if (direction == 'droite') {
        nouvelle_position_teteDuSnake = [position_tete[0], position_tete[1] + 1];
    }
    if (direction == 'bas') {
        nouvelle_position_teteDuSnake = [position_tete[0] + 1, position_tete[1]];
    }
    if (direction == 'gauche') {
        nouvelle_position_teteDuSnake = [position_tete[0], position_tete[1] - 1];
    }
    if (direction == 'haut') {
        nouvelle_position_teteDuSnake = [position_tete[0] - 1, position_tete[1]];
    }/**************************** FIN ******************************/

/********* GESTION DE COLLISION ENTRE LE SNAKE ET L'ENCAS + AGRANDISSEMENT DU SNAKE + SCORE ******/

/* On vérifie la case où se trouve le snake à chacun de ses mouvements:

    - s'il est dans la zone de jeu tout va bien, s'il a la classe 'repas' c'est qu'il entre en collision
    avec un encas, va donc se générer un nouvel encas positionné aléatoirement dans l'area et le snake va grandir, tout comme le score du joueur d'ailleurs.

    - s'il franchit les limites de la zone de jeu : 'GameOver!' */

var div_positionDuSnake = nouvelle_position_teteDuSnake[0];
var span_positionDuSnake = nouvelle_position_teteDuSnake[1];

    // SI LE SNAKE EST DANS L'AREA:
    if (span_positionDuSnake >= 0 && span_positionDuSnake <= 24 && 
        div_positionDuSnake >= 0 && div_positionDuSnake <= 24 ){
        
        
        var case_nouvelle_position_teteDuSnake = document.getElementById('div ' + nouvelle_position_teteDuSnake[0]).children[nouvelle_position_teteDuSnake[1]];

        if(case_nouvelle_position_teteDuSnake.classList.contains('repas')) {

            /******* Apparition du titre 'Ce que j'aime' et du background color *******/
            let titre_CeQueJaime = document.getElementById('titre-ce-que-jaime');
            
            if( titre_CeQueJaime.style.opacity = '0' ){

                titre_CeQueJaime.style.opacity = '1';
            }
            
            let section_CeQueJaime = document.getElementById('ce-que-jaime');
            section_CeQueJaime.style.backgroundColor = '#f4ef88';


            
            /******* Ajout d'une cellule au snake *******/
            position_corps.push([]);

            /******* Suppression et génération d'un autre encas *******/
            repas();

            /******* Actualisation du score, affchage de ce que j'aime et de la possibilité de télécharger le cv une fois 100 points totalisés *******/
            score = score + 10;
            document.getElementById("score").innerHTML = score;


            LesTrucsQueJaime++;
            
            var toutCeQueJaime = document.getElementsByClassName('icone');
            for( let i = 0; i < LesTrucsQueJaime; i++){

                toutCeQueJaime[i].style.opacity = '1';
            }

            let cv = document.getElementById('download_cv');
            let cent_pts = document.getElementById('p-score-100pts');

            if(score == 100){
                cv.style.opacity = '1';
                cent_pts.style.opacity = '1';
            }
            if(score == 120){
                cv.style.opacity = '0';
                cent_pts.style.opacity = '0';
            }
        }


        if(case_nouvelle_position_teteDuSnake.classList.contains('styleDuCorps')) {

            ( function gameOver (){
                        
                clearInterval(demarrage);
            
                // alert('GameOver');

                (function rejouer () {

                    var retour = confirm('GameOver! Une autre partie?');
                    
                    if(retour == true){
                    
                        document.location.reload();

                    } else{
                        
                        alert('On s\'arrête là, aucun problême!');
                    
                    }

                })();
            })();
        }
    }
    else{
        ( function gameOver (){
                    
            clearInterval(demarrage);
        
            // alert('GameOver');

            (function rejouer () {

                var retour = confirm('GameOver! Une autre partie?');
                
                if(retour == true){
                
                    document.location.reload();

                } else{
                    
                    alert('On s\'arrête là, aucun problême!');
                
                }

            })();
        })();
    }
    

/********* FIN DE GESTION D'AGRANDISSEMENT, DE COLLISION ET SCORE ***********/





/************ Boucle avec de laquelle on 'supprime' la dernière case du snake:
 * Chaque case du corps du snake prendra la valeur et la position de celle d'avant
 * ainsi que la classe qui donne le style. **********************************/

    for (var i = tailleDuSnake - 1; i > 0; i--) {
        position_corps[i] = position_corps[i - 1]
    }


    /**** C'est ICI que l'on crée "l'illusion" du mouvement du snake: *****/
    // console.log(position_tete , nouvelle_position_teteDuSnake)
        
    position_corps[0] = position_tete = nouvelle_position_teteDuSnake;

    snake();

}
/**************** FIN DE LA FONCTION QUI FAIT BOUGER LE SNAKE ****************/



/***************************** GESTION DES ENCAS DU SNAKE **************************/

var repas = function () {

    /**************** Suppression du fruit mangé  **************/
    var spans = document.getElementsByClassName('span');

    for (var i = 0; i < spans.length; i++) {

        spans[i].classList.remove('repas');
        spans[i].style.backgroundIimage = 'none';
    }
    /************ Fin de Suppression du fruit mangé  ************/

    var position_fruit = [parseInt(Math.random() * 25), parseInt(Math.random() * 25)];

    var case_fruit = document.getElementById('div ' + position_fruit[0]).children[position_fruit[1]];

    case_fruit.classList.add('repas');
    
};
/************************** FIN DE GESTION DES ENCAS DU SNAKE ************************/




/******* Gestion du changement des images des encas *************/

// ar arrImages = ["../04-imgs/tableau-des-competences/canard-react.jpg", "../04-imgs/tableau-des-competences/icone-css.png"];

// // span.style.background-imag = url(arrImages[index]);
// var index = 0;
// var repas = function () {

//     /**************** Suppression du fruit mangé  **************/
//     var spans = document.getElementsByClassName('span');

//     for (var i = 0; i < spans.length; i++) {

//         spans[i].classList.remove('repas');
//         spans[i].style.backgroundIimage = 'none';
//     }
//     /************ Fin de Suppression du fruit mangé  ************/

//     var position_fruit = [parseInt(Math.random() * 25), parseInt(Math.random() * 25)];

//     var case_fruit = document.getElementById('div ' + position_fruit[0]).children[position_fruit[1]];

//     case_fruit.classList.add('repas');
//     case_fruit.style.backgroundImage = "url(" + arrImages[index] + ")";

//     index++
// };

// const taille_tableau_des_icones = tableau_des_icones.length;
// var tableau_des_icones = ["../04-imgs/tableau/apple.png", "../04-imgs/tableau/avocado.png", "../04-imgs/tableau/html.png", "../04-imgs/tableau/cherries.png", "../04-imgs/tableau/grapes.png", "../04-imgs/tableau/css.png", "../04-imgs/tableau/nut.png", "../04-imgs/tableau/bananes.jpg", "../04-imgs/tableau/sublime.png", "../04-imgs/tableau/pinapple.png", "../04-imgs/tableau/respons.png", "../04-imgs/tableau/strawberry.png", "../04-imgs/tableau/canard-Js.png", "../04-imgs/tableau/watermelon.png", "../04-imgs/tableau/sql.jpg", "../04-imgs/tableau/mongo", "../04-imgs/tableau/node.png", "../04-imgs/tableau/orange.png", "../04-imgs/tableau/react", "../04-imgs/tableau/snake.jpg", "../04-imgs/tableau/graduation.png"];