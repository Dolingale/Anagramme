// Récupérer le bouton
let button = document.querySelector('button');
// Récupérer le champ de texte
let word = document.querySelector('input');
// Récupérer le ul où seront affichés tous les pseudos générés
let ul = document.querySelector('ul');
// Créer un tableau où vont les différentes lettres du mot
let letterArray = [];
// Créer un tableau indexé où vont les différentes lettres du mot avec leur quantité
let secondLetterArray = [];
// Créer un tableau où vont tous les pseudos générer
let pseudosArray = [];
// Créer une variable pour la différence entre le nombre de lettres dans le mot et le nombre de possibilités
let differenceLetter = 0;
// Fonction qui permets de garder le dernier mot rentrer dans le champ de texte
let lastInputValue = ' '
// Iniatilise le compteur de pseudos possibles à 0
let count = 0;
// Crée un premier tableau avec les possibilités possibles que l'on viendra modifier après.
let falseCountArray = [];
// Crée un deuxième tableau où l'on va mettre qu'un donnée sur deux du premier tableau
let trueArrayCount = [];
// Compteur que l'on va incrémenter de 2 pour Récupérer qu'une valeur sur deux du premier tableau et l'ajouter dans le deuxième tableau
let trueCount = 0;
// Compteur du nombre de possibilités finales
let finalPossibilities = 0;
// Initialisation du compteur à 0 pour le calcul du nombre de possibilités
let initializeCounter = 0;
// Initialisation du VRAI nombre de possibilités à 0
let globalPossibilities = 0


// Action à réaliser lors de l'appui du bouton
button.addEventListener('click', () => {

    // Vérifier si le mot dans le champ de texte est le même que le dernier
    for (let i = 0; i < 2; i++) {
        //   Si il est différent on remplace le mot et on vide le tableau des lettres du mot ainsi que les pseudos qui ont été générés pour un autre mot
        if (lastInputValue !== word.value) {
            lastInputValue = word.value;
            letterArray = [];
            pseudosArray = [];
            secondLetterArray = [];
            //   S'il n'est pas différent on continue
        } else {
            // Pour chaque lettre du mot
            for (let i = 0; i < word.value.length; i++) {
                // On vérifie si la lettre du mot est déjà dans le tableau
                if (letterArray.indexOf(word.value[i]) === -1) {
                    // Si elle n'y est pas, on ajoute la lettre au tableau
                    letterArray.push(word.value[i]);
                    secondLetterArray[word.value[i]] = 1;
                } else {
                    // Si elle y est déjà, on ne fait rien
                    letterArray.push(word.value[i]);
                    secondLetterArray[word.value[i]] += 1;
                }
            }

            // Différences entre le nombre de lettres dans le mot et le nombre de mots disponibles
            differenceLetter = word.value.length - letterArray.length;
            // Calcul du nombre final de possibilités
            possibilities = word.value.length - differenceLetter;

            // Factorisation sur la longueur du mot
            let factAllWord = fact(word.value.length);
            // Calcul le nombre de possibilités en prenant en compte la récursivité des lettres
            globalPossibilities = factAllWord / (calcul(secondLetterArray, letterArray));

            //   Exécuter la fonction qui vérifie si ce pseudo est déjà dans le tableau, sinon qui en génére un autre
            verifyPseudos(letterArray);
        }
    }
});

// fonction qui va calculer le nombre de pseudos possibles à générer en fonction du nombre de lettres et leurs récursivité
function calcul(secondLetterArray, letterArray) {
    // Initialise à 1 le nombre de possibilité
    let possible = 1;
    // Initialise un tableau vide où l'on stocke les différentes lettres du mot
    let detArray = [];

    // Pour chaque lettre du mot, on les ajoutent dans un nouveau tableau sauf si la lettre y est déjà
    for (let c = 0; c < letterArray.length; c++) {
        if (detArray.indexOf(letterArray[c]) === -1) {
            detArray.push(letterArray[c]);
        }
    }

    // Pour chaque lettre dans le tableau indexé on calcule le nombre de possibilités en multipliant le nombre de récurrence de chaque lettre (nombre qui à été factorisé)
    for (let d = 0; d < detArray.length; d++) {
        if (secondLetterArray[detArray[d]] === 1) {
            // NADA et pas NADAl lul
        } else {
            possible *= fact(secondLetterArray[detArray[d]]);
        }
    }
    // Retourne le nombre de possibilités finales
    return possible;
}

// Création d'une fonction qui calcule et retourne un nombre factorisé
function fact(nbr) {
    var i,nbr,f = 1;
    for (i = 1; i <= nbr; i++) {
        f *= i
    }
    return f
}


// Création de la fonction qui va calculer le nombre de possibilités
function possibility(possibilities) {
    // On réinitialse toutes les valeurs par défauts si jamais l'utilisateur rentre un nouveau mot
    falseCountArray = [];
    trueArrayCount = [];
    finalPossibilities = 0;
    trueCount = 0;
    finalPossibilities = 0;
    initializeCounter = 0;

    // On met par défaut le compteur au nombre de possibilités
    count = possibilities;

    // On multiplie le nombre de possibilités * (le nombre de possibilités - 1)
    for (let i = 0 - possibilities; i < possibilities; i++) {
        falseCountArray.push(possibilities * (possibilities - 1));
        possibilities--;
    }

    // Si le tableau contient un 0 on le remplace par un 1
    if (falseCountArray.indexOf(0) !== -1) {
        falseCountArray[falseCountArray.indexOf(0)] = 1;
    }

    // On prend une valeur sur deux dans le premier tableau et on l'ajoute dans le deuxième
    for (let j = 0; j < falseCountArray.length / 2; j++) {
        trueArrayCount.push(falseCountArray[trueCount]);
        trueCount += 2;
    }

    // On multiplie tous les éléments du deuxième tableau entre export default
    let lengthTrueArray = trueArrayCount.length;

    // On calcule toutes les possibilités de pseudos
    finalPossibilities = trueArrayCount[0];
    for (let index = 0; index < lengthTrueArray; index++) {
        if (index !== 0) {
            finalPossibilities *= trueArrayCount[index];
        } else {
            // On ne fait rien
        }
    }
    // On retourne la valeur
    // console.log(finalPossibilities);
    return finalPossibilities;
}

// Création d'un fonction qui mélange les lettres dans le tableau.
function mixLetters(letterArray) {
    return letterArray.sort(() => Math.random() - 0.5);
}

// Créer une fonction pour voir si le pseudo est dans le tableau des différentes possibilités sinon on mélange les lettres et crée un nouveau pseudo avec une autre fonction et on revérifie si le nouveau pseudo est déja dans le tableau, etc...

function generatePseudal(letterArray) {
  // On joint tous les lettres présentes dans le tableau des lettres pour former un pseudo
    inputValue = letterArray.join('');
    return inputValue;
}


function verifyPseudos(letterArray) {
  // Tant que la longueur du tableau qui contient tous les pseudos générés est inférieur au nombre de possibilités calculés on boucle 
  while (pseudosArray.length < globalPossibilities) {
        // Si le pseudo est déja dans le tableau on appelle la fonction de mélange
        if (pseudosArray.indexOf(generatePseudal(letterArray)) !== -1) {
            generatePseudal(mixLetters(letterArray));
            // Si le pseudo n'est pas déja dans le tableau on l'ajoute et on appelle la fonction de mélange
            
        } else {
            pseudosArray.push(generatePseudal(letterArray));
            generatePseudal(mixLetters(letterArray));
        }
    }
    
    // On vide tous les li présents dans l'UL
    ul.innerHTML = '';

    // Pour chaque pseudo dans le tableau on ajoute un <li> en HTML
    for (let p = 0; p < pseudosArray.length; p++) {
      var newLi = document.createElement('li');
      newLi.innerHTML = p + 1 + '. ' + pseudosArray[p];
      newLi.classList.add("pseudo_li");
      document.querySelector('#pseudos_ul').appendChild(newLi);
      
    }
    console.log('Tous les pseudos ont été générés');
}

