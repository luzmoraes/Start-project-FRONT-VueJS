/**
 * Globals Module
 */

const state = {
    loader: false,
    submitted: false,
    isError: false,
    dynamicMessage: '',
    sMessage: false
}

// getters
const getters = {
    getLoader: state => state.loader,
    getSubmitted: state => state.submitted,
}

// actions
const actions = {
    setLoader(context, payload) {
        context.commit('changeLoader', payload)
    },
    setSubmited(context, payload) {
        context.commit('changeSubmitted', payload)
    }
}

// mutations
const mutations = {
    changeLoader(state, status) {
        state.loader = status
    },
    changeSubmitted(state, status) {
        state.submitted = status
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
