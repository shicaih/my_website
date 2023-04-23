import React from 'react';

// Helpers
import { scrollElementIntoView } from '../helpers';

// A UI component that looks like button but has no interactivity
export const Buttony = ({ boldText, buttonText, styleT }) => (
  <div
    className={`rounded-lg bg-zinc-700 p-3 text-center text-sm transition ${styleT}`}
  >
    <span className="font-sansB">{boldText}</span>
    {buttonText}
  </div>
);

export const ScrollIndicator = ({ scrollToId }) => (
  <i
    className="cursor-pointer"
    onClick={() => scrollElementIntoView(scrollToId)}
  >
    <span className="material-symbols-outlined animate-bounceAndPulse text-6xl">
      keyboard_arrow_down
    </span>
  </i>
);

export const BasicButton = ({ buttonText, onClick, tStyle }) => (
  <button
    type="button"
    className={`inline-block w-full rounded py-3 text-center text-sm transition hover:cursor-pointer ${tStyle}`}
    onClick={onClick}
  >
    {buttonText}
  </button>
);

export const RadioButton = ({ buttonText, onClick, checked }) => (
  <div onClick={onClick}>
    <input
      type="radio"
      name={buttonText}
      value={buttonText}
      id={buttonText}
      className="peer hidden"
      checked={checked}
      readOnly
    />
    <label
      htmlFor={buttonText}
      className="flex cursor-pointer items-center justify-center rounded-lg
      border border-greenC py-2 px-3 hover:bg-greenC peer-checked:border-white
      peer-checked:bg-greenC"
    >
      <p className="text-sm font-medium">{buttonText}</p>
    </label>
  </div>
);

export const MainButton = ({ buttonText, styleT, onClick }) => (
  <div
    className={`duration-600 inline-block cursor-pointer rounded-lg border-greenC bg-greenC px-8 py-3 text-center font-futura text-sm font-medium uppercase transition hover:scale-110 hover:bg-white hover:text-greenC hover:shadow-xl focus:outline-none focus:ring ${styleT}`}
    onClick={onClick}
  >
    {buttonText}
  </div>
);

export const SocialButton = () => (
  <div className="group relative inline-block rounded-lg bg-indigo-600 px-8 py-3">
    <span className="font-futura text-sm uppercase transition-opacity group-hover:opacity-0">
      Connect with me
    </span>

    <ul className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
      <li>
        <a
          className="block rounded-full transition-opacity hover:opacity-90 focus:opacity-75 focus:outline-none"
          href="mailto:shicaih@pm.me"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only"> Twitter </span>

          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            width="24"
            height="24"
          >
            <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
          </svg>
        </a>
      </li>

      <li>
        <a
          className="block rounded-full transition-opacity hover:opacity-90 focus:opacity-75 focus:outline-none"
          href="https://github.com/shicaih"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only"> GitHub </span>

          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            width="24"
            height="24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </li>

      <li>
        <a
          className="block rounded-full transition-opacity hover:opacity-90 focus:opacity-75 focus:outline-none"
          href="https://www.linkedin.com/in/shicaih/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="sr-only"> Dribbble </span>

          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            width="24"
            height="24"
          >
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
);
