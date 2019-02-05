import React from 'react'
import {getCurrentUser} from "./thunks/mainThunk"
import {connect} from 'react-redux'

class Home extends React.Component {

  componentDidMount = () =>{

    this.props.getCurrentUser()

  }

  topSellingCards = () =>{
    let sold = this.props.allListings.filter(listing=>{
      return listing.date_sold !== null
    })

    let wal = 0
    let ama = 0
    let bes = 0
    let tar = 0
    let itu = 0

    let orderedList = [
      {count: 0,},
      {count: 0},
      {count: 0},
      {count: 0},
      {count: 0}

    ]

    if (sold[0]!=""){
      if (sold[0]!=undefined){
        if(sold[0].giftcard !== undefined){


    sold.forEach(listing => {
      if (listing.giftcard['card_type'] === "Best-Buy"){
        orderedList[0]['count']++
        orderedList[0].img = listing.giftcard.img}
      if(listing.giftcard['card_type'] === "Amazon") {
        orderedList[1]['count']++
        orderedList[1].img = listing.giftcard.img}
      if(listing.giftcard['card_type'] === "Walmart") {
        orderedList[2]['count']++
        orderedList[2].img = listing.giftcard.img}
      if (listing.giftcard['card_type'] === "Target") {
        orderedList[3]['count']++
        orderedList[3].img = listing.giftcard.img}
      if (listing.giftcard['card_type'] === "Itunes") {
        orderedList[4]['count']++
        orderedList[4].img = listing.giftcard.img}

        })
      }
    }
  }

    orderedList = orderedList.sort((a,b)=>{
      // console.log("SORT", a.count);
      // console.log("SORT", b.count);
      return a.count < b.count?1:-1
    });

    return orderedList.map((c,i)=>{
      return <li key={i}> <img alt="" src={c.img}/> </li>
    })
  }

  render(){
    return(
      <div>
        <h2>Home Page</h2>

        BEST SELLING CARDS:

        <ol>
        {this.topSellingCards()}
        </ol>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {getCurrentUser: () => dispatch(getCurrentUser())}

}

const mapStateToProps = state =>{
  return {allCards: state.state.allCards, allListings: state.state.allListings}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
