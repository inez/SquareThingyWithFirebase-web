import Ember from 'ember';
import { v1, v4 } from "ember-uuid";

export default Ember.Component.extend({

    code: null,

    didInsertElement() {
        this._super(...arguments);

        this.set('code', v4());

        new QRCode(this.$('#qr-code')[0], this.get('code'));

        var linkCodeRef = firebase.database().ref('links/' + this.get('code'));
        linkCodeRef.on('value', snapshot => {
            var val = snapshot.val();
            if(val === true) {
                Ember.run(() => {
                    this.get('linked')(this.get('code'));
                });
            }
        });
    }

});
