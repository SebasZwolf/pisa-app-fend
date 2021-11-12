import Vue from "vue";

class FormHandlers {
    constructor() {
        this.vueFormInstance = null;
    }

    mountVueComponents(component, mode, data) {
        let Component = Vue.extend(component);
        this.vueFormInstance = new Component({
            propsData: { mode: mode, data: data },
        });
        this.vueFormInstance.$mount();
        this.vueFormInstance.initForm();
        document.getElementById(component.name).appendChild(this.vueFormInstance.$el);
    }

    destroyVueComponent() {
        const data = this.vueFormInstance.getResult();
        this.vueFormInstance.$destroy();
        this.vueFormInstance = null;
        return data;
    }

    getFormInstance() {
        return this.vueFormInstance;
    }
}

export default new FormHandlers();