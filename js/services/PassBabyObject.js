/**
 * Created by Victor on 9/12/2015.
 */
app.factory('passBaby', function() {

    var babyObject;

    return {
        getBabyObject: function () {
            return babyObject;
        },
        setBabyObject: function (value) {
            babyObject = value;
        }
    };
});