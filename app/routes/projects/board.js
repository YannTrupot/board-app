import Route from '@ember/routing/route';
import RSVP from "rsvp";

export default Route.extend({
  model(params) {
    return RSVP.hash({
      story: EmberObject.create(),
      project: this.get('store').findRecord('project', params.project_id)
    });
  }

});
