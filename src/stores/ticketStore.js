import { defineStore } from "pinia";
import apiClient from "@/api";
import dayjs from "dayjs";

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    tickets: [],
    adultTicket: null,
    childTicket: null,
  }),

  getters: {
    groupedTickets: (state) => {
      if (!state.tickets || !Array.isArray(state.tickets)) {
        return [];
      }

      const today = dayjs();
      const validTickets = state.tickets.filter((ticket) => {
        const saleStart = dayjs(ticket.saleStartDate);
        const saleEnd = dayjs(ticket.saleEndDate);
        return today.isAfter(saleStart) && today.isBefore(saleEnd);
      });

      const groupedTickets = {};

      validTickets.forEach((ticket) => {
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
    adultTicketId: (state) => state.adultTicket.id,
    childTicketId: (state) => state.childTicket.id,
  },

  actions: {
    selectTicket(groupedTicket) {
      this.childTicket = groupedTicket.childTicket;
      this.adultTicket = groupedTicket.adultTicket;
    },
    async fetchTickets(themeParkId) {
      console.log(`[ticketStore] - fetchTickets themeParkId = ${themeParkId}`);

      try {
        const response = await apiClient.get(`/parks/${themeParkId}/tickets`);
        this.tickets = response.data.data;
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
  },
});
