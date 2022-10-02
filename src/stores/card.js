import { defineStore } from 'pinia';

export default defineStore('card', {
  state: () => ({
    cards: [
      {
        id: 1,
        status: "active",
        company: "aspire",
        customer_name: "Santosh Ojha",
        card_number: "1234 5678 9012 3456",
        card_expiry: "08 / 25",
        card_cvv: "999",
        card_facility: "Visa",
      },
      {
        id: 2,
        status: "active",
        company: "aspire",
        customer_name: "Mr. Santosh",
        card_number: "9999 8888 7777 6666",
        card_expiry: "01 / 25",
        card_cvv: "765",
        card_facility: "Master",
      },
      {
        id: 4,
        status: "active",
        company: "other",
        customer_name: "Mr. Ojha",
        card_number: "2222 3333 4444 5555",
        card_expiry: "01 / 25",
        card_cvv: "888",
        card_facility: "Visa",
      },
      {
        id: 5,
        status: "active",
        company: "other",
        customer_name: "Mr. Thanh",
        card_number: "6666 5551 4444 3333",
        card_expiry: "01 / 25",
        card_cvv: "676",
        card_facility: "Visa",
      },
    ],
  }),
  actions: {
    add(card) {
      this.cards.push(card);
    },
  },
});
