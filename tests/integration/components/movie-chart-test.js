import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('movie-chart', 'Integration | Component | movie chart', {
  integration: true
});

test('it renders', function(assert) {

  this.set('wagers', [
    {
      id: 1,
      amount: 69992,
      place: 1,
      user: {
        profileImage: 'foo.png'
      }
    },
    {
      id: 2,
      amount: 53773,
      place: 2,
      user: {
        profileImage: 'foo.png'
      }
    },
    {
      id: 3,
      amount: 24032,
      place: 3,
      user: {
        profileImage: 'foo.png'
      }
    },
  ]);
  this.set('finalAmount', 70723);
  this.render(hbs`{{movie-chart wagers=wagers finalAmount=finalAmount}}`);

  assert.equal(this.$('.horizontal-wager-line').length, 3, 'wager lines are drawn');
  assert.equal(this.$('.vertical-wager-line').length, 3, 'profile lines are drawn');

  assert.equal(this.$('.horizontal-wager-line:eq(0)').attr('x1'), '0', 'first line starts 0');
  assert.equal(this.$('.horizontal-wager-line:eq(0)').attr('x2'), '222', 'it extends 222 out of 700px');

  assert.equal(this.$('.horizontal-wager-line:eq(1)').attr('x1'), '222', 'next starts where last left off');
  assert.equal(this.$('.horizontal-wager-line:eq(1)').attr('x2'), '566', 'second ends within wager bounds');

  assert.equal(this.$('.horizontal-wager-line:eq(2)').attr('x1'), '566', 'next starts where last left off');
  assert.equal(this.$('.horizontal-wager-line:eq(2)').attr('x2'), '700', 'last one is always 700');


  assert.equal(this.$('.vertical-wager-line:eq(0)').attr('x1'), '3', 'first vertical line marks wager spot');
  assert.equal(this.$('.vertical-wager-line:eq(1)').attr('x1'), '448', 'second vertical line marks wager spot');
  assert.equal(this.$('.vertical-wager-line:eq(2)').attr('x1'), '692', 'third vertical line marks wager spot');
});

test('it hides chart with 1 or fewer wagers', function(assert) {
  this.set('wagers', [{ foo: 'bar '}]);
  this.render(hbs`
    {{#movie-chart wagers=wagers}}
      <h4>Not enough</h4>
    {{/movie-chart}}
  `);

  assert.equal(this.$().text().trim(), 'Not enough', 'chart is hidden');
});
