/**
 * Created by Victor on 9/13/2015.
 */
app.factory('backendlessClasses', function(){

    //Baby table for Backendless
    function Baby(args){
        args = args || {};
        this.name = args.name || "";
        this.birthdate = args.birthdate || "";
        this.sex = args.sex || "";
        this.growthRecords = args.growthRecords || "";
        this.___class = "Baby";
    }

    return {
        babyTable: function(){
            return Baby;
        }
    };


});