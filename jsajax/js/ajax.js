$(document).ready(function () {
    paivitaTaulukko();
    haeTyypit();
    // haetaan data
    //https://codez.savonia.fi/jussi/api/asiakas/haku.php?nimi=kalle&osoite=teku
    // fetch = () => {
    //     $.get({
    //         url: `https://codez.savonia.fi/jussi/api/asiakas/haku.php?`,
    //         success: (result) => {
    //             showResultInTable(result);
    //         }
    //     });
    // }

    // // bindataan click-event
    // $('#searchBtn').click(() => {
    //     fetch();
    // });
    $("#dialog").dialog({
        autoOpen : false, modal : true, show : "blind", hide : "blind"
    });
    function lisaa() {
        $.post(
            {
                url : `https://codez.savonia.fi/jussi/api/asiakas/lisaa.php`,
                data : $('form.lisays :input[value!=""]').serializeArray(),
                success : (result) => {
                    paivitaTaulukko();
                }
            }
        )
    }
    function poista(avain) {
        $.get(
            {
                url : `https://codez.savonia.fi/jussi/api/asiakas/poista.php`,
                data : {
                    "avain" : avain
                }
            }
        )
        paivitaTaulukko();
    }
    function haeTyypit() {
        $.get(
            {
                url : `https://codez.savonia.fi/jussi/api/asiakas/tyypit.php`,
                success : (result) => {
                    result.forEach(element => {
                        $("select").append("<option value='"+element.avain+"'>"+element.lyhenne+" - "+element.selite+"</option>");
                    });
                }
            }
        )
    }
    $("form.haku").on( "submit", function( event ) {
        event.preventDefault();
        paivitaTaulukko();
    });
    $("form.lisays").on("submit", function(event) {
        event.preventDefault();
        lisaa();
        paivitaTaulukko();
    })
    function paivitaTaulukko() {
                $.get({
                    url : `https://codez.savonia.fi/jussi/api/asiakas/haku.php`,
                    data : $('form.haku :input[value!=""]').serializeArray(),
                    success : (result) => {
                        showResultInTable(result);
                    }
                })
    }
    $("table").on("click", "button", function() {
        var data = $(this).attr("data");
        poista(data);
    });
    $("#lisaaBtn").click(function() {
        $("#dialog").dialog("open");
    })
});
showResultInTable = (result) => {
    var inner = "";
    result.forEach(element => {
        inner += "<tr><td>" + element.nimi + "</td>\n";
        inner += "<td>" + element.osoite + "</td>\n";
        inner += "<td>" + element.postinro + "</td>\n";
        inner += "<td>" + element.postitmp + "</td>\n";
        inner += "<td>" + element.luontipvm + "</td>\n";
        // Tälle voisi olla selkokielinen asiakastyyppi:
        inner += "<td>" + element.asty_avain + "</td>\n";
        inner += "<td><button class='poista' data='"+element.avain+"'>Poista</button></td>\n";
        // tähän esimerkiksi delete-nappi, joka käyttää id tietoa poistoa varten
        inner += "</tr>\n";

    });
    $('#data tbody').html(inner);
}
