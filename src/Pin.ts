import { Action, iHandler } from './Action.js'

/**
 * Component States
 */
export enum states {
    on = 'pinned',
    off = 'unpinned'
}

/**
 * Component Events
 */
export enum events {
    onpin = 'onpin',
    onunpin = 'onunpin'
}

/**
 * Action-Pin Web Component
 */
export class Pin extends Action { 
    static get tag() {
        return "action-pin";
      } 

    protected states = states;
    
    constructor() { 
        super({
            template: 'action-pin'
        });
    }
    
   /**
    * @event
    */
    public set onpin(handler: iHandler) { this.onon = handler }
    
   /**
    * @event
    */
    public set onunpin(handler: iHandler) { this.onoff = handler }

   /**
    * @category Imperative API
    */
    public pin = () => this.switchOn()

   /**
    * @category Imperative API
    */
    public unpin = () => this.switchOff()
}
