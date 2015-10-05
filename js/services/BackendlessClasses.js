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

    function FeverRecord(args){
        args = args || {};
        this.dateFever = args.dateFever || "";
        this.timeFever = args.timeFever || "";
        this.temp = args.temp || "";
        this.medication = args.medication || "";
        this.dose = args.dose || "";
        this.___class = "FeverRecord";


    }

    function GrowthRecords(args){
        args = args || {};
        this.dateGrowth = args.dateGrowth || "";
        this.weight = args.weight || "";
        this.length = args.length || "";
        this.cfr = args.cfr || "";
        this.___class = "GrowthRecords";


    }



    return {
        babyTable: function(){
            return Baby;
        },

        feverRecord: function(){
            return FeverRecord;
        },
        growthRecords: function(){
            return GrowthRecords;
        }
    };


});