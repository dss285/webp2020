"use strict";
function kysyNimi() {
    var data = prompt("Nimi")
    var nimielementti = document.createElement("p");
    nimielementti.innerHTML = data.toUpperCase();
    var body = document.querySelector("body");
    body.appendChild(nimielementti);
}