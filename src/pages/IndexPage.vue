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
          <h3 class="q-ml-md">{{ user.account.balance }}</h3>
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
              <q-card
                class="bg-positive desktop__credit-card q-pa-sm"
                unelevated
              >
                <q-card-section class="flex">
                  <q-space />
                  <img src="/Logo-lg.svg" />
                </q-card-section>
                <q-card-section>
                  <h4>{{ card.customer_name }}</h4>
                  <p class="q-mt-lg q-mb-sm">
                    <span v-if="card.isVisible" class="my-card__card-number">{{
                      card.card_number.slice(0, -4)
                    }}</span>
                    <span v-else>
                      <small v-for="count in 3" :key="count" class="q-mr-sm">
                        <q-icon
                          name="lens"
                          size="xs"
                          class="my-card__mask-icon"
                        />
                        <q-icon
                          name="lens"
                          size="xs"
                          class="my-card__mask-icon"
                        />
                        <q-icon
                          name="lens"
                          size="xs"
                          class="my-card__mask-icon"
                        />
                        <q-icon
                          name="lens"
                          size="xs"
                          class="my-card__mask-icon"
                        />
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
            <div class="row">
              <div
                class="col text-center cursor-pointer"
                @click="freezeUnfreezeCard"
              >
                <q-avatar size="md">
                  <img src="/icons/Freeze card.svg" />
                </q-avatar>
                <p class="text-dark">
                  {{ isCurrentFreezed ? "Unfreeze" : "Freeze" }} card
                </p>
              </div>
              <div class="col text-center">
                <q-avatar size="md">
                  <img src="/icons/Set spend limit.svg" />
                </q-avatar>
                <p class="text-dark">Set limit</p>
              </div>
              <div class="col text-center">
                <q-avatar size="md">
                  <img src="/icons/Gpay.svg" />
                </q-avatar>
                <p class="text-dark">Add to Gpay</p>
              </div>
              <div class="col text-center">
                <q-avatar size="md">
                  <img src="/icons/Replace card.svg" />
                </q-avatar>
                <p class="text-dark">Replace card</p>
              </div>
              <div class="col text-center cursor-pointer" @click="cancelCard">
                <q-avatar size="md">
                  <img src="/icons/Deactivate card.svg" />
                </q-avatar>
                <p class="text-dark">Cancel card</p>
              </div>
            </div>
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
  import CreditCardNew from "../components/CreditCard-New.vue";
  import CreditCardView from "../components/CreditCard-View.vue";
  import useCardStore from "../stores/card.js";

  let facilityLogo = {
    Visa: "Facility-Visa.svg",
    Master: "Facility-Master.svg",
    Aspire: "Facility-Aspire.svg",
  };
  let transactions = ref([
    {
      id: 1,
      icon: {
        name: "file-storage",
        cssClass: "blue-1",
      },
      pos: "BigBazaar",
      date: "01/10/2022",
      amount: "100",
      currency: "INR",
      type: "D",
    },
    {
      id: 2,
      icon: {
        name: "flights",
        cssClass: "yellow-1",
      },
      pos: "Flipkart",
      date: "01/10/2022",
      amount: "100",
      currency: "INR",
      type: "C",
    },
    {
      id: 3,
      icon: {
        name: "megaphone",
        cssClass: "pink-1",
      },
      pos: "BigBazaar",
      date: "01/10/2022",
      amount: "100",
      currency: "S$",
      type: "C",
    },
    {
      id: 4,
      icon: {
        name: "file-storage",
        cssClass: "blue-1",
      },
      pos: "BigBazaar",
      date: "01/10/2022",
      amount: "100",
      currency: "S$",
      type: "D",
    },
    {
      id: 5,
      icon: {
        name: "flights",
        cssClass: "yellow-1",
      },
      pos: "Go Ibibo",
      date: "01/10/2022",
      amount: "100",
      currency: "US$",
      type: "D",
    },
    {
      id: 1,
      icon: {
        name: "megaphone",
        cssClass: "pink-1",
      },
      pos: "BigBazaar",
      date: "01/10/2022",
      amount: "100",
      currency: "S$",
      type: "D",
    },
  ]);
  let user = ref({
    account: {
      balance: "3,000",
    },
  });
  let newCardDialog = ref(false);
  let tab = ref("cards--my-debit");

  export default defineComponent({
    name: "IndexPage",
    setup() {
      const $q = useQuasar();
      const cardStore = useCardStore();

      function cardAdded(newCard) {
        newCard.company = tab.value == "cards--my-debit" ? "aspire" : "other";
        newCardDialog.value = "false";
        slide.value = newId;
      }

      let currentTabCards = computed(() => {
        if (tab.value == "cards--my-debit") {
          return cardStore.cards.filter((card) => card.company == "aspire");
        } else {
          return cardStore.cards.filter((card) => card.company != "aspire");
        }
      });

      let slide = ref(currentTabCards.value?.[0]?.id);

      let isCurrentFreezed = computed(() => {
        return (
          cards.value.filter((card) => {
            return card.id == slide.value;
          })?.[0]?.status == "frozen"
        );
      });

      function toggleCard(id) {
        cards.value = cards.value.map((card) => {
          if (card.id == id) {
            card.isVisible = !card.isVisible;
          }
          return card;
        });
      }

      function freezeUnfreezeCard() {
        if (currentTabCards.value.length < 1) {
          return $q.dialog({
            message: "No active cards available!",
          });
        }
        cards.value = cards.value.map((card) => {
          // console.log(cards);
          if (card.id == slide.value) {
            card.status = card.status === "frozen" ? "active" : "frozen";
          }
          return card;
        });
        $q.notify({
          color: "green-4",
          textColor: "white",
          position: "top",
          icon: "check_circle",
          message: "Card updated successfully",
        });
      }

      function cancelCard() {
        if (currentTabCards.value.length < 1) {
          return $q.dialog({
            message: "No active cards available!",
          });
        }
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to cancel this card ?",
          cancel: true,
        }).onOk(() => {
          cards.value = cards.value.filter((card) => card.id !== slide.value);
          slide.value = currentTabCards.value?.[0]?.id;
        });
      }

      watch(tab, function () {
        slide.value = currentTabCards.value?.[0]?.id;
      });

      watch(newCardDialog, function () {
        let random = Math.random().toString().split(".")[1].padEnd(16, 0);
        let customer_name = [
          "Santosh",
          "Thanh",
          "Alex",
          "Nawaf",
          "Deepak",
          "Chan",
          "Abu Saleem",
          "Nick Fury",
          "Tony Stark",
          "Loki",
        ][random[0]];
        let card_number = ("4" + random)
          .slice(0, 16)
          .match(/.{1,4}/g)
          .join(" ");
        let card_expiry = `${+random[0] + 1} / 30`.padStart(7, 0);
        let card_cvv = random.slice(3, 6);

        newCard.value = {
          customer_name,
          card_number,
          card_expiry,
          card_cvv,
          accept: false,
        };
      });

      return {
        user,
        currentTabCards,
        transactions,
        facilityLogo,
        toggleCard,
        tab,
        slide,
        newCardDialog,
        newCard,
        validateCard,
        freezeUnfreezeCard,
        isCurrentFreezed,
        cancelCard,
        isMobile: $q.platform.is.mobile,
        CreditCardNew,
        CreditCardView,
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
