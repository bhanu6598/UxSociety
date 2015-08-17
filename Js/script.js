/**
 * Created by bhanu6598 on 8/7/15.
 */

// Code goes here

(function() {

    //create the module
    angular.module('searchApp', ['ui.bootstrap','uiGmapgoogle-maps']);
    //create the filter for pagination
    angular.module('searchApp').filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    });
    //Declare the Controller
    angular.module('searchApp').controller('MainController', MainControllerFn);

    //Inject $http and $filter into the controller

    MainControllerFn.$inject = ['$http','$filter']

    //Define the Controller

    function MainControllerFn($http,$filter) {
        var mainVm = this;
        mainVm.people=[];
        mainVm.myVar = false;
        mainVm.sortOrder='id';
        mainVm.sortReverse=false;

        //http call to get the data
        $http({
            method: 'GET',
            url: 'http://private-a73e-aquentuxsociety.apiary-mock.com/members'
        })
            .success(function (data) {
                mainVm.people = data;
            })
            .error(function (err) {
                console.log(err);
            })

        //Variables required for pagination
        mainVm.currentPage = 1;
        mainVm.entryLimit = 20;
        mainVm.maxSize = 5;

        //Search function to search using First Name, Middle Initial, Surname or using a combination of all three
        mainVm.search = function (person) {
            return (angular.lowercase(person.firstName+' '+person.middleInitial+' '+person.surname).indexOf(mainVm.query || '') !== -1);
        };

        //Function to get the number of items after using the search filter
        mainVm.totalItems = function () {
            var myFilteredData = $filter('filter')(mainVm.people, mainVm.search);
            return myFilteredData.length;
        };

        //Map
        mainVm.map = {
            center: {
                latitude: null,
                longitude: null
            },
            draggable: true,
            zoom: 15
        };
        // Map Options
        mainVm.options = {
            scrollwheel: false
        };

        // Map Marker
        mainVm.marker = {
            id: 0,
            coords: {
                latitude: null,
                longitude: null
            },
            options: {
                draggable: false,
                title: 'The KVK Blog',
                }
        };

    }
})();