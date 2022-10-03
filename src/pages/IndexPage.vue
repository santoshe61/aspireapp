<template>
  <q-page class="text-light">
    <q-toolbar>
      <q-space />
      <q-avatar class="d-mobile-only" size="26px">
        <img src="/Logo.svg" />
      </q-avatar>
    </q-toolbar>
    <div class="mobile__text-white">
      <q-toolbar-title class="main-title"> Account balance </q-toolbar-title>
      <div class="row items-center">
        <div class="col-auto">
          <q-badge color="positive" class="curreny-badge"> S$ </q-badge>
        </div>
        <div class="col">
          <h3 class="q-ml-md">{{ account.balance }}</h3>
        </div>
        <div class="col-auto">
          <q-btn
            :flat="isMobile"
            :dense="isMobile"
            no-caps
            color="primary"
            @click="newCardDialog = true"
          >
            <img v-if="isMobile" src="/icons/Box.svg" />
            <img v-else src="/icons/box-white.svg" />
            <span :class="{ 'q-ml-sm': true, 'text-info': isMobile }"
              >New card</span
            >
          </q-btn>
          <q-dialog
            v-model="newCardDialog"
            persistent
            transition-show="flip-down"
          >
            <q-card>
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Add new card</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                <CreditCardNew @cardAdded="cardAdded" />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
        <q-space />
      </div>
    </div>
    <q-tabs
      v-model="tab"
      indicator-color="info"
      class="text-grey-5"
      dense
      align="left"
      no-caps
      :active-color="isMobile ? 'white' : 'black'"
      :breakpoint="0"
    >
      <q-tab name="cards--my-debit" label="My debit cards" />
      <q-tab name="cards--all-company" label="All company cards" />
    </q-tabs>
    <q-card class="row mobile__bg-dark mobile__no-box-shadow desktop__card">
      <div class="col-12 col-md-6 desktop__p-xl">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          navigation
          padding
          height="328px"
          class="mobile__bg-dark mobile__mt-xl text-white rounded-borders"
          v-if="currentTabCards.length > 0"
        >
          <template v-slot:navigation-icon="{ active, btnProps, onClick }">
            <q-btn
              v-if="active"
              size="xs"
              :icon="btnProps.icon"
              color="positive"
              flat
              round
              dense
              @click="onClick"
            />
            <q-btn
              v-else
              size="xs"
              :icon="btnProps.icon"
              :color="isMobile ? 'blue-grey-9' : 'light-green-2'"
              flat
              round
              dense
              @click="onClick"
            />
          </template>
          <q-carousel-slide
            v-for="card in currentTabCards"
            :key="card.id"
            :name="card.id"
            :class="`column no-wrap flex-center q-pa-none ${card.status}`"
          >
            <CreditCardView :card="card"/>

          </q-carousel-slide>
        </q-carousel>
        <div
          v-else
          class="q-my-xl mobile__bg-dark desktop__credit-card text-white rounded-borders my-card disabled"
        >
          <q-card class="bg-grey-5 q-pa-sm" unelevated>
            <q-card-section class="flex">
              <q-space />
              <img src="/Logo-lg.svg" />
            </q-card-section>
            <q-card-section>
              <h4>No Card found</h4>
              <p class="q-mt-lg q-mb-sm">
                <span>
                  <small v-for="count in 4" :key="count" class="q-mr-sm">
                    <q-icon name="lens" size="xs" class="my-card__mask-icon" />
                    <q-icon name="lens" size="xs" class="my-card__mask-icon" />
                    <q-icon name="lens" size="xs" class="my-card__mask-icon" />
                    <q-icon name="lens" size="xs" class="my-card__mask-icon" />
                  </small>
                </span>
              </p>
              <div class="row">
                <div class="col-5">&nbsp;</div>
                <div class="col-5">&nbsp;</div>
                <div class="col-2"></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-card class="transaction-card q-mt-md" flat>
          <q-card-section class="bg-secondary">
            <ActionMenu @cardCanceled="cardCanceled" :slide="slide" :currentTabCards="currentTabCards" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card class="transaction-card border-radius-none" flat>
          <div class="transaction-card__main-area">
            <q-expansion-item
              class="transaction-card__transaction--header overflow-hidden"
              icon="img:/icons/Cards.svg"
              expand-icon="img:/icons/down-arrow.svg"
              label="Card details"
              header-class="bg-accent q-pa-lg"
              expand-icon-class="text-white"
            >
              <q-card>
                <q-card-section class="text-muted">
                  Nothing to show here
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              class="transaction-card__transaction--header overflow-hidden q-mt-lg"
              icon="img:/icons/Transactions.svg"
              expand-icon="img:/icons/down-arrow.svg"
              label="Recent transactions"
              header-class="bg-accent q-pa-lg"
              expand-icon-class="text-white"
            >
              <q-card
                class="transaction-card__transaction"
                flat
                v-for="txn in transactions"
                :key="txn.id"
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
                        txn.type == "D"
                          ? "Charged to debit card"
                          : "Refund on debit card"
                      }}
                    </p>
                  </q-item-section>
                </q-item>
              </q-card>
              <q-card class="bg-light-green-1 q-pb-sm q-pt-lg cursor-pointer">
                <p class="text-positive text-center">
                  View all card transactions
                </p>
              </q-card>
            </q-expansion-item>
          </div>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script>
  import { defineComponent, ref, computed, watch } from "vue";
  import { useQuasar } from "quasar";
  import CreditCardNew from "../components/CreditCardNew.vue";
  import CreditCardView from "../components/CreditCardView.vue";
  import ActionMenu from "../components/ActionMenu.vue";
  import useUserStore from "../stores/user.js";



  let newCardDialog = ref(false);
  let tab = ref("cards--my-debit");

  export default defineComponent({
    name: "IndexPage",
    components: {
      CreditCardNew,
      CreditCardView,
      ActionMenu
    },
    setup() {
      const $q = useQuasar();
      const userStore = useUserStore();

      let account = computed(function () {
        return userStore.account;
      });
      let transactions = computed(function () {
        return userStore.transactions;
      });

      function cardAdded(newCard) {
        newCard.company = tab.value == "cards--my-debit" ? "aspire" : "other";
        newCardDialog.value = false;
        slide.value = newCard.id;
      }

      let currentTabCards = computed(() => {
        if (tab.value == "cards--my-debit") {
          return userStore.cards.filter((card) => card.company == "aspire");
        } else {
          return userStore.cards.filter((card) => card.company != "aspire");
        }
      });

      let slide = ref(currentTabCards.value?.[0]?.id);

      function cardCanceled(){
        slide.value = currentTabCards.value?.[0]?.id;
      }





      watch(tab, function () {
        slide.value = currentTabCards.value?.[0]?.id;
      });

      return {
        account,
        currentTabCards,
        transactions,
        tab,
        slide,
        newCardDialog,

        isMobile: $q.platform.is.mobile,
        cardAdded,

        cardCanceled
      };
    },
  });
</script>

<style lang="scss">
  .q-carousel__navigation {
    margin-bottom: -20px;
  }
  .text-h5 {
    vertical-align: middle;
  }
</style>
