<template>
  <v-app
	id="inspire"
	:class="[{ 
		'box-layout': boxLayout, 
		'collapse-sidebar': sidebarState, 
		'rtl-layout': rtlLayout
	}]"
  > 
      <!-- <router-view :auth="auth" :authenticated="authenticated"></router-view> -->
      <router-view></router-view>
      <notifications 
        group="global" 
        position="top right"
        animation-type="velocity"
      />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2]
        },
        leave: {
          opacity: 0,
          height: 0
        }
     }
    };
  },
  mounted() {
    // This if block is for IE 11
    if (!Object.entries)
      Object.entries = function( obj ){
        var ownProps = Object.keys( obj ),
            i = ownProps.length,
            resArray = new Array(i); // preallocate the Array
        while (i--)
          resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
      };
    if (
      this.selectedLocale.locale === "he" ||
      this.selectedLocale.locale === "ar"
    ) {
      this.$store.dispatch("rtlLayout");
    }
  },
  computed: {
    ...mapGetters([
      "collapseSidebar",
      "boxLayout",
      "rtlLayout",
      "selectedLocale"
    ]),
    // isDark(){ return (this.$vuetify.theme.dark) ? 'dark' : 'light' }
    sidebarState: {
      get: function() {
        return this.collapseSidebar;
      },
      set: function() {
        return this.collapseSidebar;
      }
    }
  },
};
</script>
