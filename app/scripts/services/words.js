'use strict';

/**
 * @ngdoc service
 * @name buySellBuyApp.words
 * @description
 * Tracks and changes the user's stock store
 */
angular.module('bsb')
  .factory('words', function () {
    var wordList = [
        'Time',
        'Year',
        'People',
        'Way',
        'Day',
        'Man',
        'Thing',
        'Woman',
        'Life',
        'Child',
        'World',
        'School',
        'State',
        'Family',
        'Student',
        'Group',
        'Country',
        'Problem',
        'Hand',
        'Part',
        'Place',
        'Case',
        'Week',
        'Company',
        'System',
        'Program',
        'Question',
        'Work',
        'Government',
        'Number',
        'Night',
        'Point',
        'Home',
        'Water',
        'Room',
        'Mother',
        'Area',
        'Money',
        'Story',
        'Fact',
        'Month',
        'Lot',
        'Right',
        'Study',
        'Book',
        'Eye',
        'Job',
        'Word',
        'Business',
        'Issue',
        'Side',
        'Kind',
        'Head',
        'House',
        'Service',
        'Friend',
        'Father',
        'Power',
        'Hour',
        'Game',
        'Line',
        'End',
        'Member',
        'Law',
        'Car',
        'City',
        'Community',
        'Name',
        'President',
        'Team',
        'Minute',
        'Idea',
        'Kid',
        'Body',
        'Information',
        'Back',
        'Parent',
        'Face',
        'Others',
        'Level',
        'Office',
        'Door',
        'Health',
        'Person',
        'Art',
        'War',
        'History',
        'Party',
        'Result',
        'Change',
        'Morning',
        'Reason',
        'Research',
        'Girl',
        'Guy',
        'Moment',
        'Air',
        'Teacher',
        'Force',
        'Education'
      ],

      wordLength  = wordList.length,

      randomWord = function () {
        // get a random index from the list
        var wordNumber = Math.floor(Math.random() * wordLength - 1);

        return wordList[wordNumber];
      },

      words = {
        name: '',
        symbol: '',
        generateName: function () {
          // Generate three random words
          var word1 = randomWord(),
              word2 = randomWord(),
              word3 = randomWord();

          // 50/50
          if (Math.random() < 0.5) {
            // Three words
            this.name = word1 + ' ' + word2 + ' ' + word3;
            // First character of each word
            this.symbol = word1[0] + word2[0] + word3[0];
          } else {
            // Two words
            this.name = word1 + ' ' + word2;
            // First two of the first word, first of the second
            this.symbol = word1[0] + word1[1].toUpperCase() + word2[0];
          }

          return name;
        }
      };

    return words;
  });


