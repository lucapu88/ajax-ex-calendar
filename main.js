//Creazione di un calendario utilizzando la library moment.js. In aggiunta al calendario aggiungo le festività richiamate da un API (che mi restituisce solo quelle del 2018, perciò il calendario farà riferimento solo all'anno 2018).
$(document).ready(function() {
  var template_html = $('#myTemplate').html();//recupero il codice html del template
  var template_function = Handlebars.compile(template_html);//do in pasto a handlebars il codice html
  var dataIniziale = '2018-01-01';
  var momentIniziale = moment(dataIniziale); //creo un clone della data iniziale
  var ultimaData = '2018-12-31'; //creo una var che mi prende l'ultima data
  var primaData = '2018-01-01'; //creo una var che mi prende la prima data
  stampaMese(momentIniziale); //chiamo la mia funzione per visualizzare il calendario con il mese di gennaio
  stampaFeste(momentIniziale); //stampo il calendario aggiornato con le festività
    $('.next-right').click(function(){ //al click sul pulsante di destra
      var data_li_last = $('ul li:last-child').attr('dataDay'); //creo una var che mi prende l'attributo dell'ultimo li
      if (data_li_last != ultimaData ) { //se l'ultimo li è diverso da ultimaData
        $('button').css("color","black"); //reimposto il colore ai button nel caso si è verificato l'else
        momentIniziale.add(1, 'months'); //aggiungo un mese alla data da visualizzare
        stampaMese(momentIniziale); //stampo il calendario aggiornato
        stampaFeste(momentIniziale); //stampo il calendario aggiornato con le festività
      } else { //altrimenti se è uguale a quella data (2018-12-31)
        $('.next-right').css("color","white"); //cambio il colore al button di destra per far capire che non può andare oltre
        alert("Il calendario è disponibile solo per l'anno 2018"); //mi appare un alert dove mi avvisa che il calendario non è disponibile per altri anni
      }
    });
    $('.prev-left').click(function(){ //al click sul pulsante di sinistra
      var data_li_first = $('ul li:first-child').attr('dataDay'); //creo una var che mi prende l'attributo del primo li
      if (data_li_first != primaData) { //se il primo li è diverso da primaData
        $('button').css("color","black"); //reimposto il colore ai button nel caso si è verificato l'else
        momentIniziale.subtract(1, 'months'); //tolgo un mese alla data da visualizzare
        stampaMese(momentIniziale); //stampo il calendario aggiornato
        stampaFeste(momentIniziale); //stampo il calendario aggiornato con le festività
      } else { //altrimenti se è uguale a quella data (2018-01-01)
        $('.prev-left').css("color","white"); //cambio il colore al button di sinistra per far capire che non può andare oltre
        alert("Il calendario è disponibile solo per l'anno 2018"); //mi appare un alert dove mi avvisa che il calendario non è disponibile per altri anni
      }
    });

//---------------------------------------------FUNZIONI-------------------------------------------------------
//funzione che mi va ad appendere il calendario aggiornato
function stampaMese(mese) {
  $('#calendario').empty(); //svuoto il calendario
  var dataMeseGiorno = moment(mese); //mi creo un clone della data del mese per inserirlo dentro al dataDay
  var giorniMese = mese.daysInMonth(); //recupero i giorni del mese
  var meseTesto = mese.format('MMMM'); //imposto come deve essere visualizzato il mese
  var settimanaTesto = mese.format('dddd'); //imposto come deve essere visualizzato il giorno
  $('#meseCorrente').text(meseTesto); //imposto il mese che andrà dentro lo span
  for (var i = 1; i <= giorniMese; i++) { //ciclo tutti i giorni del mese
    var context = { //creo il contenuto che andrà nel mio template
      day : i + ' ' + settimanaTesto,
      formatDay : dataMeseGiorno.format('YYYY-MM-DD')
    }
    var html_finale = template_function(context);
    $('#calendario').append(html_finale); //appendo il mio template
    dataMeseGiorno.add(1, 'days'); //incremento di uno i giorni altrimenti mi stampa sempre 1.
  }
}

//funzione che fa una chiamata ajax e mi va a prendere tutte le festività del 2018
function stampaFeste(mese) {
  $.ajax({
    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    data: {
      'year': 2018,
      'month': mese.month()
    },
    method: 'GET',
    success: function(data) {
      var festivo = data.response; //creo una var con l'array dove ci sono le festività
      for (var i = 0; i < festivo.length; i++) { //scorro tutto l'array dove ci sono le festività
        var festivoAttuale = festivo[i];
        var dateFesta = festivoAttuale.date; //mi creo una var per le date dei festivi
        var nomeFesta = festivoAttuale.name; //mi creo una var per i nomi delle feste
        $('#calendario li[dataDay="' + dateFesta + '"]').addClass('festa').append('-' + nomeFesta); //appendo il nome per la corrispettiva data della festa
      }
    },
    error: function() {
      alert('errore festività');
    }
  });
}
});
