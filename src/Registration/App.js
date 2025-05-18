import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Форма отправлена:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        password: ''
      });
    }
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
        }}>Регистрация</h2>
        {isSubmitted ? (
          <div style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '15px',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Регистрация прошла успешно! Проверьте ваш email для подтверждения.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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
            
            <button type="submit" style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}>Зарегистрироваться</button>
          </form>
        )}
        
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          color: '#666'
        }}>
          Уже есть аккаунт? <a href="/login" style={{
            color: '#4a90e2',
            textDecoration: 'none'
          }}>Войти</a>
        </div>
      </div>
    </div>
  );
}

export default App;
