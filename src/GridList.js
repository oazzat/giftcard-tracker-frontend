import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    // opacity: ".5"
  },
  gridList: {
    width: '1300px',
    height: "auto",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function GridListContainer(props) {
  const { classes } = props;

  return (
    <div className={classes.root} style={{backgroundColor: "burlywood"}}>
      <GridList cols={4}cellHeight={200}  className={classes.gridList}>

      {props.cards?(<GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
      {/*<ListSubheader style={{display:"block",marginLeft: "0px", marginRight: "0px", width:"40%", fontSize:"25px"}}component="div">All My Current Cards:</ListSubheader>*/}
      </GridListTile>)
      :
      (<GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
      <ListSubheader component="div"></ListSubheader>
      </GridListTile>)}
        {props.cards?
        (props.cards.map(tile => (

          <GridListTile style={{paddingTop: "40px", display:"block", marginRight: "auto", marginLeft: "auto"}}cols ={1} rows={1.2}key={tile.id*(Math.random()*100)}>
          {tile.hasExpired?<img  style={{position:"absolute" , width: '85%',marginLeft:"auto",marginRight:"auto", height: "120px", paddingTop: "25px"}} src={"https://pngimage.net/wp-content/uploads/2018/05/expired-png-1.png"} alt={tile.title} />
          :null}
            <div style={{display: "block",width:"85%",marginLeft: "auto", marginRight: "auto"}}>
            <img style={{width: '85%',marginLeft:"auto",marginRight:"auto", height: "120px", paddingTop: "25px"}}onClick={props.toSell?()=>props.handleClick(tile):null}  src={tile.store.img} alt={tile.title} />

            <GridListTileBar
              rows={2}
              style={{height: "20%", width: "85%", paddingBottom: "10px", marginLeft: "auto",marginRight: "auto", borderRadius: "10px"}}
              title={<span style={{display: "flex"}}>Balance: $ {tile.balance}</span>}
              subtitle={<span style={{display: "flex", marginLeft: '80px'}}>Exp: {moment(tile.exp_date).format("MM-DD-YY")}</span>}

            />
            </div>
          </GridListTile>)))
          :
          props.listings?(props.listings.map(tile => (
            <GridListTile style={{paddingTop: "40px"}}cols ={1} rows={1.2} key={tile.id*(Math.random()*100)}>
            {tile.hasExpired?<img  style={{position:"absolute" , width: '85%',marginLeft:"auto",marginRight:"auto", height: "120px", paddingTop: "25px"}} src={"https://pngimage.net/wp-content/uploads/2018/05/expired-png-1.png"} alt={tile.title} />
            :null}
            <div style={{display: "block",width:"85%",marginLeft: "auto", marginRight: "auto"}}>
              <img onClick={()=>props.handleClick(tile)} style={{width: '85%',marginLeft:"auto",marginRight:"auto",height: "120px", paddingTop: "25px"}} src={tile.store.img} alt={tile.title} />

              <GridListTileBar
                style={{height: "20%", width: "85%",paddingBottom: "10px", marginLeft: "auto",marginRight: "auto", borderRadius: "10px"}}
                title={<span style={{display: "flex"}}>Price: $ {tile.listings[tile.listings.length-1].price}</span>}
                subtitle={<span style={{display: "flex"}}> Balance: ${tile.balance}<span style={{marginLeft: "24px"}}>Exp: {moment(tile.exp_date).format("MM-DD-YY")}</span></span>}



              />
              </div>
            </GridListTile>)))
          :
          props.actualListings?
          (props.actualListings.map(tile => (
            <GridListTile style={{paddingTop: "40px"}}cols ={1} rows={1.2} key={tile.id*(Math.random()*100)}>
            {tile.giftcard.hasExpired?<img  style={{position:"absolute" , width: '85%',marginLeft:"auto",marginRight:"auto", height: "120px", paddingTop: "25px"}} src={"https://pngimage.net/wp-content/uploads/2018/05/expired-png-1.png"} alt={tile.title} />
            :null}
            <div style={{display: "block",width:"85%",marginLeft: "auto", marginRight: "auto"}}>
              <img  style={{width: '85%',marginLeft:"auto",marginRight:"auto", height: "120px", paddingTop: "25px"}} src={tile.giftcard.store.img} alt={tile.title} />
              <GridListTileBar
                style={{height: "20%", width: "85%", paddingBottom: "10px", marginLeft: "auto",marginRight: "auto", borderRadius: "10px"}}
                title={<span style={{display: "flex"}}>Balance: $ {tile.giftcard.balance}</span>}
                subtitle={<span style={{display: "flex", marginLeft: '80px'}}>Exp: {moment(tile.exp_date).format("MM-DD-YY")}</span>}



              />
              </div>
            </GridListTile>)))
        :null}

      </GridList>
    </div>
  );
}

GridListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridListContainer);
