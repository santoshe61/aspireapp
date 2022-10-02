<template>
  <q-form @submit="addCard" @reset="resetForm" class="q-gutter-md">
    <q-input
      v-model="newCard.customer_name"
      label="Cardholder name *"
      hint="Name printed on card"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 2) ||
          'Please enter name printed on card, min 3 chars',
      ]"
      maxlength="200"
    />

    <q-input
      type="text"
      v-model="newCard.card_number"
      placeholder="1234 5678 9012 3456"
      label="Card Number *"
      lazy-rules
      :rules="[validateCard.cardNumber]"
      mask="#### #### #### ####"
      maxlength="25"
    />

    <div class="row">
      <div class="col-5">
        <q-input
          type="text"
          v-model="newCard.card_expiry"
          label="Expiry Date *"
          placeholder="mm / yy"
          mask="## / ##"
          lazy-rules
          :rules="[validateCard.cardExpiry]"
          maxlength="7"
          hint="Expiry or valid thru date"
        />
      </div>
      <div class="offset-2 col-5">
        <q-input
          type="text"
          v-model="newCard.card_cvv"
          label="CVV *"
          lazy-rules
          :rules="[validateCard.cardCvv]"
          placeholder="123"
          mask="###"
          maxlength="999"
          hint="Card verification value"
        />
      </div>
    </div>

    <q-toggle
      v-model="newCard.accept"
      label="I accept the terms & policies of Aspire"
    />

    <div>
      <q-btn label="Save Card" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>
<script>
  import { defineComponent, defineEmits, ref, computed, watch } from "vue";
  import { useQuasar } from "quasar";
  import useCardStore from "../stores/card.js";
  import validateCard from "../tools/validators/card.js";

  const emit = defineEmits(["cardAdded"]);

  let newCard = ref({
    accept: false,
  });

  export default defineComponent({
    name: "IndexPage",
    setup() {
      const $q = useQuasar();
      const cardStore = useCardStore();

      function addCard() {
        if (newCard.value.accept !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            position: "top",
            icon: "warning",
            message: "You need to accept the terms and policies first",
          });
        } else {
          let card = {
            ...newCard.value,
            id: Date.now(),
            status: "active",
            company: "aspire",
            card_facility: "Visa",
          };
          cardStore.add(card);
          emit("cardAdded", card);

          $q.notify({
            color: "green-4",
            textColor: "white",
            position: "top",
            icon: "check_circle",
            message: "Card added successfully",
          });
        }
      }

      function resetForm() {
        newCard.value = {
          accept: false,
        };
      }
      return {
        addCard,
        resetForm,
        newCard,
        validateCard,
      };
    },
  });
</script>
