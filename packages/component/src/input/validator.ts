import { ValidityStateFlags } from 'types/lib.elementInternals';

export interface IValidation {
  flag: ValidityStateFlags;
  condition: (elem: HTMLElement) => boolean;
  message?: string;
}

export type Validator = {
  valid?: boolean;
  validations: Array<IValidation>;
};

export function validate(elem: any, showError: boolean) {
  if (!elem.$validator || !elem.$validator.validations) {
    return;
  }
  const activeValidators: Array<IValidation> = [];
  const messageElem = elem.shadowRoot.querySelector('.message');

  if (messageElem) {
    messageElem.innerHTML = '';
  }

  elem.$validator.validations.forEach(validator => {
    if (validator.condition(elem)) {
      elem.setValidity(validator.flag, validator.message);

      if (showError) {
        if (elem.$input) {
          elem.$input.classList.add('error');
        }

        if (messageElem) {
          const div = document.createElement('div');
          div.innerHTML = validator.message;
          messageElem.appendChild(div);
        }
      }
      activeValidators.push(validator);
    }
  });

  if (!activeValidators.length) {
    elem.setValidity({});

    if (elem.$input) {
      elem.$input.classList.remove('error');
    }

    if (messageElem) {
      messageElem.innerHTML = '';
    }
  }

  elem.dispatchEvent(new CustomEvent('validate', { bubbles: true }));
}
