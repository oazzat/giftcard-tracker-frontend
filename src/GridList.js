import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


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
    width: 'responsive',
    height: "responsive",
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
    <div className={classes.root}>
      <GridList cols={4}cellHeight={200}  className={classes.gridList}>

      {props.cards?(<GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
      <ListSubheader component="div">All My Current Cards</ListSubheader>
      </GridListTile>)
      :
      (<GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
      <ListSubheader component="div"></ListSubheader>
      </GridListTile>)}
        {props.cards?
        (props.cards.map(tile => (
          <GridListTile key={tile.id}>
            <img style={{width: "200px", height: "120px", align: "center"}} src={tile.store.img} alt={tile.title} />
            <GridListTileBar
              style={{height: "40px", width: "400px"}}
              title={"Balance: $" + tile.balance}
              subtitle={<span>Balance: ${tile.balance}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>)))
          :
          (props.listings.map(tile => (
            <GridListTile key={tile.id}>
              <img style={{width: "200px", height: "120px", align: "center"}} src={tile.store.img} alt={tile.title} />
              <GridListTileBar
                style={{height: "40px", width: "400px"}}
                title={<span style={{display: "flex"}}>"Price: $" + {tile.listings[0].price}</span>}
                subtitle={<span >Balance: ${tile.balance}</span>}
                actionIcon={
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>)))}

      </GridList>
    </div>
  );
}

GridListContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridListContainer);
