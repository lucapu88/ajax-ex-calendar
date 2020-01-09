//Creazione di un calendario utilizzando la library moment.js. In aggiunta al calendario aggiungo le festività richiamate da un API (che mi restituisce solo quelle del 2018, perciò il calendario farà riferimento solo all'anno 2018).
$(document).ready(function() {
  var template_html = $('#myTemplate').html();//recupero il codice html del template
  var template_function = Handlebars.compile(template_html);//do in pasto a handlebars il codice html
  var dataIniziale = '2018-01-01';
  var momentIniziale = moment(dataIniziale);
  stampaMese(momentIniziale); //chiamo la mia funzione per visualizzare il calendario con il mese di gennaio
  $('.next-right').click(function(){ //al click sul pulsante di destra
    momentIniziale.add(1, 'months'); //aggiungo un mese alla data da visualizzare
    stampaMese(momentIniziale); //e stampo il calendario aggiornato
  });
  $('.prev-left').click(function(){ //al click sul pulsante di sinistra
    momentIniziale.subtract(1, 'months'); //tolgo un mese alla data da visualizzare
    stampaMese(momentIniziale); //e stampo il calendario aggiornato
  });

//---------------------------------------------FUNZIONI-------------------------------------------------------
//funzione che mi va ad appendere il calendario aggiornato
function stampaMese(mese) {
  $('#calendario').empty(); //svuoto il calendario
  var giorniMese = mese.daysInMonth(); //recupero i giorni del mese
  var meseTesto = mese.format('MMMM') //imposto come deve essere visualizzato
  $('#meseCorrente').text(meseTesto); //imposto il mese che andrà dentro lo span
  for (var i = 1; i <= giorniMese.length; i++) { //ciclo tutti i giorni del mese
    var context = { //creo il contenuto che andrà nel mio template
      day : i + ' ' + meseTesto
    }
    var html_finale = template_function(context);
    $('#calendario').append(html_finale); //appendo il mio template
  }
}
});
