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
            //
            //second comparison
            //
            this.primaryVisit_2 = 25;
            this.monthlyCost_2 = 250;
            this.estimatedCost_2 = 3025;
            this.numberVisits_2 = 1;
            //
            this.planCost_2 = 50;
            this.planCost_weight_2 = 25;
            this.planCoverage_2 = 50;
            this.planCoverage_weight_2 = 25;
            this.docpref_2 = 50;
            this.docpref_weight_2 = 25;
            this.docNetwork_2 = 50;
            this.docNetwork_weight_2 = 25;
        },
        
        update: function () {
            //var monthlyCost = 250;
            this.estimatedCost = (this.monthlyCost * 12) + (this.primaryVisit * this.numberVisits);
            //
            this.total_score = (this.planCost*.01)*(this.planCost_weight*.01) + (this.planCoverage*.01)*(this.planCoverage_weight*.01) + (this.docpref*.01)*(this.docpref_weight*.01) + (this.docNetwork*.01)*(this.docNetwork_weight*.01);
            this.total_weight = (this.planCost_weight*.01) + (this.planCoverage_weight*.01) + (this.docpref_weight*.01) + (this.docNetwork_weight*.01);
            //
            //second comparison
            //
            this.estimatedCost_2 = ((this.monthlyCost_2*.01) * 12) + ((this.primaryVisit_2*.01) * (this.numberVisits_2*.01));
            //
            var planCost_weight_2_weighting = .015;
            var planCoverage_weight_2_weighting = .005;
            var docpref_weight_2_weighting = .015;
            var docNetwork_weight_2_weighting = .005;
            //
            this.total_score_2 = (this.planCost_2*.01)*(this.planCost_weight_2*planCost_weight_2_weighting) + (this.planCoverage_2*.01)*(this.planCoverage_weight_2*planCoverage_weight_2_weighting) + (this.docpref_2*.01)*(this.docpref_weight_2*docpref_weight_2_weighting) + (this.docNetwork_2*.01)*(this.docNetwork_weight_2*docNetwork_weight_2_weighting);
            this.total_weight_2 = (this.planCost_weight_2*planCost_weight_2_weighting) + (this.planCoverage_weight_2*planCoverage_weight_2_weighting) + (this.docpref_weight_2*docpref_weight_2_weighting) + (this.docNetwork_weight_2*docNetwork_weight_2_weighting);
        },
    });

});