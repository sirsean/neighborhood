var NoNeighborhoodFound = require("./NoNeighborhoodFound.js");

module.exports = React.createClass({
  render: function() {
    var neighborhood = this.props.neighborhood;
    console.log("neighborhood", neighborhood);

    var content = null;
    if (!neighborhood) {
      content = <NoNeighborhoodFound />;
    } else {
      content = (
        <div className="full-height flex column nowrap justify-center align-center margin-medium text-center">
          <div>You are in</div>
          <div className="neighborhood-name">{neighborhood.Name}</div>
        </div>
      );
    }
    return content;
  }
});
