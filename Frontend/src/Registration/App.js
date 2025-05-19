import React, { useState } from 'react';

function App({onLogin}) {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [emailExists, setEmailExists] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'email') {
      setEmailExists(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLoginForm && !formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (!isLoginForm && formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 5) {
      newErrors.password = 'Пароль должен содержать минимум 5 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:5284/users/check-email?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error('Ошибка при проверке email');
      }
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Ошибка при проверке email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError('');
  setEmailExists(false);
  
  if (validateForm()) {
    setIsLoading(true);
    try {
      if (!isLoginForm) {
        const exists = await checkEmailExists(formData.email);
        if (exists) {
          setEmailExists(true);
          setIsLoading(false);
          return;
        }
      }

      const endpoint = isLoginForm ? '/login' : '/users';
      const response = await fetch(`http://localhost:5284${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(isLoginForm ? {
          Email: formData.email,
          Password: formData.password
        } : {
          FullName: formData.name,
          Email: formData.email,
          Password: formData.password,
          Specialization: '',
          Location: '',
          Bio: '',
          Role: 'Author'
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Пользователь не найден или неверный пароль');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка при ${isLoginForm ? 'входе' : 'регистрации'}`);
      }

      const data = await response.json();
      
      console.log(isLoginForm ? 'Пользователь вошел' : 'Пользователь создан:', data);

      onLogin(data.user || data);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error(`Ошибка при ${isLoginForm ? 'входе' : 'регистрации'}:`, error);
      setApiError(error.message || `Произошла ошибка при ${isLoginForm ? 'входе' : 'регистрации'}`);
    } finally {
      setIsLoading(false);
    }
  }
};

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setErrors({});
    setApiError('');
    setEmailExists(false);
    setIsSubmitted(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f9',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '350px',
        maxWidth: '100%',
        margin: '20px auto'
      }}>
        <h2 style={{
          color: '#333',
          textAlign: 'center',
          marginBottom: '24px'
        }}>{isLoginForm ? 'Вход' : 'Регистрация'}</h2>
        
        {apiError && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {apiError}
          </div>
        )}

        {emailExists && (
          <div style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Пользователь с таким email уже существует. Хотите <button 
              onClick={toggleForm}
              style={{
                background: 'none',
                border: 'none',
                color: '#4a90e2',
                textDecoration: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: 0
              }}
            >
              войти
            </button>?
          </div>
        )}

        {isSubmitted ? (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {isLoginForm ? 'Вход выполнен успешно!' : 'Регистрация прошла успешно! Добро пожаловать!'}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#555',
                  fontWeight: 'bold'
                }} htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.name ? '1px solid #e74c3c' : '1px solid #ddd',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    fontSize: '16px'
                  }}
                />
                {errors.name && <span style={{
                  color: '#e74c3c',
                  fontSize: '14px',
                  marginTop: '5px',
                  display: 'block'
                }}>{errors.name}</span>}
              </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: 'bold'
              }} htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.email ? '1px solid #e74c3c' : '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
              />
              {errors.email && <span style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginTop: '5px',
                display: 'block'
              }}>{errors.email}</span>}
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#555',
                fontWeight: 'bold'
              }} htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.password ? '1px solid #e74c3c' : '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
              />
              {errors.password && <span style={{
                color: '#e74c3c',
                fontSize: '14px',
                marginTop: '5px',
                display: 'block'
              }}>{errors.password}</span>}
            </div>
            
            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#4a90e2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                opacity: isLoading ? 0.7 : 1
              }}
              disabled={isLoading}
            >
              {isLoading ? (isLoginForm ? 'Вход...' : 'Регистрация...') : (isLoginForm ? 'Войти' : 'Зарегистрироваться')}
            </button>
          </form>
        )}
        
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#666'
        }}>
          {isLoginForm ? 'Еще нет аккаунта? ' : 'Уже есть аккаунт? '}
          <button 
            onClick={toggleForm}
            style={{
              background: 'none',
              border: 'none',
              color: '#4a90e2',
              textDecoration: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isLoginForm ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;