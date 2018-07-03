import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed, get } from '@ember/object';

export default Model.extend({
  code: attr('string'),
  endDate: attr('date'),
  boxOfficeAmount: attr('number'),
  title: attr('string'),
  website: attr('string'),
  plot: attr('string'),
  poster: attr('string'),
  highestWager: attr('number'),
  lowestWager: attr('number'),
  numberOfWagers: attr('number'),

  largePoster: computed('poster', function() {
    let poster = get(this, 'poster') || '';
    if (poster) {
      return poster.replace('X300.jpg', 'X500.jpg');
    } else {
      return '/images/movie-bg.jpg';
    }
  }),

  formattedEndDate: computed('endDate', function() {
    let endDate = get(this, 'endDate');
    if (!endDate) {
      return '';
    }

    return `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
  })
});
