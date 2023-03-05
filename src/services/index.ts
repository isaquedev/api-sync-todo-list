import makeAuthService from "./authService";
import makeEncryptService from "./encryptService";
import makeMailService from "./mailService";

const encryptService = makeEncryptService();
const authService = makeAuthService({ encryptService });
const mailService = makeMailService();

export {
  authService,
  mailService
}
