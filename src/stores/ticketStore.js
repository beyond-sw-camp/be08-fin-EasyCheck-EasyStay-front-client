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

    groupTicketsByType(tickets) {
      const groupedTickets = {};

      tickets.forEach((ticket) => {
        const typeKey = ticket.ticketName.replace(/ \(대인\)| \(소인\)/g, "");

        if (!groupedTickets[typeKey]) {
          groupedTickets[typeKey] = {
            name: typeKey,
            description: ticket.ticketName.split(" - ")[1] || "",
            adultTicket: null,
            childTicket: null,
            themeParkId: ticket.themeParkId,
          };
        }

        if (ticket.ticketName.includes("대인")) {
          groupedTickets[typeKey].adultTicket = ticket;
        } else if (ticket.ticketName.includes("소인")) {
          groupedTickets[typeKey].childTicket = ticket;
        }
      });

      return Object.values(groupedTickets);
    },
  },
});
