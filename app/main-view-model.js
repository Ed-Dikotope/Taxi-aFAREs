const Observable = require("data/observable").Observable;
const observableArray = require("data/observable-array");
const MAX_PASSENGERS_PER_ROW = 4;
const MAX_PASSENGERS_PER_VEHICLE = 15;

function createViewModel() {

    let viewModel = new Observable({
        passengersTotal: 0,
        tendered: '',
        littleWarningMessage: '',
        calculateFare: function(){

            let fare = this.get('selectedFare');
            let tendered = this.get('tendered');

            //TODO allow expressions that can help make calculations faster
            //tendered = eval(tendered.toString())

            this.resultList.splice(0,this.resultList.length)

            console.log('tendered:',tendered);
            console.log('fare:', fare);

            if(fare > 0){

                if(tendered >= fare){


                    for(let i = 0; i < MAX_PASSENGERS_PER_ROW; i++ ){

                        let change = getChangeAmount(fare, tendered, (i + 1))

                        if( change > 0 ){
                            this.resultList.push( (i + 1) + ' Passengers: R ' + change)
                        }
                        else //Make provision for short change, if less than R10 then it may be a ligimate mistake
                            if ( change < 0 && change > - 10 ){
                                this.resultList.push( (i + 1) + ' Passengers: Short R ' + Math.abs(change))
                            }
                    }

                    if ( tendered == fare ){
                        this.resultList.push( 'E shap! Hola. There is no change for the passenger.')
                    }

                }
                else{
                    //It is only enough for how many passengers?
                    alert('Tendered amount is short!')
                }

            }
            else{
                alert('Fare is less tha 0, which seems very unlikely')
            }
        }
    });

    viewModel.selectedFare = 13;
    viewModel.resultList = new observableArray.ObservableArray([]);

    viewModel.set('littleWarningMessage', 'Assuming a maximum passenger vehicle of '
    + MAX_PASSENGERS_PER_VEHICLE + ' persons');

    viewModel.set('passengersTotal', MAX_PASSENGERS_PER_VEHICLE * viewModel.get('selectedFare'));

    return viewModel;
}

function getChangeAmount(fare, tendered, people){
    return tendered - (fare * people)
}

exports.createViewModel = createViewModel;
