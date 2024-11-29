// Récupération des éléments HTML
const addition = document.getElementById('price');
const tip5 = document.getElementById('tip5');
const tip10 = document.getElementById('tip10');
const tip15 = document.getElementById('tip15');
const tip25 = document.getElementById('tip25');
const tip50 = document.getElementById('tip50');
const custom = document.getElementById('custom');
const messageErreur = document.getElementById('messageErreur');
const numPerson = document.getElementById('numPerson');
const resetBtn = document.getElementById('resetBtn');

// Variables globales
let tips = 0;
let people = 0;
let personTip = 0;
let totalTip = 0;

// Gestion des pourcentages
tip5.addEventListener('click', () => {
    tips = 5;
    calculTips();
});
tip10.addEventListener('click', () => {
    tips = 10;
    calculTips();
});
tip15.addEventListener('click', () => {
    tips = 15;
    calculTips();
});
tip25.addEventListener('click', () => {
    tips = 25;
    calculTips();
});
tip50.addEventListener('click', () => {
    tips = 50;
    calculTips();
});

custom.addEventListener('input', () => {
    tips = parseFloat(custom.value) || 0; // Retourne 0 si non valide
    if (tips <= 0) {
        console.log('Impossible operation, please enter a valid percentage');
        return;
    }
    calculTips();
});

// Validation du nombre de personnes
numPerson.addEventListener('input', () => {
    people = parseFloat(numPerson.value);
    if (isNaN(people) || people <= 0) {
        messageErreur.style.display = "flex";
    } else {
        messageErreur.style.display = "none";
        calculTips();
    }
});

// Fonction pour calculer le pourboire et le total par personne
function calculTips() {
    let price = parseFloat(addition.value);
    if (isNaN(price) || price <= 0) {
        console.log('Operation impossible pour', price);
        return;
    }

    let tipAmount = price * (tips / 100); // Calculer le pourboire total
    console.log(`Pourboire total : $${tipAmount.toFixed(2)}`);

    if (people > 0) {
        personTip = tipAmount / people; // Pourboire par personne
        totalTip = (price + tipAmount) / people; // Total par personne
        updateDOM(); // Mettre à jour uniquement si valide
    }
}

// Fonction pour afficher les résultats dans le DOM
function updateDOM() {
    document.getElementById('personPrice').textContent = `$${personTip.toFixed(2)}`;
    document.getElementById('totalPrice').textContent = `$${totalTip.toFixed(2)}`;
}

// Fonction pour réinitialiser les champs et le DOM
resetBtn.addEventListener('click', () => {
    addition.value = ""; // Réinitialiser le montant de l'addition
    custom.value = ""; // Réinitialiser le champ Custom
    numPerson.value = ""; // Réinitialiser le nombre de personnes
    tips = 0; // Réinitialiser le pourcentage
    people = 0; // Réinitialiser le nombre de personnes
    personTip = 0; // Réinitialiser le pourboire par personne
    totalTip = 0; // Réinitialiser le total par personne
    updateDOM(); // Mettre à jour le DOM pour afficher "$0.00" partout
    messageErreur.style.display = "none"; // Masquer les erreurs
    console.clear()
});
