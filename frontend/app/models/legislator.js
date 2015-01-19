// Legislator
import DS from 'ember-data';

var attr  = DS.attr,
  hasMany = DS.hasMany;

var Legislator = DS.Model.extend({
  birthday:         attr('string'),
  first_name:       attr('string'),
  last_name:        attr('string'),
  state_name:       attr('string'),
  state_rank:       attr('string'),
  chamber:          attr('string'),
  party:            attr('string'),
  title:            attr('string'),
  phone:            attr('string'),
  contact_form:     attr('string'),
  oc_email:         attr('string'),
  website:          attr('string'),
  youtube_id:       attr('string'),
  twitter_id:       attr('string'),
  term_start:       attr('string'),
  term_end:         attr('string'),
  office:           attr('string'),

  contributors:   hasMany('contributor'),
  industries:   hasMany('industries'),

  fullName: function(){
    return this.get('first_name') + ' ' + this.get('last_name');
  }.property('first_name', 'last_name'),

  chamberTitle: function(){
    return ( this.get('chamber') === 'senate' ) ? 'Senator' : 'Representative';
  }.property('chamber'),

  fullTitle: function(){
    var rank = this.get('state_rank'),
      chamberTitle = this.get('chamberTitle'),
      state = this.get('state_name').capitalize();

    rank = rank ? rank.capitalize() + ' ' : '';

    return rank + chamberTitle + ' from ' + state;
  }.property('chamber'),

  formattedChamber: function(){
    return this.get('chamber').capitalize();
  }.property('chamber'),

  formattedParty: function(){
    var partyChar = this.get('party');
    switch (partyChar){
      case 'R':
        return 'Republican';
      case 'D':
        return 'Democrat';
      case 'I':
        return 'Independent';
      default:
        return 'Other';
    };
  }.property('party'),

  termLength: function(){
    var termStart = this.get('term_start'),
        dateArray = termStart.split('-'),
        string;
        
    string = getDateString( dateArray[1], dateArray[0] );

    return string;
  }.property('term_start'),

  termLeft: function(){
    var termEnd = this.get('term_end'),
        dateArray = termEnd.split('-'),
        string;

    string = getDateString( dateArray[1], dateArray[0] );
        
    return string;    
  }.property('term_end'),

  twitterLink: function(){
    var twitterID = this.get('twitter_id'),
        fullLink;

    fullLink = "http://www.twitter.com/" + twitterID;

    return fullLink;
  }.property('twitter_id'),
  
  youtubeLink: function(){
    var youtubeID = this.get('youtube_id'),
        fullLink;

    fullLink = "http://www.youtube.com/user/"+youtubeID

    return fullLink;
  }.property('youtube_id'),

   emailLink: function(){
    var email = this.get('oc_email'),
        fullLink;

    fullLink = "mailto:"+email

    return fullLink;
  }.property('oc_email')
});

var getDateString = function(month, year) {
  var date = new Date(),
      yearOne = date.getFullYear(),
      monthOne = date.getMonth() + 1,
      monthTwo = month,
      yearTwo = year,
      years, months, string;

  years = Math.abs( yearOne - yearTwo);
  months = monthOne - monthTwo;

  if ( months < 0 ) {
    years--;
    months += 12;

    string = years+' years ';  
    string += months + ' months';
  } else if ( months > 0 ) {
    string = years+' years ';  
    string += months + ' months';
  } else {
    string = years+' years ';
  }

  return string;
};

export default Legislator;