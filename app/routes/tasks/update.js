import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import Ember from 'ember';
import EmberObject from '@ember/object';

export default Route.extend({

  model(params){
    return RSVP.hash({
      oldTask: this.get('store').findRecord('task',params.task_id),
      stories: this.get('store').findAll('story')
    });
  },
  afterModel(model){
    let newTask=EmberObject.create(JSON.parse(JSON.stringify(model.oldTask)));
    Ember.set(model,'newTask',newTask);
    Ember.set(model,'idStory',model.oldTask.get('story').get('id'));
  },
  actions: {
    save(oldTask,newTask) {
      let model = this.modelFor(this.routeName);
      oldTask.set('content',newTask.content)
      let idStory = Ember.get(model, 'idStory');
      let story = Ember.get(model, 'stories').find(story => story.id == idStory);
      oldTask.set('story', story);
      oldTask.save().then(
        ()=>{this.transitionTo("tasks");});
    },
    cancel(){
      this.transitionTo("tasks");
    }
  }
});
