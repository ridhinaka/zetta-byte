// Expected Result : 4200
// Direction :
// Find and returns the largest value

const item = [
  {
    name: 'spoon',
    details: {
      value: 4120,
    },
  },
  {
    name: 'fork',
    details: {
      value: 4200,
    },
  },
  {
    name: 'plate',
    details: {
      value: 2032,
    },
  },
];

function result(item) {
  let maxValue = 0
  for(const eachValue of item){
    if(eachValue['details']['value'] > maxValue){
      maxValue = eachValue['details']['value']
    }
  }

  return maxValue
}

console.log(result(item));