import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        linked(id) {
            this.transitionToRoute('linked', id);
        }
    }
});
