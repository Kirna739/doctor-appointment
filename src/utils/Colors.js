// src/constants/Colors.js
export const COLORS = {
    gradientBG: 'linear-gradient(to right, #f5f7fa, #e4ecf7)',
    primary: '#667eea',
    btnsecondary: '#7d8fdf',
    btnhover: '#5b77f7',
    white: '#ffffff',
    black: '#000000',
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
    info: '#17a2b8',
    errortitle:'#333',
    errormessage:'#666',
    shadowcolor:'rgba(0, 0, 0, 0.2)',
    backbtn: '#6c757d',
    backbtnhover: '#5a6268',
    inputcolor:'#ccc'

};

// CSS variables initialize karne ka function
export const initCSSVariables = () => {
    const root = document.documentElement;
    root.style.setProperty('--gradient-bg', COLORS.gradientBG);
    root.style.setProperty('--primary-color', COLORS.primary);
    root.style.setProperty('--btnsecondary-color', COLORS.btnsecondary);
    root.style.setProperty('--btnhover-color', COLORS.btnhover);
    root.style.setProperty('--white', COLORS.white);
    root.style.setProperty('--black', COLORS.black);
    root.style.setProperty('--error-color', COLORS.error);
    root.style.setProperty('--success-color', COLORS.success);
    root.style.setProperty('--warning-color', COLORS.warning);
    root.style.setProperty('--info-color', COLORS.info);
    root.style.setProperty('--error-title', COLORS.errortitle);
    root.style.setProperty('--error-message', COLORS.errormessage);
    root.style.setProperty('--shadowcolor', COLORS.shadowcolor);
    root.style.setProperty('--backbtn', COLORS.backbtn);
    root.style.setProperty('--backbtnhover', COLORS.backbtnhover);
    root.style.setProperty('--inputcolor', COLORS.inputcolor);
};