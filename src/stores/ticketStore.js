import { defineStore } from "pinia";
import apiClient from "@/api";

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    tickets: [],
    adultTicket: null,
    childTicket: null,
    themePark: null,
  }),

  getters: {
    allTickets: (state) => state.tickets,
    currentAdultTicket: (state) => state.adultTicket,
    currentChildTicket: (state) => state.childTicket,
    currentThemePark: (state) => state.themePark,
  },

  actions: {
    async fetchTickets(themeParkId) {
      try {
        const response = await apiClient.get(`/parks/${themeParkId}/tickets`);
        this.tickets = response.data;
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      }
    },

    async fetchAdultTicket(adultTicketId) {
      try {
        const response = await apiClient.get(`/parks/${adultTicketId}`);
        this.adultTicket = response.data.data;
      } catch (error) {
        console.error(
          `Failed to fetch adult ticket with id ${adultTicketId}:`,
          error
        );
      }
    },

    async fetchChildTicket(childTicketId) {
      try {
        const response = await apiClient.get(`/parks/${childTicketId}`);
        this.childTicket = response.data.data;
      } catch (error) {
        console.error(
          `Failed to fetch child ticket with id ${childTicketId}:`,
          error
        );
      }
    },

    async fetchThemePark(themeParkId) {
      try {
        const response = await apiClient.get(`/parks/${themeParkId}`);
        this.themePark = response.data.data;
      } catch (error) {
        console.error(
          `Failed to fetch theme park with id ${themeParkId}:`,
          error
        );
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
