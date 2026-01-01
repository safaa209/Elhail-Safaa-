 /* NAVIGATION */
function showSection(id) {
    document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

/* LOGOUT */
function logout() {
    if (confirm("Se déconnecter ?")) {
        localStorage.clear();
        location.reload();
    }
}

/* ================= PATIENTS ================= */
let patients = JSON.parse(localStorage.getItem("patients")) || [];

function ajouterPatient() {
    let p = {
        nom: p_nom.value,
        date: p_date.value,
        tel: p_tel.value,
        sexe: p_sexe.value
    };
    if (!p.nom || !p.date || !p.tel) return alert("Remplir tous les champs");
    patients.push(p);
    savePatients();
}

function savePatients() {
    localStorage.setItem("patients", JSON.stringify(patients));
    afficherPatients();
}

function afficherPatients() {
    patientsTable.innerHTML = "";
    patients.forEach((p, i) => {
        patientsTable.innerHTML += `
        <tr>
            <td>${p.nom}</td>
            <td>${p.date}</td>
            <td>${p.tel}</td>
            <td>${p.sexe}</td>
            <td><button onclick="supprimerPatient(${i})">🗑️</button></td>
        </tr>`;
    });
}

function supprimerPatient(i) {
    if (!confirm("Voulez-vous supprimer ce patient ?")) return ;
    patients.splice(i,1);
    savePatients();
}

afficherPatients();

/* ================= DOCTEURS ================= */
let docteurs = JSON.parse(localStorage.getItem("docteurs")) || [];

function ajouterDocteur() {
    if (!d_nom.value || !d_spec.value) return alert("Champs vides");
    docteurs.push({nom:d_nom.value, spec:d_spec.value});
    localStorage.setItem("docteurs", JSON.stringify(docteurs));
    afficherDocteurs();
}

function afficherDocteurs() {
    docteursTable.innerHTML = "";
    docteurs.forEach((d,i)=>{
        docteursTable.innerHTML += `
        <tr>
            <td>${d.nom}</td>
            <td>${d.spec}</td>
            <td><button onclick="supprimerDocteur(${i})">🗑️</button></td>
        </tr>`;
    });
}

function supprimerDocteur(i){
    if (!confirm("Supprimer ce docteur ?")) return;
    docteurs.splice(i,1);
    localStorage.setItem("docteurs", JSON.stringify(docteurs));
    afficherDocteurs();
}

afficherDocteurs();

/* ================= RECEPTION ================= */
let rdvs = JSON.parse(localStorage.getItem("rdvs")) || [];

function ajouterRDV() {
    if (!r_patient.value || !r_date.value) return alert("Champs vides");
    rdvs.push({patient:r_patient.value, date:r_date.value});
    localStorage.setItem("rdvs", JSON.stringify(rdvs));
    afficherRDV();
    showMsg("Rendez-vous ajouté avec succès ");
}

function afficherRDV() {
    rdvTable.innerHTML = "";
    rdvs.forEach((r,i)=>{
        rdvTable.innerHTML += `
        <tr>
            <td>${r.patient}</td>
            <td>${r.date}</td>
            <td><button onclick="supprimerRDV(${i})">🗑️</button></td>
        </tr>`;
    });
}

function supprimerRDV(i){
    if (!confirm("Supprimer ce rendez-vous ?")) return;
    rdvs.splice(i,1);
    localStorage.setItem("rdvs", JSON.stringify(rdvs));
    afficherRDV();
}

afficherRDV();
function showMsg(text) {
    let msg = document.getElementById("msg");
    msg.innerText = text;
    msg.classList.remove("hidden");

    setTimeout(() => {
        msg.classList.add("hidden");
    }, 2000);
}