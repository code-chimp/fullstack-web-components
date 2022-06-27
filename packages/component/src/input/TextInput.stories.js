import { TextInputComponent } from './TextInput';
import { ButtonComponent } from '../button/Button';
import { html } from 'lit-html';

export default {
  title: 'Components/Inputs/TextInput',
  component: 'in-textinput',
};

const validators = {
  username: {
    validations: [
      {
        flag: { valueMissing: true },
        message: 'Error: Required',
        condition: input => input.required && input.value.length <= 0,
      },
      {
        flag: { tooShort: true },
        message:
          'Error: Minimum length not met, please supply a value with at least 8 characters',
        condition: input => input.minlength && input.value.length < input.minlength,
      },
    ],
  },
  password: {
    validations: [
      {
        flag: { valueMissing: true },
        message: 'Error: Required',
        condition: input => input.required && input.value.length <= 0,
      },
      {
        flag: { tooShort: true },
        message:
          'Error: Minimum length not met, please supply a value with at least 8 characters',
        condition: input => input.minlength && input.value.length < input.minlength,
      },
      {
        flag: { patternMismatch: true },
        message:
          'Error: Please use at least one uppercase letter, one lowercase letter, special character, and at least one number',
        condition: input =>
          input.pattern && input.value.match(new RegExp(input.pattern)) === null,
      },
    ],
  },
};

const PrimaryTemplate = ({ onValidate, validators }) => {
  setTimeout(() => {
    const input = document.querySelector(`[name="username"]`);

    input.$validator = validators.username;
  }, 0);

  return html`<form @validate="${onValidate}">
    <in-textinput name="username" placeholder="Value is required" required></in-textinput>
  </form>`;
};

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  validators,
  onValidate: ev => {
    if (!document.querySelector('[name="username"]').validity.valid) {
      console.warn('INVALID');
    } else {
      console.log('VALID');
    }
  },
};

const DisabledTemplate = ({}) => {
  return html`<in-textinput
    name="disabled-input"
    disabled
    value="I'm disabled"
  ></in-textinput>`;
};
export const Disabled = DisabledTemplate.bind({});
DisabledTemplate.args = {};

const ErrorTemplate = ({ onValidate, validators }) => {
  setTimeout(() => {
    const input = document.querySelector(`[name="username"]`);

    input.$validator = validators.username;
    input.focus();
    input.blur();
  }, 0);

  return html` <in-textinput id="username" name="username" class="form-control" required>
  </in-textinput>`;
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  validators,
  onValidate: ev => {
    if (!document.querySelector('[name="username"]').validity.valid) {
      console.warn('INVALID');
    } else {
      console.log('VALID');
    }
  },
};

const FormTemplate = ({ headline, onSubmit, onValidate, onFormData }) => {
  setTimeout(() => {
    for (let prop in validators) {
      document.querySelector(`[name="${prop}"]`).$validator = validators[prop];
    }
  }, 0);

  return html`<h4 slot="header">${headline}</h4>
    <form
      name="foo"
      slot="content"
      @formdata="${onFormData}"
      @validate="${onValidate}"
      @submit="${onSubmit}"
    >
      <fieldset>
        <legend>Login Form</legend>
        <label for="username">Username</label>
        <in-textinput
          id="username"
          name="username"
          class="form-control"
          required
          minlength="8"
        ></in-textinput>
        <label for="password">Password</label>
        <in-textinput
          type="password"
          id="password"
          name="password"
          class="form-control"
          required
          minlength="8"
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
        ></in-textinput>
        <button type="submit" is="in-button" class="primary submit">Submit</button>
      </fieldset>
    </form>`;
};

export const Form = FormTemplate.bind({});
Form.args = {
  headline: 'Login',
  onSubmit: e => {
    e.stopPropagation();
    e.preventDefault();
    const bob = new FormData(e.target);
    console.log(new FormData(e.target));
  },
  onValidate: e => {
    const validations = [];
    for (let prop in validators) {
      validations.push(document.querySelector(`[name="${prop}"]`).validity.valid);
    }

    if (validations.some(v => v === false)) {
      console.warn('INVALID');
    } else {
      console.log('VALID');
    }
  },
  onFormData: e => {
    console.log(e);
    for (let value of e.formData.values()) {
      console.log(value);
    }
  },
};
