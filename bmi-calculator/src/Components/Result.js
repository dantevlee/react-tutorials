
const Result = ({ BMIResult}) => {

let category;

  if (BMIResult >= 30) {
    category = 'Over Weight'
  }

  return (
    <div>
      <p>{BMIResult} {category}</p>
    </div>
  )
}

export default Result;