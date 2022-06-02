import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  const onValid: SubmitHandler<AuthData> = (data) => {
    console.log(data);
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
          {...register('password', { required: '비밀번호는 5자리 이상으로 해주세요.' })}
          placeholder="password"
          required
        />
        {errors.password?.message}
        <input type="submit" value="로그인" />
      </form>
      <div>
        <button>구글로 로그인하기</button>
        <button>깃허브로 로그인하기</button>
      </div>
    </div>
  );
};

export default Auth;
