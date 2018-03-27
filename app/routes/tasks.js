import Route from '@ember/routing/route';
import RSVP from "rsvp";

export default Route.extend({
  model(){
    return RSVP.hash({
      tasks:this.get('store').findAll('task'),
      fields:[{name:'content',caption:'Content'},{name:'story.code',caption:'Story'}],
      operations:[{icon:'remove red',link:'tasks.delete'},{icon:'edit',link:'tasks.update'}]
    });
  }
});
