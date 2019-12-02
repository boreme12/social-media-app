import fetch from 'isomorphic-unfetch'

const List = ({data})=> {
  return(
    <>
      <h1>User Lists</h1>
      <ul>
      {
        data.map(user => {
          return <li key={user._id}>{user.nickname}</li>
        })
      }
      </ul>
    </>
  )
}

List.getInitialProps = async () => {
  const res = await fetch('http://express-container:3030/data')
  const json = await res.json()
  console.log(json)

  return {data: json}
}

export default List;