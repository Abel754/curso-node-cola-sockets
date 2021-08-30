const path = require('path');
const fs = require('fs');

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate(); // Imprimeix el dia actual
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        const { hoy, tickets, ultimos4,ultimo } = require('../db/data.json');
        if( hoy === this.hoy ) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro día
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );
    }

    siguiente() {
        this.ultimo = this.ultimo + 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket );

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio ) {
        // No queden tickets
        if( this.tickets.length === 0 ) {
            return null;
        }

        const ticket =  this.tickets.shift(); // Borra el primer element de l'array i el retorna           
        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket ); // Afegeix al principi de l'array

        if( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1); // Elimina l'últim element amb el primer paràmetre (-1) i amb el segon (1) Li indiquem que esborrarem només un
        }

        this.guardarDB();

        return ticket;
    }


}


module.exports = TicketControl;