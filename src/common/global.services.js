import Vue from 'vue'

const GlobalService = {

    showNotification(group, type, text) {
        console.log('cheguei aqui')
        Vue.notify({
            group,
            type,
            text
        });
    }
}

export default GlobalService