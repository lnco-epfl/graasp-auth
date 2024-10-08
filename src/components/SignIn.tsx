import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { RecaptchaAction } from '@graasp/sdk';
import { Button } from '@graasp/ui';

import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { SIGN_UP_PATH } from '../config/paths';
import { mutations } from '../config/queryClient';
import {
  EMAIL_SIGN_IN_FIELD_ID,
  EMAIL_SIGN_IN_METHOD_BUTTON_ID,
  PASSWORD_SIGN_IN_BUTTON_ID,
  PASSWORD_SIGN_IN_FIELD_ID,
  PASSWORD_SIGN_IN_METHOD_BUTTON_ID,
  SIGN_IN_BUTTON_ID,
  SIGN_IN_HEADER_ID,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { useMobileAppLogin } from '../hooks/mobile';
import { useRedirection } from '../hooks/searchParams';
import { AUTH } from '../langs/constants';
import { SIGN_IN_METHODS } from '../types/signInMethod';
import { emailValidator, passwordValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import FullscreenContainer from './FullscreenContainer';
import StyledTextField from './StyledTextField';
import SuccessContent from './SuccessContent';
import ErrorDisplay from './common/ErrorDisplay';

const {
  SIGN_IN_BUTTON,
  PASSWORD_FIELD_LABEL,
  SIGN_UP_LINK_TEXT,
  PASSWORD_SIGN_IN_METHOD,
  EMAIL_SIGN_IN_METHOD,
  SIGN_IN_HEADER,
} = AUTH;

const SignIn: FC = () => {
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();

  const { isMobile, challenge } = useMobileAppLogin();
  const { search } = useLocation();
  const redirect = useRedirection();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [signInMethod, setSignInMethod] = useState(SIGN_IN_METHODS.EMAIL);
  const [successView, setSuccessView] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const {
    mutateAsync: signIn,
    isSuccess: signInSuccess,
    isLoading: isLoadingSignIn,
    error: webSignInError,
  } = mutations.useSignIn();
  const {
    mutateAsync: mobileSignIn,
    isSuccess: mobileSignInSuccess,
    isLoading: isLoadingMobileSignIn,
    error: mobileSignInError,
  } = mutations.useMobileSignIn();
  const {
    mutateAsync: signInWithPassword,
    isSuccess: signInWithPasswordSuccess,
    isLoading: isLoadingPasswordSignIn,
    error: webPasswordSignInError,
  } = mutations.useSignInWithPassword();
  const {
    mutateAsync: mobileSignInWithPassword,
    isSuccess: mobileSignInWithPasswordSuccess,
    isLoading: isLoadingMobilePasswordSignIn,
    error: mobilePasswordSignInError,
  } = mutations.useMobileSignInWithPassword();

  const signInError = webSignInError || mobileSignInError;
  const passwordSignInError =
    webPasswordSignInError || mobilePasswordSignInError;

  const handleSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    if (checkingEmail) {
      setShouldValidate(true);
    } else {
      try {
        const token = await executeCaptcha(
          isMobile ? RecaptchaAction.SignInMobile : RecaptchaAction.SignIn,
        );
        await (isMobile
          ? mobileSignIn({ email: lowercaseEmail, captcha: token, challenge })
          : signIn({
              email: lowercaseEmail,
              captcha: token,
              url: redirect.url,
            }));
        setSuccessView(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handlePasswordSignIn = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingPassword = passwordValidator(password);
    if (checkingEmail || checkingPassword) {
      setShouldValidate(true);
      if (checkingPassword) {
        setPasswordError(checkingPassword);
      }
    } else {
      const token = await executeCaptcha(
        isMobile
          ? RecaptchaAction.SignInWithPasswordMobile
          : RecaptchaAction.SignInWithPassword,
      );
      const result = await (isMobile
        ? mobileSignInWithPassword({
            email: lowercaseEmail,
            password,
            captcha: token,
            challenge,
          })
        : signInWithPassword({
            email: lowercaseEmail,
            password,
            captcha: token,
            url: redirect.url,
          }));
      if (result && result.resource) {
        window.location.href = result.resource;
      }
      setSuccessView(true);
    }
  };

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(passwordValidator(newPassword));
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // signInMethod email when true
    // sign in by pressing the enter key
    if (e.key === 'Enter') {
      switch (signInMethod) {
        case SIGN_IN_METHODS.EMAIL: {
          handleSignIn();
          break;
        }
        case SIGN_IN_METHODS.PASSWORD: {
          handlePasswordSignIn();
          break;
        }
        default:
          break;
      }
    }
  };

  const handleSignInMethod = () => {
    // signInMethod email when true
    switch (signInMethod) {
      case SIGN_IN_METHODS.EMAIL: {
        setSignInMethod(SIGN_IN_METHODS.PASSWORD);
        break;
      }
      case SIGN_IN_METHODS.PASSWORD: {
        setSignInMethod(SIGN_IN_METHODS.EMAIL);
        break;
      }
      default:
        break;
    }
  };

  const handleBackButtonClick = () => {
    setSuccessView(false);
    setEmail('');
    setShouldValidate(false);
  };

  const renderSignInForm = () => (
    <>
      <FormControl>
        <Stack direction="column" spacing={1}>
          <EmailInput
            value={email}
            setValue={setEmail}
            id={EMAIL_SIGN_IN_FIELD_ID}
            onKeyPress={handleKeypress}
            shouldValidate={shouldValidate}
          />
          {signInMethod === SIGN_IN_METHODS.PASSWORD && (
            <>
              <StyledTextField
                required
                label={t(PASSWORD_FIELD_LABEL)}
                variant="outlined"
                value={password}
                error={Boolean(passwordError)}
                helperText={t(passwordError)}
                onChange={handleOnChangePassword}
                id={PASSWORD_SIGN_IN_FIELD_ID}
                type="password"
                onKeyDown={handleKeypress}
              />
              <ErrorDisplay error={passwordSignInError} />
              <LoadingButton
                id={PASSWORD_SIGN_IN_BUTTON_ID}
                variant="contained"
                color="primary"
                onClick={handlePasswordSignIn}
                loading={
                  isLoadingMobilePasswordSignIn || isLoadingPasswordSignIn
                }
              >
                {t(SIGN_IN_BUTTON)}
              </LoadingButton>
            </>
          )}
          {signInMethod === SIGN_IN_METHODS.EMAIL && (
            <>
              <ErrorDisplay error={signInError} />
              <LoadingButton
                id={SIGN_IN_BUTTON_ID}
                variant="contained"
                onClick={handleSignIn}
                loading={isLoadingMobileSignIn || isLoadingSignIn}
              >
                {t(SIGN_IN_BUTTON)}
              </LoadingButton>
            </>
          )}
        </Stack>
      </FormControl>
      <Link to={`${SIGN_UP_PATH}${search}`}>{t(SIGN_UP_LINK_TEXT)}</Link>
    </>
  );

  return (
    <FullscreenContainer>
      {
        // eslint-disable-next-line no-constant-condition
        (signInSuccess ||
          signInWithPasswordSuccess ||
          mobileSignInSuccess ||
          mobileSignInWithPasswordSuccess) &&
        successView ? (
          <SuccessContent
            title={t(AUTH.SIGN_IN_SUCCESS_TITLE)}
            email={email}
            handleBackButtonClick={handleBackButtonClick}
          />
        ) : (
          <Stack direction="column" alignItems="center" spacing={2}>
            <Stack spacing={1}>
              <img alt="LNCO Logo" height="200" src="/lnco-logo.png" />
              <Typography
                variant="h4"
                component="h2"
                id={SIGN_IN_HEADER_ID}
                sx={{ textAlign: 'center' }}
              >
                {t(SIGN_IN_HEADER)}
              </Typography>
            </Stack>
            {renderSignInForm()}
            <Box justifyContent="center">
              <Button
                variant="text"
                disabled={signInMethod === SIGN_IN_METHODS.EMAIL}
                onClick={handleSignInMethod}
                id={EMAIL_SIGN_IN_METHOD_BUTTON_ID}
                color={'primary'}
              >
                {t(EMAIL_SIGN_IN_METHOD)}
              </Button>
              <Button
                variant="text"
                disabled={signInMethod === SIGN_IN_METHODS.PASSWORD}
                onClick={handleSignInMethod}
                id={PASSWORD_SIGN_IN_METHOD_BUTTON_ID}
                color={'primary'}
              >
                {t(PASSWORD_SIGN_IN_METHOD)}
              </Button>
            </Box>
          </Stack>
        )
      }
    </FullscreenContainer>
  );
};

export default SignIn;
