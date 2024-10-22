import { defineStore } from "pinia";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
export const useAppStore = defineStore("storeId", {
  state: () => ({
    bootstrap,
  }),
});

import { useThemeParkStore } from "@/stores/themeparkStore";
import { useAccommodationStore } from "@/stores/accommodationStore";
import { useAttractionStore } from "@/stores/attractionStore";
import { useTicketStore } from "@/stores/ticketStore";

export {
  useThemeParkStore,
  useAccommodationStore,
  useAttractionStore,
  useTicketStore,
};
