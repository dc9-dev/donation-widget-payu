// @ts-nocheck
const allowedCharCodes = [65, 66, 84];

const getWidget = (targetElement) => targetElement.closest(".donation-widget");
const getParent = (targetElement) => targetElement.closest("div");
const getChecked = (widget) => widget.querySelector("[name=amount]:checked");
const setFinalAmount = (widget, value) =>
  widget.querySelector("[name=final-amount]").value = value;

const toggleError = (widget, state) =>
  void widget
    .querySelector(".donation-widget__error")
    .setAttribute("aria-hidden", !state);

const toggleDisabledState = (widget, state = true) => {
  const btn = widget.querySelector("[name=submit-donation]");
  const customAmount = widget.querySelector("input[name='custom-amount']");

  btn.disabled = state;
  customAmount.setAttribute("aria-invalid", true);
};

const getMinValue = (widget) =>
  Number(
    widget.querySelector("input[name='custom-amount']").getAttribute("min")
  );

// Helpers
const isNotNumber = (charCode) =>
  charCode > 31 && (charCode < 48 || charCode > 57);

// Handle widget value
const handleValue = (targetElement) => {
  const widget = getWidget(targetElement);
  const { id } = widget;
  const value = Number(targetElement?.value);
  const minValue = getMinValue(widget);

  console.log(`The new value for ${id} is:`, value);
  console.log(`Min value for ${id} is:`, minValue);

  if (value < minValue) {
    toggleDisabledState(widget, true);
    toggleError(widget, true);
  } else {
    toggleDisabledState(widget, false);
    setFinalAmount(widget, value);
    toggleError(widget, false);
  }
};

// Remove selection from fixed values
const removeSelection = (targetElement) => {
  const widget = getWidget(targetElement);
  const selected = widget.querySelector("[name=amount]:checked");

  if (selected) {
    selected.checked = false;
  }
};

// Set state of custom field
const setCustomBtnState = (targetElement, state = true) => {
  const widget = getWidget(targetElement);
  const customParent = getParent(widget.querySelector("[name=custom-amount]"));

  if (state) {
    customParent.classList.add("-active");
  } else {
    customParent.classList.remove("-active");
  }
};

// Handlers
const fixedValueHandler = (target) => {
  handleValue(target);
  setCustomBtnState(target, false);
};

const customValueHandler = (target) => {
  handleValue(target);
  removeSelection(target);
  setCustomBtnState(target, true);
};

document.addEventListener("change", (e) => {
  const { target } = e;

  if (target.matches?.("[name=amount]")) {
    fixedValueHandler(target);
  }

  if (target.matches?.("[name=custom-amount]")) {
    customValueHandler(target);
  }
});

document.addEventListener(
  "focus",
  (e) => {
    const { target } = e;

    if (target.matches?.("[name=custom-amount]")) {
      customValueHandler(target);
    }
  },
  true
);

// Prevent non number keys
document.addEventListener("keydown", (e) => {
  const { target } = e;

  if (target.matches?.("[name=custom-amount]")) {
    const charCode = e.key?.charCodeAt(0);

    console.log("Pressed key", charCode);

    if (!allowedCharCodes.includes(charCode) && isNotNumber(charCode)) {
      e.preventDefault();
      return false;
    }
  }
});

document.addEventListener("keyup", (e) => {
  const { target } = e;

  if (target.matches?.("[name=custom-amount]")) {
    customValueHandler(target);
  }
});
