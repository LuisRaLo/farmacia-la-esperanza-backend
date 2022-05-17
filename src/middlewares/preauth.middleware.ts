import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccountFirebase from '../utils/json/serviceAccountFirebase.json';

const firebaseParams: any = {
  type: serviceAccountFirebase.type,
  project_id: serviceAccountFirebase.project_id,
  private_key_id: serviceAccountFirebase.private_key_id,
  private_key: serviceAccountFirebase.private_key,
  client_email: serviceAccountFirebase.client_email,
  client_id: serviceAccountFirebase.client_id,
  auth_uri: serviceAccountFirebase.auth_uri,
  token_uri: serviceAccountFirebase.token_uri,
  auth_provider_x509_cert_url:
    serviceAccountFirebase.auth_provider_x509_cert_url,
  client_x509_cert_url: serviceAccountFirebase.client_x509_cert_url,
};

@Injectable()
export class PreauthMiddleware implements NestMiddleware {
  private defaultApp: any;
  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebaseParams),
    });
  }

  async use(req: Request, res: Response, next: () => void) {
    next();

    const token = req.headers.authorization;
    if (token) {
      this.defaultApp
        .auth()
        .verifyIdToken(token)
        .then((decodedToken: any) => {
          const user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
          };

          req.user = user;
          next();
        })
        .catch((error: any) => {
          console.log(error);
          this.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(401).json({
      statusCode: 401,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Unauthorized',
    });
  }
}
