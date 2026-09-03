/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_MOLLIE_API_KEY?: string;
  readonly VITE_MOLLIE_PROFILE_ID?: string;
  readonly VITE_MOLLIE_API_URL?: string;
  readonly VITE_DEFAULT_LANGUAGE?: string;
  readonly VITE_SUPPORTED_LANGUAGES?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_COMPANY_VAT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
