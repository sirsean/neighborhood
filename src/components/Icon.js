/*
 * This renders an SVG icon from the open-iconic iconset.
 *
 * Specify which icon with the "icon" parameter.
 *
 * You can set an outer class on the <svg> element with "outerClassName", and
 * an inner class on the <use> element with "innerClassName".
 *
 * You'll set the size with the outer class, and the color with the inner class (using the
 * "fill" CSS style).
 *
 *  <Icon icon="map-marker" />
 *  <Icon icon="map-marker" outerClassName="big" />
 *  <Icon icon="map-marker" outerClassName="big" innerClassName="selected" />
 *
 * Note that this has to use "dangerouslySetInnerHTML" because the <use> element isn't
 * on React's whitelist of HTML elements.
 */
var Icon = React.createClass({
  /*
   * This is necessary because we're using dangerouslySetInnerHTML, which won't see className
   * changes. So we need to manually update the class, when it changes.
   */
  componentDidUpdate: function(oldProps) {
    var oldInner = inner(oldProps.innerClassName);
    var newInner = inner(this.props.innerClassName);
    if (oldInner != newInner) {
      var svg = this.getDOMNode();
      var use = svg.firstChild;
      use.setAttribute("class", newInner);
    }
  },
  render: function() {
    var icon = this.props.icon;
    var outerClassName = "icon " + (this.props.outerClassName || "");
    var innerClassName = inner(this.props.innerClassName);
    return (
      <svg viewBox="0 0 8 8" className={outerClassName} dangerouslySetInnerHTML={{__html: '<use xlink:href="/open-iconic.svg#' + icon + '" class="' + innerClassName + '"></use>'}}></svg>
    );
  }
});

function inner(prop) {
  return "inner " + (prop || "");
}

module.exports = Icon;
