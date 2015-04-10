var Actions = require("../actions/Actions.js");
var NoNeighborhoodFound = require("./NoNeighborhoodFound.js");
var Icon = require("./Icon.js");

module.exports = React.createClass({
  refresh: function() {
    Actions.loadLocation();
  },
  componentDidMount: function() {
    this.makeMap();
  },
  componentDidUpdate: function(oldProps) {
    if ((oldProps.latitude != this.props.latitude) || (oldProps.longitude != this.props.longitude)) {
      this.makeMap();
    }
  },
  makeMap: function() {
    new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.props.latitude, lng: this.props.longitude },
      zoom: 14,
      disableDefaultUI: true,
      mapTypeControl: false,
      zoomControl: false
    });
  },
  render: function() {
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
            <div className="flex grow align-end front">You are in</div>
            <div className="neighborhood-name front">{neighborhood.Name}</div>
            <div className="flex grow align-center front">
              <button onClick={this.refresh}><Icon icon="reload" /></button>
            </div>
          </div>
        </div>
      );
    }
    return content;
  }
});
