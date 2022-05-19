(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict"; // @ts-nocheck

var allowedCharCodes = [65, 66, 84];

var getWidget = function getWidget(targetElement) {
  return targetElement.closest(".donation-widget");
};

var getParent = function getParent(targetElement) {
  return targetElement.closest("div");
};

var getChecked = function getChecked(widget) {
  return widget.querySelector("[name=amount]:checked");
};

var setFinalAmount = function setFinalAmount(widget, value) {
  return widget.querySelector("[name=final-amount]").value = value;
};

var toggleError = function toggleError(widget, state) {
  return void widget.querySelector(".donation-widget__error").setAttribute("aria-hidden", !state);
};

var toggleDisabledState = function toggleDisabledState(widget) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var btn = widget.querySelector("[name=submit-donation]");
  var customAmount = widget.querySelector("input[name='custom-amount']");
  btn.disabled = state;
  customAmount.setAttribute("aria-invalid", true);
};

var getMinValue = function getMinValue(widget) {
  return Number(widget.querySelector("input[name='custom-amount']").getAttribute("min"));
}; // Helpers


var isNotNumber = function isNotNumber(charCode) {
  return charCode > 31 && (charCode < 48 || charCode > 57);
}; // Handle widget value


var handleValue = function handleValue(targetElement) {
  var widget = getWidget(targetElement);
  var id = widget.id;
  var value = Number(targetElement === null || targetElement === void 0 ? void 0 : targetElement.value);
  var minValue = getMinValue(widget);
  console.log("The new value for ".concat(id, " is:"), value);
  console.log("Min value for ".concat(id, " is:"), minValue);

  if (value < minValue) {
    toggleDisabledState(widget, true);
    toggleError(widget, true);
  } else {
    toggleDisabledState(widget, false);
    setFinalAmount(widget, value);
    toggleError(widget, false);
  }
}; // Remove selection from fixed values


var removeSelection = function removeSelection(targetElement) {
  var widget = getWidget(targetElement);
  var selected = widget.querySelector("[name=amount]:checked");

  if (selected) {
    selected.checked = false;
  }
}; // Set state of custom field


var setCustomBtnState = function setCustomBtnState(targetElement) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var widget = getWidget(targetElement);
  var customParent = getParent(widget.querySelector("[name=custom-amount]"));

  if (state) {
    customParent.classList.add("-active");
  } else {
    customParent.classList.remove("-active");
  }
}; // Handlers


var fixedValueHandler = function fixedValueHandler(target) {
  handleValue(target);
  setCustomBtnState(target, false);
};

var customValueHandler = function customValueHandler(target) {
  handleValue(target);
  removeSelection(target);
  setCustomBtnState(target, true);
};

document.addEventListener("change", function (e) {
  var _a, _b;

  var target = e.target;

  if ((_a = target.matches) === null || _a === void 0 ? void 0 : _a.call(target, "[name=amount]")) {
    fixedValueHandler(target);
  }

  if ((_b = target.matches) === null || _b === void 0 ? void 0 : _b.call(target, "[name=custom-amount]")) {
    customValueHandler(target);
  }
});
document.addEventListener("focus", function (e) {
  var _a;

  var target = e.target;

  if ((_a = target.matches) === null || _a === void 0 ? void 0 : _a.call(target, "[name=custom-amount]")) {
    customValueHandler(target);
  }
}, true); // Prevent non number keys

document.addEventListener("keydown", function (e) {
  var _a, _b;

  var target = e.target;

  if ((_a = target.matches) === null || _a === void 0 ? void 0 : _a.call(target, "[name=custom-amount]")) {
    var charCode = (_b = e.key) === null || _b === void 0 ? void 0 : _b.charCodeAt(0);
    console.log("Pressed key", charCode);

    if (!allowedCharCodes.includes(charCode) && isNotNumber(charCode)) {
      e.preventDefault();
      return false;
    }
  }
});
document.addEventListener("keyup", function (e) {
  var _a;

  var target = e.target;

  if ((_a = target.matches) === null || _a === void 0 ? void 0 : _a.call(target, "[name=custom-amount]")) {
    customValueHandler(target);
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZnJvbnRlbmQvanMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtjQ0FBOztBQUNBLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsQ0FBekI7O0FBRUEsSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFZLENBQUMsYUFBRDtBQUFBLFNBQW1CLGFBQWEsQ0FBQyxPQUFkLENBQXNCLGtCQUF0QixDQUFuQjtBQUFBLENBQWxCOztBQUNBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxDQUFDLGFBQUQ7QUFBQSxTQUFtQixhQUFhLENBQUMsT0FBZCxDQUFzQixLQUF0QixDQUFuQjtBQUFBLENBQWxCOztBQUNBLElBQU0sVUFBVSxHQUFHLFNBQWIsVUFBYSxDQUFDLE1BQUQ7QUFBQSxTQUFZLE1BQU0sQ0FBQyxhQUFQLENBQXFCLHVCQUFyQixDQUFaO0FBQUEsQ0FBbkI7O0FBQ0EsSUFBTSxjQUFjLEdBQUcsU0FBakIsY0FBaUIsQ0FBQyxNQUFELEVBQVMsS0FBVDtBQUFBLFNBQ3JCLE1BQU0sQ0FBQyxhQUFQLENBQXFCLHFCQUFyQixFQUE0QyxLQUE1QyxHQUFvRCxLQUQvQjtBQUFBLENBQXZCOztBQUdBLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBYyxDQUFDLE1BQUQsRUFBUyxLQUFUO0FBQUEsU0FDbEIsS0FBSyxNQUFNLENBQ1IsYUFERSxDQUNZLHlCQURaLEVBRUYsWUFGRSxDQUVXLGFBRlgsRUFFMEIsQ0FBQyxLQUYzQixDQURhO0FBQUEsQ0FBcEI7O0FBS0EsSUFBTSxtQkFBbUIsR0FBRyxTQUF0QixtQkFBc0IsQ0FBQyxNQUFELEVBQXlCO0FBQUEsTUFBaEIsS0FBZ0IsdUVBQVIsSUFBUTtBQUNuRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsYUFBUCxDQUFxQix3QkFBckIsQ0FBWjtBQUNBLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxhQUFQLENBQXFCLDZCQUFyQixDQUFyQjtBQUVBLEtBQUcsQ0FBQyxRQUFKLEdBQWUsS0FBZjtBQUNBLGNBQVksQ0FBQyxZQUFiLENBQTBCLGNBQTFCLEVBQTBDLElBQTFDO0FBQ0QsQ0FORDs7QUFRQSxJQUFNLFdBQVcsR0FBRyxTQUFkLFdBQWMsQ0FBQyxNQUFEO0FBQUEsU0FDbEIsTUFBTSxDQUNKLE1BQU0sQ0FBQyxhQUFQLENBQXFCLDZCQUFyQixFQUFvRCxZQUFwRCxDQUFpRSxLQUFqRSxDQURJLENBRFk7QUFBQSxDQUFwQixDLENBS0E7OztBQUNBLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBYyxDQUFDLFFBQUQ7QUFBQSxTQUNsQixRQUFRLEdBQUcsRUFBWCxLQUFrQixRQUFRLEdBQUcsRUFBWCxJQUFpQixRQUFRLEdBQUcsRUFBOUMsQ0FEa0I7QUFBQSxDQUFwQixDLENBR0E7OztBQUNBLElBQU0sV0FBVyxHQUFHLFNBQWQsV0FBYyxDQUFDLGFBQUQsRUFBa0I7QUFDcEMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLGFBQUQsQ0FBeEI7QUFDQSxNQUFRLEVBQVIsR0FBZSxNQUFmLENBQVEsRUFBUjtBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxhQUFhLFNBQWIsaUJBQWEsV0FBYixHQUFhLE1BQWIsZ0JBQWEsQ0FBRSxLQUFoQixDQUFwQjtBQUNBLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFELENBQTVCO0FBRUEsU0FBTyxDQUFDLEdBQVIsNkJBQWlDLEVBQWpDLFdBQTJDLEtBQTNDO0FBQ0EsU0FBTyxDQUFDLEdBQVIseUJBQTZCLEVBQTdCLFdBQXVDLFFBQXZDOztBQUVBLE1BQUksS0FBSyxHQUFHLFFBQVosRUFBc0I7QUFDcEIsdUJBQW1CLENBQUMsTUFBRCxFQUFTLElBQVQsQ0FBbkI7QUFDQSxlQUFXLENBQUMsTUFBRCxFQUFTLElBQVQsQ0FBWDtBQUNELEdBSEQsTUFHTztBQUNMLHVCQUFtQixDQUFDLE1BQUQsRUFBUyxLQUFULENBQW5CO0FBQ0Esa0JBQWMsQ0FBQyxNQUFELEVBQVMsS0FBVCxDQUFkO0FBQ0EsZUFBVyxDQUFDLE1BQUQsRUFBUyxLQUFULENBQVg7QUFDRDtBQUNGLENBakJELEMsQ0FtQkE7OztBQUNBLElBQU0sZUFBZSxHQUFHLFNBQWxCLGVBQWtCLENBQUMsYUFBRCxFQUFrQjtBQUN4QyxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsYUFBRCxDQUF4QjtBQUNBLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxhQUFQLENBQXFCLHVCQUFyQixDQUFqQjs7QUFFQSxNQUFJLFFBQUosRUFBYztBQUNaLFlBQVEsQ0FBQyxPQUFULEdBQW1CLEtBQW5CO0FBQ0Q7QUFDRixDQVBELEMsQ0FTQTs7O0FBQ0EsSUFBTSxpQkFBaUIsR0FBRyxTQUFwQixpQkFBb0IsQ0FBQyxhQUFELEVBQWdDO0FBQUEsTUFBaEIsS0FBZ0IsdUVBQVIsSUFBUTtBQUN4RCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsYUFBRCxDQUF4QjtBQUNBLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBUCxDQUFxQixzQkFBckIsQ0FBRCxDQUE5Qjs7QUFFQSxNQUFJLEtBQUosRUFBVztBQUNULGdCQUFZLENBQUMsU0FBYixDQUF1QixHQUF2QixDQUEyQixTQUEzQjtBQUNELEdBRkQsTUFFTztBQUNMLGdCQUFZLENBQUMsU0FBYixDQUF1QixNQUF2QixDQUE4QixTQUE5QjtBQUNEO0FBQ0YsQ0FURCxDLENBV0E7OztBQUNBLElBQU0saUJBQWlCLEdBQUcsU0FBcEIsaUJBQW9CLENBQUMsTUFBRCxFQUFXO0FBQ25DLGFBQVcsQ0FBQyxNQUFELENBQVg7QUFDQSxtQkFBaUIsQ0FBQyxNQUFELEVBQVMsS0FBVCxDQUFqQjtBQUNELENBSEQ7O0FBS0EsSUFBTSxrQkFBa0IsR0FBRyxTQUFyQixrQkFBcUIsQ0FBQyxNQUFELEVBQVc7QUFDcEMsYUFBVyxDQUFDLE1BQUQsQ0FBWDtBQUNBLGlCQUFlLENBQUMsTUFBRCxDQUFmO0FBQ0EsbUJBQWlCLENBQUMsTUFBRCxFQUFTLElBQVQsQ0FBakI7QUFDRCxDQUpEOztBQU1BLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxVQUFDLENBQUQsRUFBTTs7O0FBQ3hDLE1BQVEsTUFBUixHQUFtQixDQUFuQixDQUFRLE1BQVI7O0FBRUEsTUFBSSxZQUFNLENBQUMsT0FBUCxNQUFjLElBQWQsSUFBYyxhQUFkLEdBQWMsTUFBZCxHQUFjLGdCQUFHLGVBQUgsQ0FBbEIsRUFBdUM7QUFDckMscUJBQWlCLENBQUMsTUFBRCxDQUFqQjtBQUNEOztBQUVELE1BQUksWUFBTSxDQUFDLE9BQVAsTUFBYyxJQUFkLElBQWMsYUFBZCxHQUFjLE1BQWQsR0FBYyxnQkFBRyxzQkFBSCxDQUFsQixFQUE4QztBQUM1QyxzQkFBa0IsQ0FBQyxNQUFELENBQWxCO0FBQ0Q7QUFDRixDQVZEO0FBWUEsUUFBUSxDQUFDLGdCQUFULENBQ0UsT0FERixFQUVFLFVBQUMsQ0FBRCxFQUFNOzs7QUFDSixNQUFRLE1BQVIsR0FBbUIsQ0FBbkIsQ0FBUSxNQUFSOztBQUVBLE1BQUksWUFBTSxDQUFDLE9BQVAsTUFBYyxJQUFkLElBQWMsYUFBZCxHQUFjLE1BQWQsR0FBYyxnQkFBRyxzQkFBSCxDQUFsQixFQUE4QztBQUM1QyxzQkFBa0IsQ0FBQyxNQUFELENBQWxCO0FBQ0Q7QUFDRixDQVJILEVBU0UsSUFURixFLENBWUE7O0FBQ0EsUUFBUSxDQUFDLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFVBQUMsQ0FBRCxFQUFNOzs7QUFDekMsTUFBUSxNQUFSLEdBQW1CLENBQW5CLENBQVEsTUFBUjs7QUFFQSxNQUFJLFlBQU0sQ0FBQyxPQUFQLE1BQWMsSUFBZCxJQUFjLGFBQWQsR0FBYyxNQUFkLEdBQWMsZ0JBQUcsc0JBQUgsQ0FBbEIsRUFBOEM7QUFDNUMsUUFBTSxRQUFRLEdBQUcsT0FBQyxDQUFDLEdBQUYsTUFBSyxJQUFMLElBQUssYUFBTCxHQUFLLE1BQUwsR0FBSyxHQUFFLFVBQUYsQ0FBYSxDQUFiLENBQXRCO0FBRUEsV0FBTyxDQUFDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCLFFBQTNCOztBQUVBLFFBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFqQixDQUEwQixRQUExQixDQUFELElBQXdDLFdBQVcsQ0FBQyxRQUFELENBQXZELEVBQW1FO0FBQ2pFLE9BQUMsQ0FBQyxjQUFGO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGLENBYkQ7QUFlQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBQyxDQUFELEVBQU07OztBQUN2QyxNQUFRLE1BQVIsR0FBbUIsQ0FBbkIsQ0FBUSxNQUFSOztBQUVBLE1BQUksWUFBTSxDQUFDLE9BQVAsTUFBYyxJQUFkLElBQWMsYUFBZCxHQUFjLE1BQWQsR0FBYyxnQkFBRyxzQkFBSCxDQUFsQixFQUE4QztBQUM1QyxzQkFBa0IsQ0FBQyxNQUFELENBQWxCO0FBQ0Q7QUFDRixDQU5EIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gQHRzLW5vY2hlY2tcbmNvbnN0IGFsbG93ZWRDaGFyQ29kZXMgPSBbNjUsIDY2LCA4NF07XG5cbmNvbnN0IGdldFdpZGdldCA9ICh0YXJnZXRFbGVtZW50KSA9PiB0YXJnZXRFbGVtZW50LmNsb3Nlc3QoXCIuZG9uYXRpb24td2lkZ2V0XCIpO1xuY29uc3QgZ2V0UGFyZW50ID0gKHRhcmdldEVsZW1lbnQpID0+IHRhcmdldEVsZW1lbnQuY2xvc2VzdChcImRpdlwiKTtcbmNvbnN0IGdldENoZWNrZWQgPSAod2lkZ2V0KSA9PiB3aWRnZXQucXVlcnlTZWxlY3RvcihcIltuYW1lPWFtb3VudF06Y2hlY2tlZFwiKTtcbmNvbnN0IHNldEZpbmFsQW1vdW50ID0gKHdpZGdldCwgdmFsdWUpID0+XG4gIHdpZGdldC5xdWVyeVNlbGVjdG9yKFwiW25hbWU9ZmluYWwtYW1vdW50XVwiKS52YWx1ZSA9IHZhbHVlO1xuXG5jb25zdCB0b2dnbGVFcnJvciA9ICh3aWRnZXQsIHN0YXRlKSA9PlxuICB2b2lkIHdpZGdldFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmRvbmF0aW9uLXdpZGdldF9fZXJyb3JcIilcbiAgICAuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgIXN0YXRlKTtcblxuY29uc3QgdG9nZ2xlRGlzYWJsZWRTdGF0ZSA9ICh3aWRnZXQsIHN0YXRlID0gdHJ1ZSkgPT4ge1xuICBjb25zdCBidG4gPSB3aWRnZXQucXVlcnlTZWxlY3RvcihcIltuYW1lPXN1Ym1pdC1kb25hdGlvbl1cIik7XG4gIGNvbnN0IGN1c3RvbUFtb3VudCA9IHdpZGdldC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT0nY3VzdG9tLWFtb3VudCddXCIpO1xuXG4gIGJ0bi5kaXNhYmxlZCA9IHN0YXRlO1xuICBjdXN0b21BbW91bnQuc2V0QXR0cmlidXRlKFwiYXJpYS1pbnZhbGlkXCIsIHRydWUpO1xufTtcblxuY29uc3QgZ2V0TWluVmFsdWUgPSAod2lkZ2V0KSA9PlxuICBOdW1iZXIoXG4gICAgd2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSdjdXN0b20tYW1vdW50J11cIikuZ2V0QXR0cmlidXRlKFwibWluXCIpXG4gICk7XG5cbi8vIEhlbHBlcnNcbmNvbnN0IGlzTm90TnVtYmVyID0gKGNoYXJDb2RlKSA9PlxuICBjaGFyQ29kZSA+IDMxICYmIChjaGFyQ29kZSA8IDQ4IHx8IGNoYXJDb2RlID4gNTcpO1xuXG4vLyBIYW5kbGUgd2lkZ2V0IHZhbHVlXG5jb25zdCBoYW5kbGVWYWx1ZSA9ICh0YXJnZXRFbGVtZW50KSA9PiB7XG4gIGNvbnN0IHdpZGdldCA9IGdldFdpZGdldCh0YXJnZXRFbGVtZW50KTtcbiAgY29uc3QgeyBpZCB9ID0gd2lkZ2V0O1xuICBjb25zdCB2YWx1ZSA9IE51bWJlcih0YXJnZXRFbGVtZW50Py52YWx1ZSk7XG4gIGNvbnN0IG1pblZhbHVlID0gZ2V0TWluVmFsdWUod2lkZ2V0KTtcblxuICBjb25zb2xlLmxvZyhgVGhlIG5ldyB2YWx1ZSBmb3IgJHtpZH0gaXM6YCwgdmFsdWUpO1xuICBjb25zb2xlLmxvZyhgTWluIHZhbHVlIGZvciAke2lkfSBpczpgLCBtaW5WYWx1ZSk7XG5cbiAgaWYgKHZhbHVlIDwgbWluVmFsdWUpIHtcbiAgICB0b2dnbGVEaXNhYmxlZFN0YXRlKHdpZGdldCwgdHJ1ZSk7XG4gICAgdG9nZ2xlRXJyb3Iod2lkZ2V0LCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICB0b2dnbGVEaXNhYmxlZFN0YXRlKHdpZGdldCwgZmFsc2UpO1xuICAgIHNldEZpbmFsQW1vdW50KHdpZGdldCwgdmFsdWUpO1xuICAgIHRvZ2dsZUVycm9yKHdpZGdldCwgZmFsc2UpO1xuICB9XG59O1xuXG4vLyBSZW1vdmUgc2VsZWN0aW9uIGZyb20gZml4ZWQgdmFsdWVzXG5jb25zdCByZW1vdmVTZWxlY3Rpb24gPSAodGFyZ2V0RWxlbWVudCkgPT4ge1xuICBjb25zdCB3aWRnZXQgPSBnZXRXaWRnZXQodGFyZ2V0RWxlbWVudCk7XG4gIGNvbnN0IHNlbGVjdGVkID0gd2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT1hbW91bnRdOmNoZWNrZWRcIik7XG5cbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgc2VsZWN0ZWQuY2hlY2tlZCA9IGZhbHNlO1xuICB9XG59O1xuXG4vLyBTZXQgc3RhdGUgb2YgY3VzdG9tIGZpZWxkXG5jb25zdCBzZXRDdXN0b21CdG5TdGF0ZSA9ICh0YXJnZXRFbGVtZW50LCBzdGF0ZSA9IHRydWUpID0+IHtcbiAgY29uc3Qgd2lkZ2V0ID0gZ2V0V2lkZ2V0KHRhcmdldEVsZW1lbnQpO1xuICBjb25zdCBjdXN0b21QYXJlbnQgPSBnZXRQYXJlbnQod2lkZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT1jdXN0b20tYW1vdW50XVwiKSk7XG5cbiAgaWYgKHN0YXRlKSB7XG4gICAgY3VzdG9tUGFyZW50LmNsYXNzTGlzdC5hZGQoXCItYWN0aXZlXCIpO1xuICB9IGVsc2Uge1xuICAgIGN1c3RvbVBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiLWFjdGl2ZVwiKTtcbiAgfVxufTtcblxuLy8gSGFuZGxlcnNcbmNvbnN0IGZpeGVkVmFsdWVIYW5kbGVyID0gKHRhcmdldCkgPT4ge1xuICBoYW5kbGVWYWx1ZSh0YXJnZXQpO1xuICBzZXRDdXN0b21CdG5TdGF0ZSh0YXJnZXQsIGZhbHNlKTtcbn07XG5cbmNvbnN0IGN1c3RvbVZhbHVlSGFuZGxlciA9ICh0YXJnZXQpID0+IHtcbiAgaGFuZGxlVmFsdWUodGFyZ2V0KTtcbiAgcmVtb3ZlU2VsZWN0aW9uKHRhcmdldCk7XG4gIHNldEN1c3RvbUJ0blN0YXRlKHRhcmdldCwgdHJ1ZSk7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBlO1xuXG4gIGlmICh0YXJnZXQubWF0Y2hlcz8uKFwiW25hbWU9YW1vdW50XVwiKSkge1xuICAgIGZpeGVkVmFsdWVIYW5kbGVyKHRhcmdldCk7XG4gIH1cblxuICBpZiAodGFyZ2V0Lm1hdGNoZXM/LihcIltuYW1lPWN1c3RvbS1hbW91bnRdXCIpKSB7XG4gICAgY3VzdG9tVmFsdWVIYW5kbGVyKHRhcmdldCk7XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICBcImZvY3VzXCIsXG4gIChlKSA9PiB7XG4gICAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG5cbiAgICBpZiAodGFyZ2V0Lm1hdGNoZXM/LihcIltuYW1lPWN1c3RvbS1hbW91bnRdXCIpKSB7XG4gICAgICBjdXN0b21WYWx1ZUhhbmRsZXIodGFyZ2V0KTtcbiAgICB9XG4gIH0sXG4gIHRydWVcbik7XG5cbi8vIFByZXZlbnQgbm9uIG51bWJlciBrZXlzXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZSkgPT4ge1xuICBjb25zdCB7IHRhcmdldCB9ID0gZTtcblxuICBpZiAodGFyZ2V0Lm1hdGNoZXM/LihcIltuYW1lPWN1c3RvbS1hbW91bnRdXCIpKSB7XG4gICAgY29uc3QgY2hhckNvZGUgPSBlLmtleT8uY2hhckNvZGVBdCgwKTtcblxuICAgIGNvbnNvbGUubG9nKFwiUHJlc3NlZCBrZXlcIiwgY2hhckNvZGUpO1xuXG4gICAgaWYgKCFhbGxvd2VkQ2hhckNvZGVzLmluY2x1ZGVzKGNoYXJDb2RlKSAmJiBpc05vdE51bWJlcihjaGFyQ29kZSkpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0pO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgY29uc3QgeyB0YXJnZXQgfSA9IGU7XG5cbiAgaWYgKHRhcmdldC5tYXRjaGVzPy4oXCJbbmFtZT1jdXN0b20tYW1vdW50XVwiKSkge1xuICAgIGN1c3RvbVZhbHVlSGFuZGxlcih0YXJnZXQpO1xuICB9XG59KTtcbiJdfQ==
