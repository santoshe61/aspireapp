<template>
  <q-card
    class="transaction-card__transaction"
    flat
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar size="xl" :class="`bg-${txn.icon.cssClass}`">
          <img
            :src="`/icons/${txn.icon.name}.svg`"
            class="transaction-card__transaction--avatar"
          />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-dark-page flex">
          {{ txn.pos }}
          <q-space />
          <span
            class="text-right text-positive text-bold"
            v-if="txn.type != 'D'"
          >
            + {{ txn.currency }} {{ txn.amount }}</span
          >
          <span class="text-right text-bold" v-else
            >- {{ txn.currency }} {{ txn.amount }}</span
          >
        </q-item-label>
        <q-item-label caption>
          {{ new Date(txn.date).toLocaleDateString() }}
        </q-item-label>
        <p class="q-mt-sm text-primary">
          <q-badge
            color="primary"
            class="q-py-xs transaction-card__transaction--finance-badge"
          >
            <img src="/icons/business-and-finance.svg" />
          </q-badge>
          {{
            txn.type == "D" ? "Charged to debit card" : "Refund on debit card"
          }}
        </p>
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
  import { defineComponent, computed } from "vue";

  export default defineComponent({
    name: "TransactionView",
	props: ["txn"],
    setup(prop) {
      return {

      };
    },
  });
</script>
