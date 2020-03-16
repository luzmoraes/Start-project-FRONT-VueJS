import Vue from 'vue'

const GlobalService = {

    showNotification(group, type, text) {
        Vue.notify({
            group,
            type,
            text
        });
    }
}

export default GlobalService