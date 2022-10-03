<template>
  <div class="q-my-md my-card">
    <div class="flex">
      <q-space />
      <q-btn
        v-if="card.isVisible"
        color="white"
        no-caps
        text-color="positive"
        unelevated
        class="my-card-btn__show-number"
        @click="toggleCard(card.id)"
      >
        <!-- <img src="/icons/remove_red_eye-24px.svg" /> -->
        <span class="q-ml-sm">Hide card number</span>
      </q-btn>
      <q-btn
        v-else
        color="white"
        no-caps
        text-color="positive"
        unelevated
        class="my-card-btn__show-number"
        bordered
        @click="toggleCard(card.id)"
      >
        <img src="/icons/remove_red_eye-24px.svg" />
        <span class="q-ml-sm">Show card number</span>
      </q-btn>
    </div>
    <q-card class="bg-positive desktop__credit-card q-pa-sm" unelevated>
      <q-card-section class="flex">
        <q-space />
        <img v-if="card.company == 'aspire'" src="/Logo-lg.svg" />
		<span v-else class="text-bold q-mr-lg">Other</span>
      </q-card-section>
      <q-card-section>
        <h4>{{ card.customer_name }}</h4>
        <p class="q-mt-lg q-mb-sm">
          <span v-if="card.isVisible" class="my-card__card-number">{{
            card.card_number.slice(0, -4)
          }}</span>
          <span v-else>
            <small v-for="count in 3" :key="count" class="q-mr-sm">
              <q-icon name="lens" size="xs" class="my-card__mask-icon" />
              <q-icon name="lens" size="xs" class="my-card__mask-icon" />
              <q-icon name="lens" size="xs" class="my-card__mask-icon" />
              <q-icon name="lens" size="xs" class="my-card__mask-icon" />
            </small>
          </span>
          <span class="my-card__card-number">{{
            card.card_number.slice(-4)
          }}</span>
        </p>
        <div class="row">
          <div class="col-5">
            <p>Thru: {{ card.card_expiry }}</p>
          </div>
          <div class="col-5">
            <p>
              CVV:
              <span v-if="card.isVisible">{{ card.card_cvv }}</span>
              <span class="text-h5" v-else>***</span>
            </p>
          </div>
          <div class="col-2">
            <img
              :src="`/icons/${facilityLogo[card.card_facility]}`"
              class="my-card__facility-logo"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
  import { defineComponent, ref } from "vue";
  import useUserStore from "../stores/user.js";

  let facilityLogo = {
    Visa: "Facility-Visa.svg",
    Master: "Facility-Master.svg",
    Aspire: "Facility-Aspire.svg",
  };

  export default defineComponent({
    name: "CreditCardView",
    props: ["card"],
    setup(props) {
      const userStore = useUserStore();
      function toggleCard(id) {
        userStore.cards = userStore.cards.map((card) => {
          if (card.id == id) {
            card.isVisible = !card.isVisible;
          }
          return card;
        });
      }

      return {
        facilityLogo,
        toggleCard,
      };
    },
  });
</script>
