//
//  ParkExample.js
//  Tangle
//
//  Created by Bret Victor on 3/10/11.
//  (c) 2011 Bret Victor.  MIT open-source license.
//

window.addEvent('domready', function () {

    new Tangle(document.getElementById("parkExample"), {

        initialize: function () {
            this.primaryVisit = 25;
            this.monthlyCost = 250;
            this.estimatedCost = 3025;
            this.numberVisits = 1;
            //
            this.planCost = 50;
            this.planCost_weight = 25;
            this.planCoverage = 50;
            this.planCoverage_weight = 25;
            this.docpref = 50;
            this.docpref_weight = 25;
            this.docNetwork = 50;
            this.docNetwork_weight = 25;
        },
        
        update: function () {
            //var monthlyCost = 250;
            this.estimatedCost = ((this.monthlyCost*.01) * 12) + ((this.primaryVisit*.01) * (this.numberVisits*.01));
            //
            this.total_score = (this.planCost*.01)*(this.planCost_weight*.01) + (this.planCoverage*.01)*(this.planCoverage_weight*.01) + (this.docpref*.01)*(this.docpref_weight*.01) + (this.docNetwork*.01)*(this.docNetwork_weight*.01);
            this.total_weight = (this.planCost_weight*.01) + (this.planCoverage_weight*.01) + (this.docpref_weight*.01) + (this.docNetwork_weight*.01);
            //
        },
    });

});