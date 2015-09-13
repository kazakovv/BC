/**
 * Created by Victor on 9/13/2015.
 */
app.factory('backEndlessClasses', function(){




    //Baby table for Backendless
   var BabyTable = function Baby(args){
        args = args || {};
        this.name = args.name || "";
        this.birthdate = args.birthdate || "";
        this.sex = args.sex || "";
        this.weight = args.weight || "";
        this.height = args.height || "";
    }

});