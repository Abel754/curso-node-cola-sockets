// Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnCrear.disabled = false; // Habilitem el botó

});

socket.on('ultimo-ticket', ( ultimo ) => {
        
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
    
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCrear.disabled = true; // Deshabilitem el botó
});


btnCrear.addEventListener( 'click', () => {
    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});