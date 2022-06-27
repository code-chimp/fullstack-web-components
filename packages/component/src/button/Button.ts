const buttonStyles = `
  .in-button {
    border-radius: 12px;
    box-sizing: border-box;
    min-height: 44px;
    min-width: 180px;
    font-size: var(--font-body-md);
    font-weight: var(--font-weight-button);
    cursor: pointer;
    padding: 0;
  }

  .in-button.primary {
    background: var(--color-blue-500);
    border: 2px solid var(--color-blue-500);
    color: var(--color-white);
  }
  
  .in-button.secondary {
    background: var(--color-white);
    border: 2px solid var(--color-blue-500);
    color: var(--color-blue-500);
  }
  
  .in-button.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-white);
    border: 2px solid var(--color-blue-500);
    height: 44px;
    width: 44px;
    min-width: 44px;
    color: var(--color-blue-500);
    font-size: var(--font-body-icon);
    padding: var(--padding-xs);
  }
  
  .icon svg {
    width: 100%;
    height: 100%;
  }
  
  .icon.icon-close svg {
    transform: rotateZ(45deg);
  }
  
  .in-button.primary:focus,
  .in-button.secondary:focus,
  .in-button.icon:focus {
    background: var(--color-white);
    color: var(--color-black);
    border: 2px solid var(--color-black);
    outline: none;
  }
  
  .in-button.primary:active,
  .in-button.secondary:active,
  .in-button.icon:active {
    background: var(--color-white);
    color: var(--color-neutral-500);
    border: 2px solid var(--color-neutral-500);
    outline: none;
  }
  
  .in-button.primary[disabled],
  .in-button.secondary[disabled],
  .in-button.icon[disabled] {
    opacity: var(--color-disable);
    background: var(--color-disable);
    color: var(--color-neutral-500);
    border: var(--border-disable);
    cursor: default;
  }
  
  .in-button.primary[disabled]:focus,
  .in-button.primary[disabled]:active,
  .in-button.secondary[disabled]:focus,
  .in-button.secondary[disabled]:active,
  .in-button.icon[disabled]:focus,
  .in-button.icon[disabled]:active {
    border: var(--border-disable);
    outline: none;
    box-shadow: none;
  }
`;

export class ButtonComponent extends HTMLButtonElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add('in-button');
    this.addStyleSheet();
  }

  addStyleSheet() {
    if (document.getElementById('in-button-style')) {
      return;
    }

    const head = document.head;
    const style = document.createElement('style');
    style.setAttribute('id', 'in-button-style');
    style.textContent = buttonStyles;
    head.appendChild(style);
  }
}

customElements.define('in-button', ButtonComponent, { extends: 'button' });
