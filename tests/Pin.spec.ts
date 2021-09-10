import { Pin } from "../src/Pin.js";

describe("my tests", () => {
  var template;
  // In beforeAll we perform necessary test setup
  beforeAll(() => {
    // Register custom element
    customElements.define("action-pin", Pin);

    // Create template, required for action-pin
    template = document.createElement("template");

    // Setting template content to empty because we don't need it for this test
    template.innerHTML = ``;
    template.id = "action-pin";
    document.body.appendChild(template);
  });

  afterAll(() => {
    // Not strictly necessary, but good practice to clean up
    document.body.removeChild(template);
  });

  it("should work", () => {
    const pin = document.createElement("action-pin") as any;
    pin.setAttribute("default", "unpinned");
    document.body.appendChild(pin);
    let pinCalled = false;
    let unpinCalled = false;

    pin.onpin = (e) => {
      pinCalled = true;
    };
    pin.onunpin = (e) => {
      unpinCalled = true;
    };

    expect(pinCalled).toBe(false);
    expect(unpinCalled).toBe(false);

    pin.pin();
    expect(pinCalled).toBe(true);
    
    pin.unpin();
    expect(unpinCalled).toBe(true);
  });
});
