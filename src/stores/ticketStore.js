import { defineStore } from "pinia";
import apiClient from "@/api";

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    tickets: [],
    currentTicket: null,
  }),

  getters: {
    allTickets: (state) => state.tickets,
    currentTicketDetails: (state) => state.currentTicket,
  },

  actions: {
    async fetchTickets(themeParkId) {
      try {
        const response = await apiClient.get(`parks/${themeParkId}/tickets`);
        this.tickets = response.data;
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    },

    async fetchTicket(themeParkId, ticketId) {
      try {
        const response = await apiClient.get(
          `parks/${themeParkId}/tickets/${ticketId}`
        );
        this.currentTicket = response.data;
      } catch (error) {
        console.error(`Failed to fetch ticket with id ${ticketId}:`, error);
      }
    },

    setCurrentTicketById(ticketId) {
      const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
      if (ticket) {
        this.currentTicket = ticket;
      } else {
        console.error("Invalid ticket id");
      }
    },
  },
});
