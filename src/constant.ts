export const EXTENSION_NAME = 'smart-rename';
export const API_KEY_CONFIG_KEY = 'openaiApiKey';
export const BASE_URL_CONFIG_KEY = 'baseUrl';
export const MODEL_CONFIG_KEY = 'model';

export enum Command {
  RENAME = `${EXTENSION_NAME}.rename`,
  SET_API_KEY = `${EXTENSION_NAME}.setApiKey`,
  SET_BASE_URL = `${EXTENSION_NAME}.setBaseUrl`,
  SET_MODEL = `${EXTENSION_NAME}.setModel`,
}