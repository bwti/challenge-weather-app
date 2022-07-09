/* one of the few locations where console is allowed */
/* eslint-disable no-console */

const LOGGER_TAGS: string[] = ['*'];
const LOGGER_HIDDEN: string[] = [];

class Logger {
  prefix: string;
  isHidden: boolean;
  isActive: boolean;

  constructor(tag: string) {
    this.prefix = `[${tag}]: `;

    const matches = (set: string[], theTag: string) =>
      set.includes('*') || set.includes(theTag);

    this.isHidden = matches(LOGGER_HIDDEN, tag);
    this.isActive = !this.isHidden && matches(LOGGER_TAGS, tag);

    Object.assign(this, {
      tag,
      prefix: this.prefix,
      isActive: this.isActive,
    });
  }

  log(...args: any[]) {
    const { isActive, prefix } = this;
    if (!isActive) {
      return;
    }
    console.log(prefix, ...args);
  }

  warn(...args: any[]) {
    const { isActive, prefix } = this;
    if (!isActive) {
      return;
    }
    console.warn(prefix, ...args);
  }

  error(...args: any[]) {
    const { isActive, prefix } = this;
    if (!isActive) {
      return;
    }
    console.error(prefix, ...args);
  }
}

export { Logger };
