/***** Configuration des tailles pour le composant OTP *****/
export const OTP_SIZES_CONFIG = {
  sm: {
    width: 40,
    fontSize: 14,
  },
  md: {
    width: 48,
    fontSize: 16,
  },
  lg: {
    width: 56,
    fontSize: 18,
  },
} as const;

/***** Configuration par défaut *****/
export const OTP_DEFAULT_CONFIG = {
  length: 6,
  separatorIndex: 3,
  separatorIcon: 'lucideMinus',
  size: 'md',
  variant: 'outline',
  numbersOnly: true,
  masked: false,
} as const;
