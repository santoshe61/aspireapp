<template>
  <q-layout view="lHh Lpr lFf" class="mobile__bg-dark">
    <q-drawer show-if-above bordered class="bg-dark q-pa-xl" :width="340">
      <img src="/Logo-lg-green.svg" />
      <p class="q-mt-sm q-mb-xl text-muted-2">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </p>
      <div class="column">
        <div v-for="link in menuLinks" :key="link.title" class="col q-my-lg">
          <!-- <q-route-tab :to="link.to"> -->
            <q-avatar size="sm">
              <img :src="link.icon" />
            </q-avatar>
            <span class="q-ml-sm text-grey-5">{{ link.title }}</span>
          <!-- </q-route-tab> -->
        </div>
      </div>
    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white mobile-only my-card-footer">
        <div class="row">
          <div v-for="link in menuLinks" :key="link.title" class="col text-center">
            <q-avatar size="sm">
              <img :src="link.icon" />
            </q-avatar>
            <p class="my-card-footer__text-sm text-grey-5">{{link.title}}</p>
          </div>
        </div>
      </q-footer>
  </q-layout>
</template>

<script>
  import { defineComponent, ref } from "vue";
  // import EssentialLink from "components/EssentialLink.vue";

  const menuLinks = ref([
    { icon: "/icons/Logo.svg", title: "Home", to: "/" },
    { icon: "/icons/pay.svg", title: "Cards", to: "/" },
    { icon: "/icons/Payments.svg", title: "Payments", to: "/" },
    { icon: "/icons/Credit.svg", title: "Credit", to: "/" },
    { icon: "/icons/Account.svg", title: "Profile", to: "/" },
  ]);

  export default defineComponent({
    name: "MainLayout",

    // components: {
    //   EssentialLink,
    // },

    setup() {
      const leftDrawerOpen = ref(false);
      let user = {
        account: {
          balance: "3,000",
        }
      }
      return {
        user,
        menuLinks,
      };
    },
  });
</script>
