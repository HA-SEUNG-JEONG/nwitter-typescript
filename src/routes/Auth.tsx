import { authService, fireBaseInstance } from 'fBase';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthProvider } from 'firebase/auth';

interface AuthData {
  email: string;
  password: string;
}

const Auth: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>();
  const [newAccount, setNewAccount] = useState(true);

  const onValid = async ({ email, password }: AuthData) => {
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    let provider: AuthProvider = undefined!;
    if (name === 'google') {
      provider = new fireBaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new fireBaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          type="text"
          {...register('email', {
            required: '이메일은 필수 항목입니다.',
            validate: {
              notNaver: (value) => !value.includes('@naver.com') || '네이버 메일은 허용되지 않습니다.',
            },
          })}
          placeholder="Email"
          required
        />
        {errors.email?.message}
        <input
          type="password"
          {...register('password', { required: '비밀번호는 6자리 이상으로 해주세요.' })}
          placeholder="password"
          required
        />
        {errors.password?.message}
        <input type="submit" value={newAccount ? 'Sign Up' : 'Sign in'} />
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Sign Up'}</span>
      <div>
        <button name="google" onClick={onSocialClick}>
          구글로 로그인하기
        </button>
        <button name="github" onClick={onSocialClick}>
          깃허브로 로그인하기
        </button>
      </div>
    </div>
  );
};

export default Auth;
