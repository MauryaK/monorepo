type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function log(level: LogLevel, ...args: unknown[]) {
  const ts = new Date().toISOString();
  const prefix = `[${ts}] [${level.toUpperCase()}]`;
  console[level === 'debug' ? 'log' : level](prefix, ...args);
}

export const logger = {
  debug: (...args: unknown[]) => log('debug', ...args),
  info: (...args: unknown[]) => log('info', ...args),
  warn: (...args: unknown[]) => log('warn', ...args),
  error: (...args: unknown[]) => log('error', ...args),
};
