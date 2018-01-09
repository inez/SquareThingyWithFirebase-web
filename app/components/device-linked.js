import Ember from 'ember';

export default Ember.Component.extend({

	id: null,

	amount: null,

    actions: {
        charge() {
        	var ref = firebase.database().ref('chargeRequests/' + this.get('id'));
        	ref.child(ref.push().key).set(this.get('amount'));
        	this.set('isProcessing', true);

        	var ref = firebase.database().ref('transactions/' + this.get('id'));
        	ref.on('child_added', snapshot => {
        		this.set('isProcessing', false);
        		this.set('showSuccess', true);
        		Ember.run.later(() => {
        			this.set('showSuccess', false);
        		}, 2500);
        	});
        }
    }

});
