(function() {
  var app = angular.module('randomQuote', []);

  app.service('quoteService', function($http, $q){
    this.getRandomQuote = function() {
    var deferred = $q.defer();
    var req = {
      method: 'POST',
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
      headers: {
        "X-Mashape-Key": "TNUL5oVX87mshQ6UzneeWkwlvXm7p1mOakYjsndcN8GMd03yBN",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      }
    };
    $http(req).then(function(data){
      deferred.resolve(data);
    });

      return deferred.promise;
    };
  });

  app.controller('quoteController', function($scope, quoteService, $window) {
    $scope.tweet = function() {
      var tweetIntentUrl = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
      $window.open(tweetIntentUrl + encodeURIComponent('"' + $scope.randomQuote.quote + '" ' + $scope.randomQuote.author), "_blank");
    };
    $scope.getQuote = function() {
      var promise = quoteService.getRandomQuote();
      promise.then(function(data){
        $scope.randomQuote = data.data;
      });
    };
    $scope.getQuote();
  });
})();
