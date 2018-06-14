import React from "react";
var Actions = require("../actions/Actions.js");
import NoNeighborhoodFound from "./NoNeighborhoodFound";
import Icon from "./Icon";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.makeMap = this.makeMap.bind(this);
  }
  refresh() {
    Actions.loadLocation();
  }
  componentDidMount() {
    this.makeMap();
  }
  componentDidUpdate(oldProps) {
    if ((oldProps.latitude != this.props.latitude) || (oldProps.longitude != this.props.longitude)) {
      this.makeMap();
    }
  }
  makeMap() {
    var MAP_TYPE_ID = "custom_style";
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.props.latitude, lng: this.props.longitude },
      zoom: 14,
      disableDefaultUI: true,
      mapTypeId: MAP_TYPE_ID
    });
    var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          { saturation: -100 },
          { visibility: "simplified" },
          { gamma: 0.9 }
        ]
      },
      {
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ], {});
    map.mapTypes.set(MAP_TYPE_ID, customMapType);
  }
  render() {
    var neighborhood = this.props.neighborhood;

    var content = null;
    if (!neighborhood) {
      content = <NoNeighborhoodFound />;
    } else {
      content = (
        <div>
          <div id="map" className="neighborhood-map"></div>
          <div className="map-blocker"></div>
          <div className="full-height flex column nowrap justify-center align-center margin-medium text-center">
            <div className="flex grow align-end front">you are in</div>
            <div className="neighborhood-name front">{neighborhood.Name}</div>
            <div className="flex grow3 align-center front">
              <button onClick={this.refresh}><Icon icon="reload" /></button>
            </div>
          </div>
        </div>
      );
    }
    return content;
  }
}
