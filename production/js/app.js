var app = angular
      .module('hhm',['ngRoute'])
      .controller('hhmCtrl',hhmCtrl);
app
   .config(['$routeProvider', function($routeProvider){
              $routeProvider
              .when('/',{templateUrl:'templates/main.html'})
              .otherwise({redirectTo:'/'});
          }]);
function hhmCtrl(){
    console.log('controlles initialized')
    this.val = 'hel121231'
}