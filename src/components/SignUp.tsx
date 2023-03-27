import { ChangeEventHandler, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { MUTATION_KEYS } from '@graasp/query-client';
import { RecaptchaAction } from '@graasp/sdk';
import { AUTH } from '@graasp/translations';
import { Button, Loader } from '@graasp/ui';

import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { useAuthTranslation } from '../config/i18n';
import { buildSignInPath } from '../config/paths';
import { hooks, useMutation } from '../config/queryClient';
import {
  EMAIL_SIGN_UP_FIELD_ID,
  NAME_SIGN_UP_FIELD_ID,
  SIGN_UP_BUTTON_ID,
  SIGN_UP_HEADER_ID,
} from '../config/selectors';
import { useRecaptcha } from '../context/RecaptchaContext';
import { emailValidator, nameValidator } from '../utils/validation';
import EmailInput from './EmailInput';
import FullscreenContainer from './FullscreenContainer';
import StyledDivider from './StyledDivider';
import StyledTextField from './StyledTextField';
import SuccessContent from './SuccessContent';

const { SIGN_IN_LINK_TEXT, SIGN_UP_BUTTON, SIGN_UP_HEADER, NAME_FIELD_LABEL } =
  AUTH;

const SignUp = () => {
  const { t } = useAuthTranslation();
  const { executeCaptcha } = useRecaptcha();

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [successView, setSuccessView] = useState(false);
  // enable validation after first click
  const [shouldValidate, setShouldValidate] = useState(false);

  const { mutateAsync: signUp, isSuccess: signUpSuccess } = useMutation<
    unknown,
    unknown,
    { email: string; name: string; captcha: string }
  >(MUTATION_KEYS.SIGN_UP);
  const [searchParams] = useSearchParams();

  const {
    data: invitation,
    isSuccess,
    isLoading,
  } = hooks.useInvitation(searchParams.get('invitationId') || undefined);

  useEffect(() => {
    if (isSuccess && invitation) {
      setEmail(invitation.email);
      setName(invitation.name ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation, isSuccess]);

  // loading invitation
  if (isLoading) {
    return <Loader />;
  }

  const handleNameOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (shouldValidate) {
      setNameError(nameValidator(newName));
    }
  };

  const handleRegister = async () => {
    const lowercaseEmail = email.toLowerCase();
    const checkingEmail = emailValidator(lowercaseEmail);
    const checkingUsername = nameValidator(name);
    if (checkingEmail || checkingUsername) {
      setNameError(checkingUsername);
      setShouldValidate(true);
    } else {
      const token = await executeCaptcha(RecaptchaAction.SignUp);
      await signUp({
        name: name.trim(),
        email: lowercaseEmail,
        captcha: token,
      });
      setSuccessView(true);
    }
  };

  const handleBackButtonClick = () => {
    setSuccessView(false);
  };

  const renderForm = () => (
    <>
      <FormControl>
        <StyledTextField
          required
          label={t(NAME_FIELD_LABEL)}
          variant="outlined"
          value={name}
          error={Boolean(nameError)}
          helperText={nameError}
          onChange={handleNameOnChange}
          id={NAME_SIGN_UP_FIELD_ID}
          disabled={Boolean(invitation?.get('name'))}
        />
        <EmailInput
          value={email}
          setValue={setEmail}
          id={EMAIL_SIGN_UP_FIELD_ID}
          disabled={Boolean(invitation?.get('email'))}
          shouldValidate={shouldValidate}
        />
        <Button onClick={handleRegister} id={SIGN_UP_BUTTON_ID} fullWidth>
          {t(SIGN_UP_BUTTON)}
        </Button>
      </FormControl>

      <StyledDivider />
      <Link to={buildSignInPath()}>{t(SIGN_IN_LINK_TEXT)}</Link>
    </>
  );

  return (
    <FullscreenContainer>
      {signUpSuccess && successView ? (
        <SuccessContent
          title={t(AUTH.SIGN_UP_SUCCESS_TITLE)}
          email={email}
          handleBackButtonClick={handleBackButtonClick}
        />
      ) : (
        <>
          <Typography variant="h2" component="h2" id={SIGN_UP_HEADER_ID}>
            {t(SIGN_UP_HEADER)}
          </Typography>
          {renderForm()}
        </>
      )}
    </FullscreenContainer>
  );
};

export default SignUp;