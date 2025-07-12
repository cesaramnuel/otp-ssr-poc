import { authenticator } from 'otplib';

authenticator.options = {
    step: 300, // 5 minutos
};

export default authenticator;