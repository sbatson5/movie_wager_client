import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  imdbCode: attr('string'),
  posterUrl: attr('string'),
  releaseDate: attr('date'),
  rating: attr('string'),
  runtime: attr('string'),
  genres: attr('string'),
  summary: attr('string'),
  director: attr('string'),
  writers: attr('string'),
  stars: attr('string'),
  trailerLink: attr('string')
});
