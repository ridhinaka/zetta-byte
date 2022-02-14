// Expected result : [[1, 3, 5, 7, 9], [2, 4, 6, 8, 10]]
// Direction : Return nested array first is odd value and second is even array from the array number
const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function result(number){
  let evenArray = [];
  let oddArray = [];
  let totalArray = [];
  for(const eachNumber of number){
    if(eachNumber % 2 === 0){
      evenArray.push(eachNumber)
    }

    if(eachNumber % 2 === 1){
      oddArray.push(eachNumber)
    }
  }


totalArray.push(oddArray)
totalArray.push(evenArray)

  return totalArray
}

console.log(result(number));