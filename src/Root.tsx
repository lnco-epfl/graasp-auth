import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { langs } from '@graasp/translations';
import { ThemeProvider } from '@graasp/ui';

import { CssBaseline } from '@mui/material';

import App from './App';
import { RECAPTCHA_SITE_KEY, SHOW_NOTIFICATIONS } from './config/env';
import i18nConfig, { useCommonTranslation } from './config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from './config/queryClient';
import { RecaptchaProvider } from './context/RecaptchaContext';

const Content = () => {
  const { i18n } = useCommonTranslation();
  // The Graasp SDK has the Language Selector hidden in the code of the MUI ThemeProvider, which has a hard-coded style. To continue to use Graasp SDK with a custom style, but retain the Language Selector, I first use the Graasp Theme Provider to create the standard Graasp Theme with Language Selector and then override the Theme using the MUI Themeprovider
  return (
    <ThemeProvider langs={langs} i18n={i18n} languageSelectSx={{}}>
      <CssBaseline enableColorScheme={false} />
      {SHOW_NOTIFICATIONS && <ToastContainer stacked />}
      <RecaptchaProvider siteKey={RECAPTCHA_SITE_KEY}>
        <App />
      </RecaptchaProvider>
    </ThemeProvider>
  );
};

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18nConfig}>
      <Content />
    </I18nextProvider>
    {import.meta.env.DEV && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
