<template>
  <div class="row">
    <div class="col text-center cursor-pointer" @click="freezeUnfreezeCard">
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
</template>
<script>
  import { defineComponent, ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import useUserStore from "../stores/user.js";

  export default defineComponent({
    name: "ActionMenu",
    props: ["slide", "currentTabCards"],
    setup(props, {emit}) {
      const $q = useQuasar();
      const userStore = useUserStore();

      let isCurrentFreezed = computed(() => {
        return (
          userStore.cards.filter((card) => {
            return card.id == props.slide;
          })?.[0]?.status == "frozen"
        );
      });

      function freezeUnfreezeCard() {
        if (props.currentTabCards.length < 1) {
          return $q.dialog({
            message: "No active cards available!",
          });
        }
        userStore.cards = userStore.cards.map((card) => {
          // console.log(cards);
          if (card.id == props.slide) {
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
        if (props.currentTabCards.length < 1) {
          return $q.dialog({
            message: "No active cards available!",
          });
        }
        $q.dialog({
          title: "Confirm",
          message: "Are you sure to cancel this card ?",
          cancel: true,
        }).onOk(() => {
          userStore.cards = userStore.cards.filter(
            (card) => card.id !== props.slide
          );
		  emit("cardCanceled")
        });
      }

      return {
        isCurrentFreezed,
        freezeUnfreezeCard,
        cancelCard,
      };
    },
  });
</script>
