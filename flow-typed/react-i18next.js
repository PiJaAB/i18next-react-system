// @flow
declare module 'react-i18next' {
  import type { TFunction } from 'i18next';
  import typeof i18next from 'i18next';

  declare type WithTransConfig = {
    withRef?: boolean,
  }

  declare type WithTransInputProps<Comopnent> = {
    ref?: React$Ref<typeof Comopnent>,
    useSuspense?: boolean,
    i18n?: i18next,

  }

  declare type WithTransOutputProps = {
    t: TFunction,
    i18n: i18next,
    tReady: boolean,
    ...,
  };

  declare export function withTranslation<Component: React$ComponentType<WithTransOutputProps>>(
    ns?: string | string[],
    config?: WithTransConfig
  ): React$AbstractComponent<WithTransInputProps<Component>, Component>;

  declare type UseTransConfig = {
    useSuspense?: false,
  }

  declare export function useTranslation(
    ns?: string | string[],
    config?: UseTransConfig,
  ): { t: TFunction, i18n: i18next, ready?: boolean } & [TFunction, i18next];

  declare type TransProps = {
    count?: number,
    parent?: string,
    i18n?: i18next,
    i18nKey?: string,
    t?: TFunction,
    defaults?: string,
    values?: Object,
    components: React$ComponentType[],
    ...,
  };

  declare export var Trans: React$ComponentType<TransProps>;

  declare type TranslationProps = {
    children: (t: TFunction, opts: { i18n: i18next}) => React$ComponentType,
    ns?: string | string[],
    i18n?: i18next,
    ...,
  };

  declare export var Translation: React$ComponentType<TranslationProps>;

  declare type ProviderProps = {
    i18n: i18next,
    children: React$Element<*>,
    ...,
  };
  declare export var I18nextProvider: React$ComponentType<ProviderProps>;

  declare export var initReactI18next: {
    type: string,
    init: (instance: i18next) => void,
  }

  declare export function useSSR(initialI18nStore: Object, initialLanguage: string): void;
  declare export function withSSR(): React$ComponentType<{
    initialI18nStore: Object,
    initialLanguage: string,
  }>;
}
