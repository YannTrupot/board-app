import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import RSVP from 'rsvp';

export default Route.extend({
  model(params){
    return new RSVP.hash({
      colors : ['black','blue','green','orange','pink','purple','red','teal','yellow','positive','negative'],
      tag: this.get('store').findRecord('tag',params.tag_id)
    });
  },
  afterModel(model){
    Ember.set(model,'data',EmberObject.create(JSON.parse(JSON.stringify(model.tag))));
  },
  actions:{
    save(tag,data){
      Ember.set(tag,'title',data.title);
      Ember.set(tag,'color',data.color);
      tag.save().then(()=>{
        this.transitionTo("tags");
      })
    },
    cancel(){
      this.transitionTo("tags");
    }
  }
});
