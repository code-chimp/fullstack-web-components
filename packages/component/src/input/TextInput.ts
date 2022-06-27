import { IElementInternals, ValidityStateFlags } from 'types/lib.elementInternals';
import { validate } from './validator';

export class TextInputComponent extends HTMLElement {
  static formAssociated = true;

  public attachInternals: () => IElementInternals;
  private internals: IElementInternals;
  private $attr = {};

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');

    template.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: var(--font-default);
          font-size: var(--font-body-sm);
        }
        
        input {
          height: var(--input-min-dimension);
          width: 100%;
          border-radius: var(--radius-sm);
          border: var(--border-default);
          font-size: var(--font-body-md);
          padding-left: var(--padding-sm);
          outline: none;
          box-sizing: border-box;
        }
        
        input[disabled] {
          border: var(--border-disable);
          background: var(--color-disable);
          opacity: var(--color-disable);
        }
        
        input[disabled]:focus,
        input[disabled]:focus:hover,
        input[disabled]:active {
          border: var(--border-disable);
          box-shadow: none;
          outline: none;
        }
        
        input:focus,
        input:focus:hover,
        input:active {
          border: var(--border-focus);
        }
        
        input.error,
        input.error:hover,
        input.error:focus,
        input.error:active {
          border: var(--border-error);
          outline: none;
          box-shadow: none;
          color: var(--color-error);
        }
        
        .message {
          margin-top: var(--margin-xxs);
          color: var(--color-error);
          font-weight: var(--font-weight-default);
        }
      </style>
      <div class="control" aria-describedby="message"><input type="text" /></div>
      <div class="message" id="message" aria-role="altert" aria-live="assertive"></div>`;

    shadowRoot.appendChild(template.content.cloneNode(true));
    this.internals = this.attachInternals();
  }

  static get observedAttributes() {
    return [
      'disabled',
      'list',
      'maxlength',
      'minlength',
      'name',
      'pattern',
      'placeholder',
      'readonly',
      'required',
      'spellcheck',
      'type',
      'value',
    ];
  }

  get $input(): HTMLInputElement {
    return this.shadowRoot.querySelector('input');
  }

  // input properties
  get list(): HTMLElement {
    return this.$input.list;
  }

  get disabled(): boolean {
    return this.$input.disabled;
  }
  set disabled(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('disabled', 'true');
    } else {
      this.$input.removeAttribute('disabled');
    }
  }

  get maxlength(): number {
    return this.$input.maxLength;
  }
  set maxlength(max: number) {
    this.$input.maxLength = max;
  }

  get minlength(): number {
    return this.$input.minLength;
  }
  set minlength(min: number) {
    this.$input.minLength = min;
  }

  get pattern(): string {
    return this.$input.pattern;
  }
  set pattern(pattern) {
    this.$input.pattern = pattern;
  }

  get placeholder(): string {
    return this.$input.placeholder;
  }
  set placeholder(placeholder) {
    this.$input.placeholder = placeholder;
  }

  get readonly(): boolean {
    return this.$input.readOnly;
  }

  get required(): boolean {
    return this.$input.required;
  }
  set required(value: boolean | string) {
    if (value === 'true' || value === true) {
      this.$input.setAttribute('required', 'true');
    } else {
      this.$input.removeAttribute('required');
    }
  }

  get spellcheck(): boolean {
    return this.$input.spellcheck;
  }

  get type(): string {
    return this.$input.type ?? 'text';
  }
  set type(type: string) {
    this.$input.setAttribute('type', type);
  }

  get value(): string {
    return this.$input.value;
  }
  set value(value: string) {
    this.$input.value = value;
  }

  // custome properties
  get validity() {
    return this.internals.validity;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }

  attributeChangedCallback(name: string, prev: any, next: any) {
    this.$attr[name] = next;

    switch (name) {
      case 'disabled':
        this.disabled = next;
        break;

      case 'list':
        this.$input.setAttribute('list', next);
        break;

      case 'maxlength':
        this.$input.setAttribute('maxlength', next);
        break;

      case 'minlength':
        this.$input.setAttribute('minlength', next);
        break;

      case 'name':
        this.$input.setAttribute('name', next);
        break;

      case 'pattern':
        this.$input.setAttribute('pattern', next);
        break;

      case 'placeholder':
        this.$input.setAttribute('placeholder', next);
        break;

      case 'readonly':
        this.$input.setAttribute('readonly', next);
        break;

      case 'required':
        this.required = next;
        break;

      case 'spellcheck':
        this.$input.setAttribute('spellcheck', next);
        break;

      case 'type':
        this.$input.setAttribute('type', next);
        break;

      case 'value':
        this.value = next;
        break;
    }
  }

  connectedCallback() {
    this.$input.onblur = () => {
      this.onValidate(true);
    };

    this.$input.onkeyup = () => {
      this.onChange();
    };

    this.$input.onchange = () => {
      this.onChange();
    };

    for (let prop in this.$attr) {
      this.$input.setAttribute(prop, this.$attr[prop]);
    }

    this.onValidate(false);
  }

  formDisabledCallback(disabled) {
    this.$input.disabled = disabled;
  }

  formStateRestoreCallback(state: string, mode: string) {
    this.value = state;
  }

  formResetCallback(state: string) {
    this.value = this.getAttribute('value') || '';
  }

  blur() {
    this.$input.blur();
  }

  focus() {
    this.$input.focus();
  }

  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    this.internals.setValidity(flags, message, anchor);
  }

  checkValidity() {
    return this.internals.checkValidity();
  }

  reportValidity() {
    return this.internals.reportValidity();
  }

  onChange() {
    this.shadowRoot.querySelector('.message').innerHTML = '';
    this.$input.classList.remove('error');
    this.$input.removeAttribute('aria-invalid');
    this.internals.setFormValue(this.value, this.value);
  }

  onValidate(showError: boolean) {
    validate(this, showError);
  }
}

customElements.define('in-textinput', TextInputComponent);
