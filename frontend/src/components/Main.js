import React from "react";
import {connect} from "react-redux";
import LoadingLocation from "./LoadingLocation";
import LocationUnavailable from "./LocationUnavailable";
import LocationFailed from "./LocationFailed";
import LoadingNeighborhood from "./LoadingNeighborhood";
import Neighborhood from "./Neighborhood";

function mapStateToProps(state) {
  return {
    loadingLocation: state.location.loading,
    locationUnavailable: state.location.locationUnavailable,
    locationFailed: state.location.locationFailed,
    loadingNeighborhood: state.neighborhood.loading,
    hasNeighborhood: state.neighborhood.hasNeighborhood,
    neighborhood: state.neighborhood.neighborhood,
    latitude: state.location.latitude,
    longitude: state.location.longitude,
  };
}

class PureMain extends React.PureComponent {
  render() {
    let content = null;
    if (this.props.loadingLocation) {
      content = <LoadingLocation />;
    } else if (this.props.locationUnavailable) {
      content = <LocationUnavailable />;
    } else if (this.props.locationFailed) {
      content = <LocationFailed />;
    } else if (this.props.loadingNeighborhood) {
      content = <LoadingNeighborhood />
    } else if (this.props.hasNeighborhood) {
      content = <Neighborhood
                  neighborhood={this.props.neighborhood}
                  latitude={this.props.latitude}
                  longitude={this.props.longitude}
                  />;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps)(PureMain);