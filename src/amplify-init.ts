import { Amplify } from 'aws-amplify';
import { awsConfig } from './features/auth/config';

Amplify.configure(awsConfig);
