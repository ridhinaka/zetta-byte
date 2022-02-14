// Direction : For each value inside the array, get the next smallest prime number value greater than the input number, if input number is already prime return that input
// For example: Input: 4, Expected: 5, Input: 14, Expected: 17, Input: 2, Expected: 2
// Expected: [2, 5, 19, 23, 37, 89]
const number = [2, 4, 18, 20, 35, 84];
const answer = [];

function result(num) {
  var identifier = num / 2;
  for (var j = 2; j <= identifier; j++) {
    if (num % j == 0) {
      return false;
    }
  }
  return true;
}
for (var index = 0; index < number.length; index++) {
  if (result(number[index])) {
    answer.push(number[index]);
  }else{
    number[index]++
    answer.push(number[index])
  }
}

console.log(answer)
console.log(result(answer));



