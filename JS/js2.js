// Expected Result = true
// Direction : need to check if each of array value has value less than 91
const array1 = [1, 29, 88, 37, 22, '90'];

function result(array1) {
  let check = 0
  for(const eachData of array1){
    if(eachData > 91){
      check = 1
    }
  }
  if(check === 0){
    return true
  }

  if(check === 1){
    return false
  }
}

console.log(result(array1));