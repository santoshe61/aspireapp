<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-dark q-pa-xl" :width="340">
      <img src="/Logo-lg-green.svg" />
      <p class="q-mt-sm q-mb-xl text-muted-2">Trusted way of banking for 3,000+ SMEs and startups in Singapore</p>
      <div class="column">
          <div class="col q-my-lg">
            <q-avatar size="sm">
              <img src="/icons/Logo.svg" />
            </q-avatar>
            <span class="q-ml-sm text-grey-5">Home</span>
          </div>
          <div class="col q-my-lg">
            <q-avatar size="sm">
              <img src="/icons/pay.svg" />
            </q-avatar>
            <span class="q-ml-sm text-positive text-bold">Cards</span>
          </div>
          <div class="col q-my-lg">
            <q-avatar size="sm">
              <img src="/icons/Payments.svg" />
            </q-avatar>
            <span class="q-ml-sm text-grey-5">Payments</span>
          </div>
          <div class="col q-my-lg">
            <q-avatar size="sm">
              <img src="/icons/Credit.svg" />
            </q-avatar>
            <span class="q-ml-sm text-grey-5">Credit</span>
          </div>
          <div class="col q-my-lg">
            <q-avatar size="sm">
              <img src="/icons/Account.svg" />
            </q-avatar>
            <span class="q-ml-sm text-grey-5">Profile</span>
          </div>
        </div>
    </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-white my-card-footer">
        <div class="row">
          <div class="col text-center">
            <q-avatar size="sm">
              <img src="/icons/Logo.svg" />
            </q-avatar>
            <p class="my-card-footer__text-sm text-grey-5">Home</p>
          </div>
          <div class="col text-center">
            <q-avatar size="sm">
              <img src="/icons/pay.svg" />
            </q-avatar>
            <p class="my-card-footer__text-sm text-positive text-bold">Cards</p>
          </div>
          <div class="col text-center">
            <q-avatar size="sm">
              <img src="/icons/Payments.svg" />
            </q-avatar>
            <p class="my-card-footer__text-sm text-grey-5">Payments</p>
          </div>
          <div class="col text-center">
            <q-avatar size="sm">
              <img src="/icons/Credit.svg" />
            </q-avatar>
            <p class="my-card-footer__text-sm text-grey-5">Credit</p>
          </div>
          <div class="col text-center">
            <q-avatar size="sm">
              <img src="/icons/Account.svg" />
            </q-avatar>
            <p class="my-card-footer__text-sm text-grey-5">Profile</p>
          </div>
        </div>
      </q-footer>
  </q-layout>
</template>

<script>
  import { defineComponent, ref } from "vue";
  // import EssentialLink from "components/EssentialLink.vue";

  const linksList = [
    {
      title: "Docs",
      caption: "quasar.dev",
      icon: "school",
      link: "https://quasar.dev",
    },
    {
      title: "Github",
      caption: "github.com/quasarframework",
      icon: "code",
      link: "https://github.com/quasarframework",
    },
    {
      title: "Discord Chat Channel",
      caption: "chat.quasar.dev",
      icon: "chat",
      link: "https://chat.quasar.dev",
    },
    {
      title: "Forum",
      caption: "forum.quasar.dev",
      icon: "record_voice_over",
      link: "https://forum.quasar.dev",
    },
    {
      title: "Twitter",
      caption: "@quasarframework",
      icon: "rss_feed",
      link: "https://twitter.quasar.dev",
    },
    {
      title: "Facebook",
      caption: "@QuasarFramework",
      icon: "public",
      link: "https://facebook.quasar.dev",
    },
    {
      title: "Quasar Awesome",
      caption: "Community Quasar projects",
      icon: "favorite",
      link: "https://awesome.quasar.dev",
    },
  ];

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
        // essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
      };
    },
  });
</script>
