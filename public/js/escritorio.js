
// Referencias HTML
const lblEscritorio = document.querySelector('h1'); // El primer h1 que troba
const btnAtender = document.querySelector('button'); 
const lblTicket = document.querySelector('small'); 
const divAlerta = document.querySelector('.alert'); 
const lblPendientes = document.querySelector('#lblPendientes');

// El que fa tot això: si no té un paràmetre get 

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio'); // Agafem el _GET d'escritorio
lblEscritorio.innerText = 'Escritorio ' + escritorio;
divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');

    btnAtender.disabled = false; // Habilitem el botó

});


socket.on('tickets-pendientes', (pendientes) => {
    if( pendientes === 0 ) {
        lblPendientes.style.display = 'none';
    }
    lblPendientes.innerText = pendientes;
});


socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnAtender.disabled = true; // Deshabilitem el botó
});


btnAtender.addEventListener( 'click', () => {
    
    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => { // Enviem escritorio com un objecte i desestructurem el que ve d'ok i ticket al fer un .on('atender-ticket') a controller.js
        
        if( !ok ) {
            lblTicket.innerText = 'Nadie.';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.numero;

    });

});