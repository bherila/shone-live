export const dashed = (str: string): string =>
  str.replace(/[A-Z\s]/g, (m) => '-' + m.toLowerCase()).replace(/^-+/, '')

export const underscored = (str: string): string =>
  str.replace(/[A-Z\s]/g, (m) => '_' + m.toLowerCase()).replace(/^_+/, '')

export const camelCase = (str: string): string =>
  str.replace(/_[a-z\s]/g, (m) => m.toUpperCase().substr(1)).replace(/^_+/, '')
