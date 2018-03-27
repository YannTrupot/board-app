import Route from '@ember/routing/route';
import EmberObject from '@ember/object';

export default Route.extend({
  model(){
    return EmberObject.create({
      "title" : ""
    });
  },
  actions:{
    save:function(oldValue,newValue){
      let step=this.get('store').createRecord('step',JSON.parse(JSON.stringify(newValue)));
      step.save().then(()=>{this.transitionTo("steps");}).
      catch((error)=>console.log(error));
    },
    cancel(){
      this.transitionTo("steps");
    }
  }
});
