import { AppConfig } from './app-config.type';
import { AppleConfig } from 'src/modules/auth-apple/config/apple-config.type';
import { AuthConfig } from 'src/modules/auth/config/auth-config.type';
import { DatabaseConfig } from 'src/database/config/database-config.type';
import { FacebookConfig } from 'src/modules/auth-facebook/config/facebook-config.type';
import { FileConfig } from 'src/modules/files/config/file-config.type';
import { GoogleConfig } from 'src/modules/auth-google/config/google-config.type';
import { MailConfig } from 'src/modules/mail/config/mail-config.type';
import { TwitterConfig } from 'src/modules/auth-twitter/config/twitter-config.type';

export type AllConfigType = {
  app: AppConfig;
  apple: AppleConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
  facebook: FacebookConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
  twitter: TwitterConfig;
};
