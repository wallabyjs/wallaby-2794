export interface iConfiguration {
  template: string;
}

export interface iHandler {
  (any): void
}

enum events {
  onon = 'onon',
  onoff = 'onoff'
}

export abstract class Action extends HTMLElement {
  /**
   * Enable change tracking of selected attributes used in the declarative interface.
   *
   * @category Generic
   */
  static get observedAttributes(): string[] {
      return ['default'];
  }

  protected states;

  /**
   * DOM Elements
   */
  protected root: ShadowRoot;
  protected template: HTMLTemplateElement;
  protected svgClass: string;

  protected _connected: boolean = false;

  constructor(configuration: iConfiguration) { 
      super();
      this.init(configuration);
  }

  protected init(configuration: iConfiguration): void {
      this._attachRoot();
      this._loadTemplate(configuration.template);
      this._attachTemplate();
      this._loadHandler(); 
  }

  /**
   * @category State
   */
  public get state(): string {
      return this.getAttribute('state');
  }
  public set state(value: string) {
      if (this._stateChanged(value)) {
          this.setAttribute('state',value);
          this._triggerChangeEvent(value);
      }
  }

  /**
   * @category Configuration
   */
  public get default(): string {
      return this.getAttribute('default');
  }

  /**
   * @category State
   */
  public get connected(): boolean {
      return this._connected;
  }

  /**
   * @event
   */
  protected set onon(handler: iHandler) {
      this.addEventListener(events.onon,handler);
  }

  /**
   * @event
   */
  protected set onoff(handler: iHandler) {
      this.addEventListener(events.onoff,handler);
  }

  /**
   * @category Imperative API
   */
  protected switchOn = (): string => this.state = this.states.on

  /**
   * @category Imperative API
   */
  protected switchOff = (): string => this.state = this.states.off

  /**
   * @category Imperative API
   */
  public toggle = (): string => this.state == this.states.on ? this.switchOff() : this.switchOn()
 
  /**
   * Called after connection with DOM established
   * @category Generic
   */
  public connectedCallback(): void {
      this._connected = true;
      this._loadDefaultState();
  }

  /**
   * Called after connection with DOM removed
   * @category Generic
   */
  public disconnectedCallback(): void {
      this._connected = false;
  }

  /**
   * Called after component moved to new DOM
   * @category Generic
   */
  public adoptedCallback(): void {
  }

  /**
   * Triggers when attribute in this.attributes initial or subsequent value set.
   * @category Generic
   */
  public attributeChangedCallback(attribute: string, 
                                  oldValue: string, 
                                  newValue: string): void {
      
      if (this._connected) { 
          //console.log(`${attribute} changed After Component Connected to DOM`)
      };
      if (!this._connected) { 
          //console.log(`${attribute} defined Before Component Connected to DOM1`)
      };

      /* istanbul ignore next */
      if (oldValue === newValue) { 
          return 
      };

      switch (attribute) {
          case 'default':
              this._loadDefaultState();
              //console.log(`default changed from ${oldValue} to ${newValue}`)
              break;
      };
  }

  private _attachRoot = () => { this.root = this.attachShadow({mode: 'closed'}) }
  private _loadTemplate = (id: string) => { this.template = document.getElementById(id) as HTMLTemplateElement }
  private _attachTemplate = () => this.root.appendChild(this.template.content.cloneNode(true));  
  private _loadHandler = () => { this.onclick = this._handler }
  private _stateChanged = (value: string):boolean => value != this.state

  private _triggerChangeEvent = (value) => {
      value == this.states.on && this.dispatchEvent(new CustomEvent(events.onon,{}));
      value == this.states.off && this.dispatchEvent(new CustomEvent(events.onoff,{}));
  }

  private _loadDefaultState = () => { 
      this.default == this.states.on && this.switchOn() 
      this.default == this.states.off && this.switchOff()
  }

  private _handler: iHandler = (event: PointerEvent): void => {
      event.stopPropagation();
      this.toggle()
  }   
}
