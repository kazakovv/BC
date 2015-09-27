app.controller('DashboardController',['$scope', '$state', function($scope, $state) {

    $scope.init = function () {

        //find kids of current user


        if(Backendless.UserService.getCurrentUser() != null) {
            currentUser = Backendless.UserService.getCurrentUser();
            $scope.kids = currentUser.kids;


            /* alternative approach of getting weights and hieghts */
            $scope.weightData =[];
            $scope.heightData = [];
            for (var i=0; i < currentUser.kids.length; i++) {

                //sort the array before we link it to the scope
                var weightsArray = JSON.parse(currentUser.kids[i].weight);
                weightsArray.sort(custom_sort);

                var weightData = [

                    {
                        "key" : "Weight",
                        "bar": true,
                        "values" : weightsArray
                    }];

                //link the array to scope
                $scope.weightData.push(weightData);

                //sort the array before we link it to the scope
                var heightsArray = JSON.parse(currentUser.kids[i].height);
                heightsArray.sort(custom_sort);

                var heightData = [
                    {
                        "key" : "Height" ,
                        "bar": true,
                        "values" : heightsArray
                    }];
                $scope.heightData.push(heightData);


            } //end of for loop

        } else {
            //redirect to login screen
            $state.go('login');
        }


    };

    //the graph
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 200,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 50
            },
            x: function(d){
                //parses the date into a number format

                return Date.parse(d.date);
            },
            y: function(d){return d.value ;},

            showValues: true,
            valueFormat: function(d){
                return d3.format(',.1f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'Date',
                tickFormat: function(d) {
                   return d3.time.format('%Y-%m-%d') (new Date(d))
                },
                rotateLabels: 50,
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 35,
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            }
        }
    };

    $scope.returnMinAndMaxValues = function(kid, property){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

        var birthdate = new Date(kid.birthdate);
        var today = new Date();
        var daysPassed = Math.round(Math.abs((birthdate.getTime() - today.getTime())/(oneDay)));
        var monthsSinceBirthday = Math.round (daysPassed/30.5);

        var minWeight;
        var maxWeight;

        var minHeight;
        var maxHeight;

        var sex = kid.sex;
        if(sex == 1){
            //boy
            switch (property){
                case 'Weight':
                    minWeight = boyMinWeight(monthsSinceBirthday);
                    maxWeight = boyMaxWeight(monthsSinceBirthday);
                case 'Height':
                    minHeight = boyMinHeight(monthsSinceBirthday);
                    maxHeight = boyMaxHeight(monthsSinceBirthday);
            } //end of swith statement

        } else if( sex == 2){
            //girl
            switch (property) {
                case 'Weight':
                    minWeight = girlMinWeight(monthsSinceBirthday);
                    maxWeight = girlMaxWeight(monthsSinceBirthday);
                case 'Height':
                    minHeight = girlMinHeight(monthsSinceBirthday);
                    maxHeight = girlMaxHeight(monthsSinceBirthday);
            } //end of switch statement

        } //end of else if for girl
        if(property == 'Weight'){
            return "The healthy range for this age is from " + Math.round(minWeight)  + " to " + Math.round(maxWeight) ;
        } else {
            return "The healthy range for this age is from " + Math.round(minHeight)  + " to " + Math.round(maxHeight) ;
        }
    }; //end of return min and max values function
    //sort the JSON array by date before we pass it on to graph chart
    function custom_sort(a, b) {
        return new Date(a.date) - new Date(b.date);
    }


    /**********************************************************/
    // min and max values for kids
    /* height */
    var boyMinHeight = function(months) {
        var minHeight = -0.1208*(months^2) * 3.1865*months + 47.17;
        return minHeight;
    };

    var boyMaxHeight = function(months){
        var maxHeight = -0.142*(months^2) + 3.8167*months + 55.509;
        return maxHeight;
    };

    var girlMinHeight = function(months){
        var minHeight = -0.1027*(months^2) + 2.965*months + 46.59;
        return minHeight;
    };

    var girlMaxHeight = function(months){
        var maxHeight = -0.1263*(months^2) + 3.5332*months + 54.741;
        return maxHeight;
    };

    /* weight */
    var boyMinWeight = function(months){
        var minWeight = -35.42*(months^2) + 851.24*months + 2359.7;
        return minWeight;
    };

    var boyMaxWeight = function(months){
        var maxWeight = -43.691*(months^2) + 1170.1*months + 4438.8;
        return maxWeight;
    };

    var girlMinWeight = function(months){
        var minWeight = -24.521*(months^2) + 689.71*months + 2341.6;
        return minWeight;
    };

    var girlMaxWeight = function(months){
        var maxWeight = -38.8*(months^2) + 1099*months + 4128.9;
        return maxWeight;
    };


}]);
