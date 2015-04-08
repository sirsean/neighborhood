var Actions = require("../actions/Actions.js");
var NoNeighborhoodFound = require("./NoNeighborhoodFound.js");
var Icon = require("./Icon.js");

module.exports = React.createClass({
  refresh: function() {
    Actions.loadLocation();
  },
  render: function() {
    var neighborhood = this.props.neighborhood;

    var content = null;
    if (!neighborhood) {
      content = <NoNeighborhoodFound />;
    } else {
      content = (
        <div className="full-height flex column nowrap justify-center align-center margin-medium text-center">
          <div className="flex grow align-end">You are in</div>
          <div className="neighborhood-name">{neighborhood.Name}</div>
          <div className="flex grow align-center">
            <button onClick={this.refresh}><Icon icon="reload" /></button>
          </div>
        </div>
      );
    }
    return content;
  }
});
