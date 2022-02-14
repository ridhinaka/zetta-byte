// Expected Result : 
// [
//   { id: '1', name: 'Sherlock', score: 90 },
//   { id: '4', name: 'Budi', score: 85 }
// ]
// Direction :
// Return array of student for score is bigger than mean score (average score)

const students = [
  {
    id: "1",
    name: "Sherlock",
    score:90
  },
  {
    id: "2",
    name: "Genta",
    score: 75
  },
  {
    id: "3",
    name: "Ai",
    score: 80
  },
  {
    id: "4",
    name: "Budi",
    score:85
  }
]

function result() {
  let averageScore = 0;
  let dataScore = [];
  for(const eachScore of students){
    averageScore += eachScore['score'] / students.length
  }

  for(const eachScore of students){
    if(eachScore['score'] > averageScore){
      dataScore.push(eachScore)
    }
  }

  return dataScore
}

console.log(result());