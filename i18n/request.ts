import { routing } from '#/i18n/routing';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messagesModule = await import(`#/messages/${locale}.json`);

  return {
    locale,
    messages: messagesModule.default,
  };
});
