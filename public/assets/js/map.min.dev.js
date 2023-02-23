"use strict";

pano.addListener("varchanged_footer_map", function () {
  switch (pano.getVariableValue("footer_map")) {
    case !0:
      $(".viva-start").addClass("hidden"), HideElement([".layers-side", ".attributes-side"]), ShowElement([".map-side"]), variableFalse(["footer_cart", "footer_layers", "footer_apartments", "attributes_side", "3D_model"]), $(".left-side > .item").not(".floorplan").removeClass("active"), addClass([".map", ".hlp-layer"], "active1");
      break;

    case !1:
      1 == pano.getVariableValue("footer_floorplan") || 1 == pano.getVariableValue("footer_layers") || 1 == pano.getVariableValue("footer_chatbot") || 1 == pano.getVariableValue("footer_social") || 1 == pano.getVariableValue("attributes_side") || 1 == pano.getVariableValue("footer_apartments") ? (HideElement([".map-side"]), removeClass([".map"], "active")) : (HideElement([".map-side"]), removeClass([".map", ".hlp-layer"], "active"));
      break;
  }
}), pano.addListener("varchanged_map_full", function () {
  switch (pano.getVariableValue("map_full")) {
    case !0:
      HideElement([".map-side"]), variableTrue(["blurred"]), ShowElement([".map-full"]);
      break;

    case !1:
      variableFalse(["blurred"]), HideElement([".map-full"]);
      break;
  }
});