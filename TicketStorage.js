import { v4 as uuidv4 } from 'uuid';
import data from './data.json' assert { type: 'json' };

export default class TicketStorage {
  constructor() {
    this.tickets = data;
  }

  create(ticketData) {
    const ticket = {
      ...ticketData,
      id: uuidv4()
    };
    this.tickets.push(ticket);

    return ticket;
  }

  update(ticketId, newTicketData) {
    const ticketIndex = this.tickets.findIndex(ticket => ticket.id === ticketId);

    if (ticketIndex !== -1) {
      this.tickets[ticketIndex] = {
        ...this.tickets[ticketIndex],
        ...newTicketData
      }
    }

    return this.tickets[ticketIndex];
  }

  delete(ticketId) {
    this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
  }

  get(ticketId) {
    return this.tickets.find(ticket => ticket.id === ticketId);
  }

  getAll() {
    return this.tickets.map(({ id, name, status, created }) => ({ id, name, status, created }));
  }
}
