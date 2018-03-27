import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  model(){
    return EmberObject.create({
      "stories" : this.get('store').findAll('story')
    });
  },
  actions:{
    save(oldTask,newTask) {
      let model = this.modelFor(this.routeName);
      console.log(newTask);
      newTask = this.get('store').createRecord('task',{content: newTask.content});
      let idStory = Ember.get(model, 'idStory');
      let story = Ember.get(model, 'stories').find(story => story.id == idStory);
      newTask.set('story', story);
      newTask.save().then(
        ()=>{this.transitionTo("tasks");});
    },
    cancel(){
      this.transitionTo("tasks");
    }
  }
});
